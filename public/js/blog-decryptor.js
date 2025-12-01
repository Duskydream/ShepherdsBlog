/**
 * BlogDecryptor - 博客内容解密器
 *
 * 使用 Web Crypto API 实现 AES-GCM 解密
 * 支持 PBKDF2 密钥派生和 localStorage 缓存
 *
 * @author Shepherd Meng
 * @version 1.0.0
 */

class BlogDecryptor {
  /**
   * 构造函数
   * @param {object} options - 配置选项
   * @param {string} options.encryptedDataSelector - 加密数据元素选择器，默认 '#encrypted-data'
   * @param {string} options.containerSelector - 加密容器选择器，默认 '#encrypted-container'
   * @param {string} options.passwordInputSelector - 密码输入框选择器，默认 '#decrypt-password'
   * @param {string} options.submitButtonSelector - 提交按钮选择器，默认 '#decrypt-submit'
   * @param {string} options.cacheKeyPrefix - localStorage 缓存键前缀，默认 'blog_decrypt_key_'
   * @param {number} options.pbkdf2Iterations - PBKDF2 迭代次数，默认 100000
   */
  constructor(options = {}) {
    // 合并默认配置
    this.config = {
      encryptedDataSelector: "#encrypted-data",
      containerSelector: "#encrypted-container",
      passwordInputSelector: "#decrypt-password",
      submitButtonSelector: "#decrypt-submit",
      cacheKeyPrefix: "blog_decrypt_key_",
      pbkdf2Iterations: 100000,
      ...options,
    };

    // 加密数据相关属性
    this.encryptedHex = null; // 加密的 HEX 字符串
    this.saltHex = null; // 盐值的 HEX 字符串
    this.ivHex = null; // 初始化向量的 HEX 字符串
    this.postId = null; // 文章唯一标识（用于缓存密钥）

    // 初始化
    this.init();
  }

  /**
   * 初始化方法
   * 读取 DOM 中的加密数据并尝试自动解密
   */
  async init() {
    try {
      // 从 DOM 读取加密数据
      this.loadEncryptedData();

      // 绑定事件监听器
      this.bindEvents();

      // 尝试从缓存自动解密
      await this.tryAutoDecrypt();
    }
    catch (error) {
      console.error("[BlogDecryptor] 初始化失败:", error.message);
    }
  }

  /**
   * 从 DOM 元素读取加密数据
   * 期望的数据格式：
   * <script id="encrypted-data" type="application/json">
   * {
   *   "postId": "unique-post-id",
   *   "salt": "hex-encoded-salt",
   *   "iv": "hex-encoded-iv",
   *   "data": "hex-encoded-encrypted-data"
   * }
   * </script>
   */
  loadEncryptedData() {
    const dataElement = document.querySelector(this.config.encryptedDataSelector);

    if (!dataElement) {
      throw new Error(`未找到加密数据元素: ${this.config.encryptedDataSelector}`);
    }

    try {
      const jsonData = JSON.parse(dataElement.textContent);

      // 验证必要字段
      if (!jsonData.data || !jsonData.salt || !jsonData.iv) {
        throw new Error("加密数据格式不完整，缺少必要字段");
      }

      this.encryptedHex = jsonData.data;
      this.saltHex = jsonData.salt;
      this.ivHex = jsonData.iv;
      this.postId = jsonData.postId || this.generatePostId();
    }
    catch (error) {
      throw new Error(`解析加密数据失败: ${error.message}`);
    }
  }

  /**
   * 生成文章唯一标识
   * 如果没有提供 postId，则使用当前页面 URL 的哈希值
   * @returns {string} 文章唯一标识
   */
  generatePostId() {
    const url = window.location.pathname;
    let hash = 0;
    for (let i = 0; i < url.length; i++) {
      const char = url.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 转换为 32 位整数
    }
    return `post_${Math.abs(hash).toString(16)}`;
  }

  /**
   * 绑定事件监听器
   */
  bindEvents() {
    const submitButton = document.querySelector(this.config.submitButtonSelector);
    const passwordInput = document.querySelector(this.config.passwordInputSelector);

    if (submitButton) {
      submitButton.addEventListener("click", () => this.handleDecrypt());
    }

    if (passwordInput) {
      // 支持回车键提交
      passwordInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          this.handleDecrypt();
        }
      });
    }
  }

  /**
   * 处理解密按钮点击事件
   */
  async handleDecrypt() {
    const passwordInput = document.querySelector(this.config.passwordInputSelector);

    if (!passwordInput) {
      this.showError("未找到密码输入框");
      return;
    }

    const password = passwordInput.value.trim();

    if (!password) {
      this.showError("请输入密码");
      return;
    }

    try {
      this.showLoading(true);
      await this.decrypt(password);
    }
    catch (error) {
      this.showError(error.message);
    }
    finally {
      this.showLoading(false);
    }
  }

  /**
   * HEX 字符串转 Uint8Array
   * @param {string} hex - HEX 编码的字符串
   * @returns {Uint8Array} 字节数组
   */
  hexToBytes(hex) {
    if (hex.length % 2 !== 0) {
      throw new Error("无效的 HEX 字符串长度");
    }

    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = Number.parseInt(hex.substr(i, 2), 16);
    }
    return bytes;
  }

  /**
   * Uint8Array 转 HEX 字符串
   * @param {Uint8Array} bytes - 字节数组
   * @returns {string} HEX 编码的字符串
   */
  bytesToHex(bytes) {
    return Array.from(bytes)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  /**
   * 使用 PBKDF2 从密码派生 AES-GCM 密钥
   * @param {string} password - 用户输入的密码
   * @param {Uint8Array} salt - 盐值
   * @returns {Promise<CryptoKey>} 派生的 AES-GCM 密钥
   */
  async deriveKey(password, salt) {
    // 将密码编码为 UTF-8 字节
    const encoder = new TextEncoder();
    const passwordBytes = encoder.encode(password);

    // 导入密码作为原始密钥材料
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      passwordBytes,
      { name: "PBKDF2" },
      false,
      ["deriveKey"],
    );

    // 使用 PBKDF2 派生 AES-GCM 密钥
    const derivedKey = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: this.config.pbkdf2Iterations,
        hash: "SHA-256",
      },
      keyMaterial,
      {
        name: "AES-GCM",
        length: 256, // 256 位密钥
      },
      true, // 可导出（用于缓存到 localStorage）
      ["decrypt"],
    );

    return derivedKey;
  }

  /**
   * 解密加密内容
   * @param {string} password - 用户输入的密码
   * @returns {Promise<string>} 解密后的 HTML 内容
   */
  async decrypt(password) {
    // 将 HEX 字符串转换为字节数组
    const salt = this.hexToBytes(this.saltHex);
    const iv = this.hexToBytes(this.ivHex);
    const encryptedData = this.hexToBytes(this.encryptedHex);

    // 派生密钥
    const key = await this.deriveKey(password, salt);

    try {
      // 使用 AES-GCM 解密
      const decryptedBuffer = await crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv,
          // tagLength: 128  // 默认值，可选
        },
        key,
        encryptedData,
      );

      // 将解密后的字节转换为字符串
      const decoder = new TextDecoder("utf-8");
      const decryptedContent = decoder.decode(decryptedBuffer);

      // 缓存密钥到 localStorage
      await this.cacheKey(key);

      // 更新 DOM
      this.updateDOM(decryptedContent);

      return decryptedContent;
    }
    catch (error) {
      // AES-GCM 解密失败通常意味着密码错误或数据被篡改
      if (error.name === "OperationError") {
        throw new Error("密码错误或数据已损坏，请检查后重试");
      }
      throw error;
    }
  }

  /**
   * 使用缓存的密钥解密
   * @param {CryptoKey} key - 缓存的密钥
   * @returns {Promise<string>} 解密后的 HTML 内容
   */
  async decryptWithKey(key) {
    // 将 HEX 字符串转换为字节数组
    const iv = this.hexToBytes(this.ivHex);
    const encryptedData = this.hexToBytes(this.encryptedHex);

    try {
      // 使用 AES-GCM 解密
      const decryptedBuffer = await crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv,
        },
        key,
        encryptedData,
      );

      // 将解密后的字节转换为字符串
      const decoder = new TextDecoder("utf-8");
      const decryptedContent = decoder.decode(decryptedBuffer);

      // 更新 DOM
      this.updateDOM(decryptedContent);

      return decryptedContent;
    }
    catch {
      // 缓存的密钥无效，清除缓存
      this.clearCache();
      throw new Error("缓存的密钥已失效，请重新输入密码");
    }
  }

  /**
   * 将密钥缓存到 localStorage
   * @param {CryptoKey} key - 要缓存的密钥
   */
  async cacheKey(key) {
    try {
      // 将密钥导出为 JWK 格式
      const jwk = await crypto.subtle.exportKey("jwk", key);

      // 构建缓存数据，包含密钥和元数据
      const cacheData = {
        jwk,
        salt: this.saltHex, // 保存盐值用于验证
        timestamp: Date.now(),
      };

      // 存储到 localStorage
      const cacheKey = this.config.cacheKeyPrefix + this.postId;
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    }
    catch (error) {
      console.warn("[BlogDecryptor] 缓存密钥失败:", error.message);
    }
  }

  /**
   * 从 localStorage 获取缓存的密钥
   * @returns {Promise<CryptoKey|null>} 缓存的密钥，如果没有则返回 null
   */
  async getCachedKey() {
    try {
      const cacheKey = this.config.cacheKeyPrefix + this.postId;
      const cached = localStorage.getItem(cacheKey);

      if (!cached) {
        return null;
      }

      const cacheData = JSON.parse(cached);

      // 验证盐值是否匹配（确保是同一加密内容）
      if (cacheData.salt !== this.saltHex) {
        this.clearCache();
        return null;
      }

      // 从 JWK 导入密钥
      const key = await crypto.subtle.importKey(
        "jwk",
        cacheData.jwk,
        {
          name: "AES-GCM",
          length: 256,
        },
        true,
        ["decrypt"],
      );

      return key;
    }
    catch (error) {
      console.warn("[BlogDecryptor] 读取缓存密钥失败:", error.message);
      this.clearCache();
      return null;
    }
  }

  /**
   * 清除当前文章的密钥缓存
   */
  clearCache() {
    const cacheKey = this.config.cacheKeyPrefix + this.postId;
    localStorage.removeItem(cacheKey);
  }

  /**
   * 尝试使用缓存的密钥自动解密
   */
  async tryAutoDecrypt() {
    const cachedKey = await this.getCachedKey();

    if (!cachedKey) {
      return;
    }

    try {
      await this.decryptWithKey(cachedKey);
    }
    catch (error) {
      console.warn("[BlogDecryptor] 自动解密失败:", error.message);
      // 缓存失效，显示密码输入界面
    }
  }

  /**
   * 更新 DOM，将加密容器替换为解密后的内容
   * @param {string} decryptedContent - 解密后的 HTML 内容
   */
  updateDOM(decryptedContent) {
    const container = document.querySelector(this.config.containerSelector);

    if (!container) {
      console.warn(`[BlogDecryptor] 未找到容器元素: ${this.config.containerSelector}`);
      return;
    }

    // 创建临时容器来安全地插入 HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = decryptedContent;

    // 替换加密容器的内容
    container.innerHTML = "";
    while (tempDiv.firstChild) {
      container.appendChild(tempDiv.firstChild);
    }

    // 移除加密相关的 UI 元素（可选）
    container.classList.remove("encrypted");
    container.classList.add("decrypted");

    // 触发自定义事件，通知其他脚本解密完成
    const event = new CustomEvent("blogDecrypted", {
      detail: { postId: this.postId },
    });
    document.dispatchEvent(event);
  }

  /**
   * 显示错误信息
   * @param {string} message - 错误信息
   */
  showError(message) {
    // 查找错误信息容器
    const errorContainer = document.querySelector("#decrypt-error");

    if (errorContainer) {
      errorContainer.textContent = message;
      errorContainer.style.display = "block";

      // 3 秒后自动隐藏
      setTimeout(() => {
        errorContainer.style.display = "none";
      }, 3000);
    }
    else {
      // 如果没有专门的错误容器，在控制台输出错误
      console.error("[BlogDecryptor] 错误:", message);
    }
  }

  /**
   * 显示/隐藏加载状态
   * @param {boolean} loading - 是否显示加载状态
   */
  showLoading(loading) {
    const submitButton = document.querySelector(this.config.submitButtonSelector);
    const passwordInput = document.querySelector(this.config.passwordInputSelector);

    if (submitButton) {
      submitButton.disabled = loading;
      submitButton.textContent = loading ? "解密中..." : "解密";
    }

    if (passwordInput) {
      passwordInput.disabled = loading;
    }
  }

  /**
   * 静态方法：清除所有博客解密缓存
   * @param {string} prefix - 缓存键前缀
   */
  static clearAllCache(prefix = "blog_decrypt_key_") {
    const keysToRemove = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => localStorage.removeItem(key));
  }
}

// 如果是模块环境，导出类
if (typeof module !== "undefined" && module.exports) {
  module.exports = BlogDecryptor;
}

// 页面加载完成后自动初始化（如果存在加密数据元素）
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("#encrypted-data")) {
    window.blogDecryptor = new BlogDecryptor();
  }
});

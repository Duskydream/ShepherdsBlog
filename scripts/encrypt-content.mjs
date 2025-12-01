/**
 * 博客内容加密脚本
 *
 * 使用 AES-256-GCM 加密 + PBKDF2 密钥派生
 * 在构建时将加密内容嵌入页面
 *
 * @author Shepherd Meng
 * @version 1.0.0
 */

import { Buffer } from "node:buffer";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

// 获取全局 process 对象（兼容不同环境）
// eslint-disable-next-line node/prefer-global/process
const proc = globalThis.process;

// 手动加载 .env 文件（确保在 Astro 构建时也能读取）
function loadEnvFile() {
  try {
    const cwd = proc?.cwd?.() || ".";
    const envPath = path.resolve(cwd, ".env");
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, "utf-8");
      for (const line of envContent.split("\n")) {
        const trimmed = line.trim();
        // 跳过注释和空行
        if (!trimmed || trimmed.startsWith("#"))
          continue;
        const [key, ...valueParts] = trimmed.split("=");
        if (key && valueParts.length > 0) {
          const value = valueParts.join("=").trim();
          // 只设置未定义的环境变量
          if (!proc.env[key]) {
            proc.env[key] = value;
          }
        }
      }
    }
  }
  catch {
    // 忽略错误
  }
}

// 加载 .env 文件
loadEnvFile();// =====================================================
// 🔐 在这里设置你的加密密码
// =====================================================
//
// 方式一：通过环境变量设置（推荐用于生产环境）
//   - 在 .env 文件中添加: BLOG_ENCRYPT_PASSWORD=你的密码
//   - 或在命令行设置: BLOG_ENCRYPT_PASSWORD=你的密码 npm run build
//
// 方式二：直接在下方设置（仅用于本地测试）
//   - 将 null 替换为你的密码字符串
//
const DEFAULT_PASSWORD = null; // 例如: 'my-secret-password'
// =====================================================

/**
 * 加密配置
 */
const ENCRYPT_CONFIG = {
  algorithm: "aes-256-gcm",
  keyLength: 32, // 256 bits
  ivLength: 12, // 96 bits (GCM 推荐)
  saltLength: 16, // 128 bits
  tagLength: 16, // 128 bits (GCM auth tag)
  iterations: 100000, // PBKDF2 迭代次数
  digest: "sha256",
};

/**
 * 获取加密密码
 * @returns {string} 密码
 */
export function getEncryptPassword() {
  // 使用全局 process.env 读取环境变量
  const envPassword = proc?.env?.BLOG_ENCRYPT_PASSWORD;
  if (envPassword) {
    return envPassword;
  }

  // 其次使用默认密码
  if (DEFAULT_PASSWORD) {
    return DEFAULT_PASSWORD;
  }

  throw new Error(
    "未设置加密密码！请通过以下方式之一设置：\n"
    + "1. 设置环境变量 BLOG_ENCRYPT_PASSWORD\n"
    + "2. 在 scripts/encrypt-content.mjs 中设置 DEFAULT_PASSWORD",
  );
}

/**
 * 使用 PBKDF2 从密码派生密钥
 * @param {string} password - 密码
 * @param {Buffer} salt - 盐值
 * @returns {Buffer} 派生的密钥
 */
function deriveKey(password, salt) {
  return crypto.pbkdf2Sync(
    password,
    salt,
    ENCRYPT_CONFIG.iterations,
    ENCRYPT_CONFIG.keyLength,
    ENCRYPT_CONFIG.digest,
  );
}

/**
 * 将 Buffer 转换为 HEX 字符串
 * @param {Buffer} buffer - 要转换的 Buffer
 * @returns {string} HEX 字符串
 */
function bufferToHex(buffer) {
  return buffer.toString("hex");
}

/**
 * 加密内容
 * @param {string} content - 要加密的内容（HTML 字符串）
 * @param {string} password - 加密密码
 * @returns {object} 加密结果，包含 salt, iv, data (均为 HEX 格式)
 */
export function encryptContent(content, password) {
  // 生成随机盐值和 IV
  const salt = crypto.randomBytes(ENCRYPT_CONFIG.saltLength);
  const iv = crypto.randomBytes(ENCRYPT_CONFIG.ivLength);

  // 派生密钥
  const key = deriveKey(password, salt);

  // 创建加密器
  const cipher = crypto.createCipheriv(ENCRYPT_CONFIG.algorithm, key, iv, {
    authTagLength: ENCRYPT_CONFIG.tagLength,
  });

  // 加密内容
  const contentBuffer = Buffer.from(content, "utf-8");
  const encrypted = Buffer.concat([
    cipher.update(contentBuffer),
    cipher.final(),
  ]);

  // 获取认证标签
  const authTag = cipher.getAuthTag();

  // 将加密数据和认证标签合并
  const encryptedWithTag = Buffer.concat([encrypted, authTag]);

  return {
    salt: bufferToHex(salt),
    iv: bufferToHex(iv),
    data: bufferToHex(encryptedWithTag),
  };
}

/**
 * 解密内容（用于测试）
 * @param {object} encryptedData - 加密数据对象
 * @param {string} password - 解密密码
 * @returns {string} 解密后的内容
 */
export function decryptContent(encryptedData, password) {
  const salt = Buffer.from(encryptedData.salt, "hex");
  const iv = Buffer.from(encryptedData.iv, "hex");
  const dataWithTag = Buffer.from(encryptedData.data, "hex");

  // 分离加密数据和认证标签
  const encrypted = dataWithTag.subarray(0, -ENCRYPT_CONFIG.tagLength);
  const authTag = dataWithTag.subarray(-ENCRYPT_CONFIG.tagLength);

  // 派生密钥
  const key = deriveKey(password, salt);

  // 创建解密器
  const decipher = crypto.createDecipheriv(ENCRYPT_CONFIG.algorithm, key, iv, {
    authTagLength: ENCRYPT_CONFIG.tagLength,
  });
  decipher.setAuthTag(authTag);

  // 解密
  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);

  return decrypted.toString("utf-8");
}

// 如果直接运行此脚本，执行测试
const isMainModule = import.meta.url === `file://${proc?.argv?.[1] || ""}`;
if (isMainModule) {
  console.log("🔐 博客加密工具测试\n");

  const testContent = "<h1>Hello World</h1><p>这是加密内容</p>";
  const testPassword = "test-password-123";

  console.log("原始内容:", testContent);
  console.log("测试密码:", testPassword);

  const encrypted = encryptContent(testContent, testPassword);
  console.log("\n加密结果:");
  console.log("  Salt:", encrypted.salt);
  console.log("  IV:", encrypted.iv);
  console.log("  Data:", `${encrypted.data.substring(0, 50)}...`);

  const decrypted = decryptContent(encrypted, testPassword);
  console.log("\n解密结果:", decrypted);
  console.log("\n✅ 测试通过:", testContent === decrypted);
}

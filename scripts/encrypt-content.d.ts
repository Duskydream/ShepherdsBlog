/**
 * 博客内容加密脚本类型声明
 */

export interface EncryptedData {
  salt: string;
  iv: string;
  data: string;
}

export function getEncryptPassword(): string;
export function encryptContent(content: string, password: string): EncryptedData;
export function decryptContent(encryptedData: EncryptedData, password: string): string;

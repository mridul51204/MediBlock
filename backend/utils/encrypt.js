import CryptoJS from "crypto-js";

// Encrypt a file buffer using AES-256
export function encryptFile(buffer) {
  const key = CryptoJS.lib.WordArray.random(32);  // 256-bit key
  const iv = CryptoJS.lib.WordArray.random(16);   // 128-bit IV
  const wordArray = CryptoJS.lib.WordArray.create(buffer);
  const encrypted = CryptoJS.AES.encrypt(wordArray, key, { iv });

  return {
    encryptedData: Buffer.from(encrypted.toString(), "utf8"),
    key: key.toString(CryptoJS.enc.Hex),
    iv: iv.toString(CryptoJS.enc.Hex)
  };
}

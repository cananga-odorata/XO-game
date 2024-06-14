import CryptoJS from 'crypto-js';

// console.log(import.meta.env.VITE_ENCRYPTION_KEY)
const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'default_key';
const IV_LENGTH = 16; // AES block size

export function encryptData(data: string): string {
    const iv = CryptoJS.lib.WordArray.random(IV_LENGTH);
    const encrypted = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY), {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Hex.stringify(iv) + ':' + encrypted.toString();
}

export function decryptData(data: string): string {
    const parts = data.split(':');
    const iv = CryptoJS.enc.Hex.parse(parts[0]);
    const encryptedData = parts[1];
    const decrypted = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY), {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

import CryptoJS from 'crypto-js/index.js';
// https://cryptojs.gitbook.io/docs/#hashing 官方文档地址
/**
 * 处理加密
 * @param message
 * @param hex
 * @returns {*|CipherParams|PromiseLike<ArrayBuffer>}
 */
const encrypted = (message, hex) => {
    return CryptoJS.DES.encrypt(message, hex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
};

// 后面支持其他加密配置

const decrypted = (message, key) => {
    return CryptoJS.DES.decrypt(message, CryptoJS.enc.Utf8.parse(key), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString();
};


export const encryptDES = (message, key) => {
    return encrypted(message, CryptoJS.enc.Utf8.parse(key)).toString();
};

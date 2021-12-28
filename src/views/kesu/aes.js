
// AES加密
export function Encrypt(phone){
  return window.CryptoJS.AES.encrypt(window.CryptoJS.enc.Utf8.parse(phone),
    window.CryptoJS.enc.Utf8.parse('HaChiSmart++++++'),
    {
      iv: window.CryptoJS.enc.Utf8.parse('A-16-Byte-String'),
      mode: window.CryptoJS.mode.CBC,
      padding: window.CryptoJS.pad.Pkcs7
    }
  ).toString();
}


import CryptoJS from 'crypto-js';


export interface DataModel {
  items: ItemModel[];
  totalPrice: number;
}


export interface ItemModel {
  id: string;
  name: string;
  price: number;
  amount: number;
  total: number;
}

export function hashPassword(password: string) {
  return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
}

export function encrypt(data: DataModel, passwordHash: string) {
  const jsonString = JSON.stringify(data);
  return CryptoJS.AES.encrypt(jsonString, passwordHash).toString();
}

export function decrypt(json: string, passwordHash: string) {
  try {
    const decryptedBytes = CryptoJS.AES.decrypt(json, passwordHash);
    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

    return JSON.parse(decryptedText);
  } catch (error) {
    return null;
  }
}
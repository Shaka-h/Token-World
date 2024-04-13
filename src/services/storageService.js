import SecureLS from "secure-ls";
// const storeName = process.env.VUE_APP_READABLE_NAME
const ls = new SecureLS({
  encodingType: "aes",
  isCompression: false,
  encryptionSecret: import.meta.env.VITE_APP_STR_PWD,
});
export class StorageService {
  setItem(storeKey, storeValue) {
    ls.set(storeKey, storeValue)
  }

  getItem(key) {
    return ls.get(key)
  }

  removeItem(key) {
    ls.remove(key)
  }

  clearStorage() {
    ls.removeAll();
  }

}




import smcrypto from 'sm-crypto';
class smCypto {
  constructor() {
    this.sm2 = smcrypto.sm2;
    this.enPublicKey = null;
  }
  doEncrypt = (msg) => {
    return this.sm2.doEncrypt(msg, this.enPublicKey, 1);
  }
  setPublicKey = (PublicKey) => {
    this.enPublicKey = PublicKey;
  }
}
export default smCypto;
import smcrypto from 'sm-crypto';
class smCypto {
  constructor() {
    this.le = 10;
    this.sm2 = smcrypto.sm2;
    this.keypair = null;
    this.init();
  }
  init = () => {
    let SecureRandom = this.randomNmber(this.le);
    this.keypair = this.sm2.generateKeyPairHex(SecureRandom);
  };
  randomNmber = (le) => {
    let numStr = '';
    for (let i = 0; i < le; i++) {
      numStr = `${numStr}${Math.floor(Math.random() * 10)}`;
    }
    return numStr;
  }
  doEncrypt = (msg) => {
    return this.sm2.doEncrypt(msg, this.keypair.publicKey, 1);
  }
  doDecrypt = (msg) => {
    return this.sm2.doDecrypt(msg, this.keypair.privateKey, 1);
  }
}
export default smCypto;
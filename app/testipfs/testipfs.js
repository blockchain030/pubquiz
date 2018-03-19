var execSync = require('child_process').execSync;

// http://lollyrock.com/articles/nodejs-encryption/

// Part of https://github.com/chris-rock/node-crypto-examples

// Nodejs encryption with CTR
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr';

const PASSWORD = 'hj23jksi';


encrypt = (text, password) => {
  var cipher = crypto.createCipher(algorithm,password);
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
}
 
decrypt = (text, password) => {
  var decipher = crypto.createDecipher(algorithm,password);
  var dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
}


ipfsAdd = (content, password) => {
  var encrypted = encrypt(content, PASSWORD);
  // console.log(encrypted);

  const stdout = execSync('echo "' + encrypted + '" | ipfs add');
  // console.log(stdout.toString().split(' ')[1], 'with password', PASSWORD);
}
// ipfsAdd("testing one two three");


ipfsGet = (hash, password) => {
  const stdout = execSync('ipfs cat ' + hash);
  const s = stdout.toString().trim();
  // console.log("[" + s + "]");
  const decrypted = decrypt(s, PASSWORD);
  // console.log('"' + decrypted, '" with password', PASSWORD);
  return decrypted
}
const HASH = "QmeJkiwEzUfeKXjgYmwyBs4SEAibfHcnStUHSM1CgcTKve";
const s = ipfsGet(HASH, PASSWORD);
console.log(s);
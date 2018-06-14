var execSync = require('child_process').execSync;

// http://lollyrock.com/articles/nodejs-encryption/

// Part of https://github.com/chris-rock/node-crypto-examples

// Nodejs encryption with CTR
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr';

var getHASHfromIPFSreply = (reply) => {
  var result = reply.replace('added ', '').replace('\n', '');
  result = result.substr(0,result.indexOf(' '));

//  console.log(reply, ' -> ',result)
  console.log('hash length' + result.length);
  if(result.length==46) {
    return result;
  } else {
    return false;
  }
}

exports.encrypt = (text, password) => {
  try {
    var cipher = crypto.createCipher(algorithm,password);
    var crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
  } catch(ex) {
    console.log("ipfsfunctions.encrypt - error: ", ex.message);
    return false;
  }
}

exports.decrypt = (text, password) => {
  try {
    var decipher = crypto.createDecipher(algorithm,password);
    var dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
  } catch(ex) {
    console.log("ipfsfunctions.decrypt - error: ", ex.message);
    return false;
  }
}

exports.ipfsAddEncrypted = (content, password) => {
  try {
    var encrypted = this.encrypt(content, password);
    const stdout = execSync('ipfs add', { input: encrypted.toString()});
    return getHASHfromIPFSreply(stdout.toString());
  } catch(ex) {
    console.log("ipfsfunctions.ipfsAddEncrypted - error: ", ex.message);
    return false;
  }
}

exports.ipfsAddPlain = (content) => {
  try {
    const stdout = execSync('ipfs add', { input: content});
    return getHASHfromIPFSreply(stdout.toString());
  } catch(ex) {
    console.log("ipfsfunctions.ipfsAddPlain - error: ", ex.message);
    return false;
  }
}

exports.ipfsGetHashPlain = (content) => {
  try {
    // const stdout = execSync('echo "' + content + '" | ipfs add --only-hash');
    const stdout = execSync('ipfs add --only-hash', { input: content});
    return getHASHfromIPFSreply(stdout.toString());
  } catch(ex) {
    console.log("ipfsfunctions.ipfsGetHashPlain - error: ", ex.message);
    return false;
  }
}

exports.ipfsGetEncrypted = (hash, password) => {
  try {
    const stdout = execSync('ipfs cat ' + hash);
    const s = stdout.toString().trim();
    const decrypted = decrypt(s, PASSWORD);
    return decrypted;
  } catch(ex) {
    console.log("ipfsfunctions.ipfsGetEncrypted - error: ", ex.message);
    return false;
  }
}

exports.ipfsGetPlain = (hash) => {
  try {
    const stdout = execSync('ipfs cat ' + hash);
    const s = stdout.toString().trim();
    return s;
  } catch(ex) {
    console.log("ipfsfunctions.ipfsGetPlain - error: ", ex.message);
    return false;
  }
}

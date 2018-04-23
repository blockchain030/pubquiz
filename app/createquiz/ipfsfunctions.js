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

  if(result.length=64) {
    return result;
  } else {
    return false;
  }
}

exports.encrypt = (text, password) => {
  var cipher = crypto.createCipher(algorithm,password);
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
}

exports.decrypt = (text, password) => {
  var decipher = crypto.createDecipher(algorithm,password);
  var dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
}

exports.ipfsAddEncrypted = (content, password) => {
  var encrypted = this.encrypt(content, password);
  const stdout = execSync('ipfs add', { input: encrypted.toString()});
  return getHASHfromIPFSreply(stdout.toString());
}

exports.ipfsAddPlain = (content) => {
  const stdout = execSync('ipfs add', { input: content});
  return getHASHfromIPFSreply(stdout.toString());
}

exports.ipfsGetHashPlain = (content) => {
  // const stdout = execSync('echo "' + content + '" | ipfs add --only-hash');
  const stdout = execSync('ipfs add --only-hash', { input: content});
  return getHASHfromIPFSreply(stdout.toString());
}

exports.ipfsGetEncrypted = (hash, password) => {
  const stdout = execSync('ipfs cat ' + hash);
  const s = stdout.toString().trim();
  const decrypted = decrypt(s, PASSWORD);
  return decrypted;
}

exports.ipfsGetPlain = (hash) => {
  const stdout = execSync('ipfs cat ' + hash);
  const s = stdout.toString().trim();
  return s;
}

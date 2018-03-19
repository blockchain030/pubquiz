var _exec = require('child_process').exec;

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

  _exec('echo "' + encrypted + '" | ipfs add', function(error, stdout, stderr) 
  {
      if ( error != null ) {
          console.error(stderr);
          // error handling & exit
          return;
      }

      console.log(stdout, 'with password', PASSWORD);
  });
}
// ipfsAdd("testing one two three");


ipfsGet = (hash, password) => {
  _exec('ipfs cat ' + hash, function(error, stdout, stderr) 
  {
      if ( error != null ) {
          console.error(stderr);
          // error handling & exit
          return;
      }

      console.log(decrypt(stdout.trim(), PASSWORD), 'with password', PASSWORD);
  });
}
const HASH = "QmeJkiwEzUfeKXjgYmwyBs4SEAibfHcnStUHSM1CgcTKve";
const s = ipfsGet(HASH, PASSWORD);
console.log(s);
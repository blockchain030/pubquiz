import crypto from 'crypto'

export const IPFS_GATEWAY     = 'https://ipfs.io/ipfs/'

export const asText = async (hash) => {
    return await (await fetch(IPFS_GATEWAY + hash)).text()
}

export const asJSON = async (hash) => {
    return await (await fetch(IPFS_GATEWAY + hash)).json()
}

export const encrypt = (text, password, algorithm = 'aes-256-ctr') => {
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

export const decrypt = (text, password, algorithm = 'aes-256-ctr') => {
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

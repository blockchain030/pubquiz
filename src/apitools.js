module.exports.doApiCall = (apicall, callback) => {
  try {
    const request = require('request');

    var url = "https://pubquiz.fun/api" + apicall;

    // use local node API during testing
    if(true||process.env.NODE_ENV==='development') {   // &&false -> use server during development
      url = "http://localhost:3001" + apicall;
    }
    console.log('call pubquiz API : ', url)
    request(url, { json: true }, callback);

    return true;
  } catch(ex) {
    console.log('TestConstract.doApiCall: error ' + ex.message)
    return false;
  }
}

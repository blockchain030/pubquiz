export const doApiCall = async (apicall, callback) => {
  try {
    const rp = require('request-promise-native');

    var url = "https://pubquiz.fun/api" + apicall;

    // use local node API during testing
    if(true||process.env.NODE_ENV==='development') {   // &&false -> use server during development
      url = "http://localhost:3001" + apicall;
    }

    return  await rp({uri: url,  json: true }, callback);
  } catch(ex) {
    console.log('TestConstract.doApiCall: error ' + ex.message)
    return false;
  }
}

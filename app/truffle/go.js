


module.exports = function(callback) {

  try {

    // perform actions
    var Pubquiz = artifacts.require("./contracts/Pubquiz.sol");
    var instance;

    Pubquiz.deployed().then(_instance => {
      return instance = _instance
    }).then(()=>{
      return instance.setTeam(web3.eth.accounts[0], 'Team Marc');
    }).then(()=>{
      return instance.setTeam(web3.eth.accounts[1], 'Team Susanne');
    }).then(()=>{
      return instance.setTeam(web3.eth.accounts[2], 'Team Eric');
    }).then(res=>{
      return instance.getTeamAccts();
    }).then((res)=>{
      console.log(res);
    });
  } catch(ex) {
    console.log(ex);
  }
}

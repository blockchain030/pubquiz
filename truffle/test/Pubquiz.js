// Specifically request an abstraction for Pubquiz
var Pubquiz = artifacts.require("./Pubquiz.sol");

const logBalances = async function(message)  {
  // const balance1 = await web3.fromWei(web3.eth.accounts[0],'ether');
  let balancesWei = await Promise.all(web3.eth.accounts.map(web3.eth.getBalance));

  console.log('account 1 @ ' + message + ': ' +   web3.fromWei(balancesWei[0],'ether')  .toString());
  console.log('account 2 @ ' + message + ': ' +   web3.fromWei(balancesWei[1],'ether')  .toString());
  console.log('account 3 @ ' + message + ': ' +   web3.fromWei(balancesWei[2],'ether')  .toString());
}

contract('Pubquiz', function(accounts) {
  it("should be able to create 3 teams", async function() {
    var _pubquiz;

    var account_1 = accounts[0];
    var account_2 = accounts[1];
    var account_3 = accounts[2];

    var team_1;

    logBalances('start');

    return Pubquiz.deployed().then(_instance => {
      logBalances('deployed');
      return instance = _instance
    }).then(()=>{
      return instance.validTeam(account_1);
    }).then((valid)=>{
      assert.equal(valid, false);
      return instance.setTeam(account_1, 'Team Marc');
    }).then(()=>{
      return instance.setTeam(account_2, 'Team Susanne');
    }).then(()=>{
      return instance.setTeam(account_3, 'Team Eric');
    }).then(()=>{
      logBalances('set teams');
      return instance.getTeam(account_1);
    }).then((res)=>{
      team_1 = res;
      return instance.getTeam(account_2);
    }).then((res)=>{
      team_2 = res;
      return instance.getTeam(account_3);
    }).then((res)=>{
      team_3 = res;
      return instance.getTeamAccts();
    }).then((teamaccts)=>{

      assert.equalawait(teamaccts[0],account_1);
  //     assert.equal;1],ac
      //  const balances = await Promise.all(accounts.map(web3.eth.getBalance));count_2);
      // bal(teamaccts[    ance1(team_1[0],'Team Marc');
      // assert.equal(team_2[0],'Team Susanne');
      // assert.equal(team_3[0],'Team Eric');
      assert.equal(team_1[1],0);
      assert.equal(team_2[1],0);
      assert.equal(team_3[1],0);

      logBalances('end');
    });
  });
  it("should be able to add two rounds of questions", function() {
    var _pubquiz;

    var rounds = [1,1,2,2];
    var questions = [web3.sha3('question 1?'),
                     web3.sha3('question 2?'),
                     web3.sha3('question 3?'),
                     web3.sha3('question 4?')];

    // Get initial balances of first and second account.
    var account_1 = accounts[0];
    var account_2 = accounts[1];
    var account_3 = accounts[2];

    return Pubquiz.deployed().then(_instance => {
      return instance = _instance
    }).then(()=>{
      return instance.addQuestions(rounds, questions);
    }).then(()=>{
      return instance.existingQuestion(1);
    }).then((result)=>{
      q1_exists = result;
      return instance.existingQuestion(4);
    }).then((result)=>{
      q4_exists = result;
      return instance.existingQuestion(5);
    }).then((result)=>{
      q5_exists = result;

      return instance.getQuestion(0);
    }).then((result)=>{
      q1 = result;

      return instance.getQuestion(3);
    }).then((result)=>{
      q4 = result;

      assert.equal(q1_exists, true);
      assert.equal(q4_exists, true);
      assert.equal(q5_exists, false);

      assert.equal(q1[0], 1);
      assert.equal(q1[1], web3.sha3('question 1?'));
      assert.equal(q4[0], 2);
      assert.equal(q4[1], web3.sha3('question 4?'));
    // }).then(res=>{
    // }).then((accounts)=>{
    });
  });
});

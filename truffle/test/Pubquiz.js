// Specifically request an abstraction for Pubquiz
var Pubquiz = artifacts.require("./Pubquiz.sol");

const logBalances = async function(message)  {
  let balancesWei = await Promise.all(web3.eth.accounts.map(account => {return web3.eth.getBalance(account)} ));

  balancesWei.map((balance, index) => {console.log('account ' + (index+1) + ' @ ' + message + ': ' + web3.fromWei(balance,'ether').toString())});
}

contract('Pubquiz', async function(accounts) {
  it("should be able to create 3 teams", async function() {
    var account_1 = accounts[0];
    var account_2 = accounts[1];
    var account_3 = accounts[2];

    logBalances('start');

    var instance = await Pubquiz.deployed();
    var validteam = await instance.validTeam(account_1);

    var result1 = await instance.setTeam(account_1, 'Team Marc');
    var result2 = await instance.setTeam(account_2, 'Team Susanne');
    var result3 = await instance.setTeam(account_3, 'Team Eric');

    logBalances('after set teams');

    var team_1 = await instance.getTeam(account_1);
    var team_2 = await instance.getTeam(account_2);
    var team_3 = await instance.getTeam(account_3);
    var teamaccts = await instance.getTeamAccts();

    logBalances('after get teams');

    assert.equal(teamaccts[0],account_1);
    assert.equal(teamaccts[1],account_2);
    assert.equal(teamaccts[2],account_3);
    assert.equal(team_1[0],'Team Marc');
    assert.equal(team_2[0],'Team Susanne');
    assert.equal(team_3[0],'Team Eric');
    assert.equal(team_1[1],0);
    assert.equal(team_2[1],0);
    assert.equal(team_3[1],0);

    logBalances('at end');
  });

  it("should be able to add two rounds of questions", async function() {
    var rounds = [1,1,2,2];
    var questions = [web3.sha3('question 1?'),
                     web3.sha3('question 2?'),
                     web3.sha3('question 3?'),
                     web3.sha3('question 4?')];

    // Get initial balances of first and second account.
    var account_1 = accounts[0];
    var account_2 = accounts[1];
    var account_3 = accounts[2];

    var instance = await Pubquiz.deployed();
    var validteam = await instance.validTeam(account_1);

    await instance.addQuestions(rounds, questions);
    var q1_exists = await instance.existingQuestion(1);
    var q4_exists = await instance.existingQuestion(4);
    var q5_exists = await instance.existingQuestion(5);

    var q1 = await instance.getQuestion(0);
    var q4 = await instance.getQuestion(3);

    assert.equal(q1_exists, true);
    assert.equal(q4_exists, true);
    assert.equal(q5_exists, false);

    assert.equal(q1[0], 1);
    assert.equal(q1[1], web3.sha3('question 1?'));
    assert.equal(q4[0], 2);
    assert.equal(q4[1], web3.sha3('question 4?'));
  });
});

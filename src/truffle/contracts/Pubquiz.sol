pragma solidity ^0.4.18;
// We have to specify what version of compiler this code will compile with

contract Pubquiz {

  /* team related functions */

  struct Team {
          string name;
          uint score;
  }

  mapping (address => Team) teams;
  address[] public teamAccts;

  string public currentPlayerInfoHash;
  mapping (uint => bytes) passwordQuestions;
  mapping (uint => bytes) passwordAnswers;

  function Pubquiz() public {
    currentPlayerInfoHash = "QmQA243ye7X6sSTbCtKPaau2zLSriHyKHXfVE43GJvAP2N";
    var _password1 = "grIu1Gh6";
    passwordQuestions[0] = bytes(_password1);
  }

  function setPasswordForQuestionsInRound(uint _round, string password) public {
    // require(!validTeam(_address)); -> add: only oracle (contract owner) can set password
    // sets hash for all questions in given game roun
    passwordQuestions[_round]= bytes(password);
  }

  function getPasswordForQuestionsInRound(uint _round) view public returns (string) {
    // require(!validTeam(_address)); -> add: only oracle (contract owner) can set password
    // sets hash for all questions in current game round (or false if password is not yet available?)
    return string(passwordQuestions[_round]);
  }

  function setPasswordForAnswersInRound(uint _round, string password) public {
    // require(!validTeam(_address)); -> add: only oracle (contract owner) can set password
    // sets hash for all questions in given game roun
    passwordAnswers[_round]=bytes(password);
  }

  function getPasswordForAnswersInRound(uint _round) view public returns (string) {
    // require(!validTeam(_address)); -> add: only oracle (contract owner) can set password
    // sets hash for all questions in current game round (or false if password is not yet available?)
    return string(passwordAnswers[_round]);
  }

  function getCurrentRoundForQuestions() view public returns (uint) {
    uint currentround = 0;
    uint index = 0;

    while (bytes(passwordQuestions[index]).length>2) { currentround=index; index++; }

    return currentround;
  }

  function getCurrentRoundForAnswers() view public returns (uint) {
    uint currentround = 0;
    uint index = 0;

    while (bytes(passwordAnswers[index]).length>2) { currentround=index; index++; }

    return currentround;
  }

  function setTeam(address _address, string _teamname) public {
      require(!validTeam(_address));

      var team = teams[_address];
      team.name = _teamname;
      team.score = 0;
      teamAccts.push(_address);
  }

  function getTeamAccts() view public returns (address[]) {
      return teamAccts;
  }

  function validTeam(address _address) view public returns (bool) {
    for(uint i=0; i < teamAccts.length; i++) {
      if(teamAccts[i]==_address) return true;
    }
    return false;
  }

  function getTeam(address _address) view public returns (string, uint) {
    require(validTeam(_address));

    var team = teams[_address];

    return (team.name, team.score);
  }

  /* round related functions */

  struct PubQuizQuestion {
    uint roundidx;
    bytes32 questionhash;   // sha256 hash for this question
  }

  PubQuizQuestion[] Questions;

  function existingQuestion(uint _index) view public returns (bool) {
    return (_index>=0 && _index<=Questions.length);
  }

  function addQuestions(uint[] _rounds, bytes32[] _questionhashes) public returns (bool) {
    for(uint i=0; i < _questionhashes.length; i++) {
      PubQuizQuestion memory aQuestion = PubQuizQuestion(_rounds[i], _questionhashes[i]);
      Questions.push(aQuestion);
    }

    return false;
  }

  function getQuestion(uint index) view public returns (uint, bytes32) {
    require(existingQuestion(index));

    var question = Questions[index];

    return (question.roundidx, question.questionhash);
  }
}

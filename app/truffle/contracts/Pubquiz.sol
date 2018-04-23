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

  uint startpoints;  // number of gamepoints that each team gets when registering

  function PubQuiz() public {
    startpoints = 30;
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

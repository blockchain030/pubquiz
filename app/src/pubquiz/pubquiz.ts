import IPFS from 'ipfs';

export class PubQuiz {
  private title = '';
  private rounds = [];

  constructor(_title) {
    this.title = _title;

  }

  createNewRound() {
    var ipfs_address_questions = '';
    var ipfs_address_answers = '';

    var round = { "questions": [], "answers": []};

    for(var i=0; i<10; i++) {
      round.questions.push("question " + i);
      round.answers.push("answer " + i);
    }

    const theipfs = new IPFS();
    theipfs.version().then(x=>console.log('version:', x));


    //   let buffer = Buffer.from(input.value)
    //
    //   showStatus('adding to IPFS...', COLORS.active)
    //
    //   ipfs.add(buffer)
    //     .then(res => {
    //       showStatus(`success!`, COLORS.success)
    //
    //       publish(res[0].path)
    //
    //       input.value = ''
    //     })
    //     .catch(err => {
    //       showStatus('failed to add the data', COLORS.error)
    //       console.error(err)
    //     })
    // }
    //
    // console.log(round);

    return { questions: ipfs_address_questions, answers:ipfs_address_answers};
  }
}

import { doApiCall } from '../apitools.js';

var inPollCheckStatus = false;

const checkContractStatus = async () => {
  // first ask the oracle for the current quiz address
  var apicall = "/quiz/getaddress";
  doApiCall(apicall).then((body)=> {
    if(body.result===true) {
      const { store } = global
      store.quiz.setContractInfo(body.address, body.abiaddress)

      if(body.address!=='') {
        store.pushTask('loadPubquizContract')
        store.setModal('waitForAsyncTasks')
      }

      return true;
    } else {
      const { store } = this.props;
      console.log(JSON.stringify(store.quiz,0,2));
      alert('I am unable to talk to the oracle. The quiz can\'t be started!');

    }
  }).catch((error) => {
    console.log('I am unable to talk to the oracle now. The quiz can\'t be started!', error);
  });
}

const showRegistration = (store) => {
  if(store.page!=='register' && store.page!=='testcontract' && store.page!=='enterseed') {
    console.log('poll - force registration page')
    store.setPage('register')
  }
}

const pollCheckStatus = async () => {
  try {
    const { store, pubquiz } = global

    if(inPollCheckStatus) {
      console.log('recursive call to pollCheckStatus');
      return;
    }

    inPollCheckStatus = true;

    console.log('pollCheckstatus: do state check');
    // console.log('store:', JSON.stringify(store,0,2));

    // keeps track of application status, executes async tasks based on quiz state
    // used to track all changes that are not signalled by smart contract events

    // is the team address set? No: go to registration page
    if(store.team.address==='') {
      showRegistration(store);
      return;
    }

    // team has a wallet. now check if there is a game going on
    if(store.quiz.contractaddress==='') {
      await checkContractStatus();
      if(store.quiz.contractaddress==='') {
        // no quiz active. Park on registration page
        showRegistration(store);
        return;
      }
    }

    var registered= pubquiz && await pubquiz.validTeam(store.team.address);
    if(registered===true) {
      store.team.setRegistered(true);
      var info = await pubquiz.getTeam(store.team.address);
      if(info[0]!=store.team.name) {
        console.log('read name from smart contract', info);
        store.team.setName(info[0]);
      }
    } else{
      console.log('not registered yet!')
      showRegistration(store);
      return;
    }

    console.log('we made it so far: valid contract & valid team registration. Now go on to the good stuff')
  } catch(ex) {
    console.log(ex);
  } finally {
    inPollCheckStatus = false;
  }
}

export default pollCheckStatus;

# pubquiz
DAPP for a decentralized pubquiz on the Ethereum blockchain with smart contracts in Solidity.

cd app
ionic serve # or: ionic lab

# Components

## The quiz generator (app/createquiz/index.json)
The quiz generator takes a list of questions and answers and creates the oracle and player info that is used to play the quiz.  
  
For each round in the quiz, two encrypted files are created. One with the questions for the round and one with the answers for the round. These are stored on IPFS and the hashes for these files are recorded in a separate file.


The quiz is 






## The pubquiz contract (app/truffle/contracts/Pubquiz.sol
A solidity contract used to play the pub quiz



## The quiz app (












## Logbook & notes
* Sometimes, only a white screen appears when you start the app in ionic (ionic server) for the first time. Quick fix: change one of the source files so that Ionic rebuilds. The app then appears. 
* 2018/05/31 - After updating ionic and some ionic components, this problem has disappeared on my installation (ubuntu 16.04). What I did:  
      sudo npm uninstall -g ionic && sudo npm install ionic  
      rm -rf node_modules  
      <i>-> had to use sudo to remove part of the tree</i>  
      npm install  
      ionic doctor check  
      <i>-> fixed the relevant problems (updated some components -> see package.json)</i>  
      npm i -D -E @ionic/app-scripts@3.1.9  

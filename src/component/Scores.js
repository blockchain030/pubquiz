import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import Typography from '@material-ui/core/Typography'; // https://material-ui.com/api/typography/
import Button from '@material-ui/core/Button';


@inject('store') @observer class Scores extends Component {

  renderTeamScoreInfo = (teamIndex,teamScoreInfo) => {
    // console.log('renderTeamScoreInfo',teamIndex,teamScoreInfo)
    return (
      <div key={teamIndex}>
        {teamIndex + 1}. {teamScoreInfo.teamName} - {teamScoreInfo.points} points<br/>
      </div>
    )
  }

  render() {
    const { store } = this.props
    
    return (        
      <div>
        <Typography paragraph={true} align='center' variant='caption'>Scores after round {store.teamScores.afterRound + 1}</Typography>
        
        <Typography paragraph={true}>
          {store.teamScores.teamScoreInfo.map((teamScoreInfo,teamIndex) => this.renderTeamScoreInfo(teamIndex,teamScoreInfo))}
        </Typography>

        <Button style={{width:'100%'}} variant="contained" color="secondary" onClick={store.hideModal}>
          Close
        </Button>
      </div>
    );
  }
}

export default Scores;

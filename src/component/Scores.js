import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'


@inject('store') @observer class Scores extends Component {
  render() {
    return (        
      <div>
        TODO: Scores
      </div>
    );
  }
}

export default Scores;

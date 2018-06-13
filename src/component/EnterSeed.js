import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { inject, observer } from 'mobx-react'
import jsQR from 'jsqr';


@inject('store') @observer class EnterSeed extends Component {
  
  componentDidMount() {
    let   video = document.createElement("video");
    const canvasElement = document.getElementById("canvas");
    const canvas = canvasElement.getContext("2d");
    const loadingMessage = document.getElementById("loadingMessage");
  
    const drawLine = (begin, end, color) =>  {
      canvas.beginPath();
      canvas.moveTo(begin.x, begin.y);
      canvas.lineTo(end.x, end.y);
      canvas.lineWidth = 4;
      canvas.strokeStyle = color;
      canvas.stroke();
    }
  
    const tick = () => {
      // console.log('EnterSeed.tick')
      let videoContainsData = false

      loadingMessage.innerText = "⌛ Loading video..."
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        loadingMessage.hidden = true;
        canvasElement.hidden = false;
        canvasElement.height = video.videoHeight;
        canvasElement.width = video.videoWidth;
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        
        videoContainsData = imageData.data[0] !== 0 || imageData.data[1] !== 0 || imageData.data[2] !== 0
        // console.log(videoContainsData, imageData.data[0], imageData.data[1], imageData.data[2])
        if (videoContainsData) {
          var code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) { // qr code found
            const mnemonic12 = code.data.split(' ').length === 12
            const color = mnemonic12 ? 'green' : 'red'; // "#FF3B58"
            drawLine(code.location.topLeftCorner    , code.location.topRightCorner   , color);
            drawLine(code.location.topRightCorner   , code.location.bottomRightCorner, color);
            drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner , color);
            drawLine(code.location.bottomLeftCorner , code.location.topLeftCorner    , color);
            if (mnemonic12) {
              this.handleSeedChange(code.data)
            }
          } // else no qr code found
        } // else !videoContainsData
      } // else not enough video data (yet)

      if (this.props.store.page !== 'enterseed') { // stop the qr scanner
        video.pause()
        video.srcObject = undefined
        video = undefined
        // console.log('video paused')
        return;
      }

      // setTimeout(function(){requestAnimationFrame(tick)}, videoContainsData ? 20 : 2000) // max 50 fps
      requestAnimationFrame(tick)
    } // end of tick()

    // Use facingMode: environment to attemt to get the front camera on phones
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
      video.srcObject = stream;
      video.setAttribute("playsinline", "true"); // required to tell iOS safari we don't want fullscreen
      video.play();
      requestAnimationFrame(tick);
    }).catch(e => {
      alert(e)
    })

  } // end of componentDidMount()

  handleSeedChange = (seed) => {
    // console.log('handleSeedChange', seed)
    this.props.store.team.setSeed(seed) // update UI now
  }

  handleSeedChangeEvent = (event) => {
    this.handleSeedChange(event.target.value)
  }
  
  render() {
    const { store } = this.props;

    return (
      <center>
        <div id="loadingMessage">Accessing video stream<br/>(please make sure you have a webcam enabled)</div>
        <canvas id="canvas" hidden></canvas>
        <TextField
          id="seed"
          label="Enter seed"
          fullWidth
          value={store.team.seed}
          onChange={this.handleSeedChangeEvent}
          margin="normal"
        />
      </center>
    );
  }
}

export default EnterSeed;

import React, { Component } from 'react';
import jsQR from 'jsqr';


class QrScanner extends Component {
  componentDidMount() {
    // console.log('QrScanner.componentDidMount')

    const video = document.createElement("video");
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
      // console.log('QrScanner.tick')
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
              console.log(code.data)
              // this.navParams.data.mnemonic = code.data;
            }
          } // else no qr code found
        } // else !videoContainsData
      } // else not enough video data (yet)

      // requestAnimationFrame(tick) // max fps
      setTimeout(function(){requestAnimationFrame(tick)}, 1000 / (videoContainsData ? 50 : 1)) // max 50 fps
    } // end of tick()

    // Use facingMode: environment to attemt to get the front camera on phones
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
      video.srcObject = stream;
      video.setAttribute("playsinline", "true"); // required to tell iOS safari we don't want fullscreen
      video.play();
      requestAnimationFrame(tick);
    });

  } // end of componentDidMount()

  render() {
    return (
      <center>
        <div id="loadingMessage">Unable to access video stream (please make sure you have a webcam enabled)</div>
        <canvas id="canvas" hidden></canvas>
      </center>
    );
  }
}

export default QrScanner;

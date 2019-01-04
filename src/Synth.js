import * as React from 'react';

window.AudioContext = window.AudioContext || window.webkitAudioContext;

let actx = new AudioContext()
let sampleRate = actx.sampleRate;
let offset = 0;

class Synth extends React.Component {

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      oscillator: null
    };
  }


 startSynth() {
    let sineWaveAt = (sampleNumber, tone) => {
        let sampleFreq = sampleRate / (tone * (Math.floor(sampleNumber/sampleRate)+1))
        let x = sampleNumber / sampleFreq
        let t = x * Math.PI*2

        return Math.sin(t) > 0 ? 1 : -1
        return -4*Math.sin(t) + 4*Math.sin(t*2)/2 - 4*Math.sin(t*3)/3  + 4*Math.sin(t*4)/4 - 4*Math.sin(t*5)/5 // + 2*Math.sin(t2)/3 + 2*Math.sin(t3)/5// + 2*Math.sin(3*t) / 3  + 2*Math.sin(5*t) / 5//  + 2*Math.sin(7*t) / 7
        //return Math.sin(sampleNumber / (sampleFreq / (Math.PI*2)))
    }

    let arr = [], volume = 0.2, seconds = 5, tone = 261.625565

    for (var i = 0; i < sampleRate * seconds; i++) {
      arr[i] = sineWaveAt(i, tone) * volume
    }

    let buf = new Float32Array(arr.length)
    for (var i = 0; i < arr.length; i++) buf[i] = arr[i]
    let buffer = actx.createBuffer(1, buf.length, actx.sampleRate)
    buffer.copyToChannel(buf, 0)
    let source = actx.createBufferSource();
    source.buffer = buffer;
    source.connect(actx.destination);
    source.start(0);
 }

 xstartSynth() {
   if(this.state.isPlaying == false) {
      console.log(" * Beep * ", sampleRate )

      this.state.isPlaying = true
      let bf = 4096

      var whiteNoise = actx.createScriptProcessor(bf, 0, 1);

      whiteNoise.onaudioprocess = function(e) {
          let mul = 220*2*Math.PI
          var output = e.outputBuffer.getChannelData(0);

          for (var i = 0; i < output.length; i++) {
              output[i] = Math.sin( mul * ((offset+i) / sampleRate));
          }

          offset += i;
          if (offset > sampleRate) {
            let old = offset
            offset -= sampleRate;
            console.log(old, offset)
          }
      }

      whiteNoise.connect(actx.destination);
    }
    /*
    if(this.state.oscillator == null) {

      let oscillator = actx.createOscillator()
      oscillator.type = "sine"
      oscillator.connect(actx.destination)
      oscillator.frequency.value = 440
      this.state.oscillator = oscillator
    }

    if(this.state.isPlaying == true) {
      this.state.isPlaying = false;
      this.state.oscillator.stop()
    }
    else {
      this.state.isPlaying = true;


      this.state.oscillator.start()
    }
    */
  }

  render() {
    return (
      <h1 onClick={this.startSynth.bind(this)}>Play Wave {this.props.name}</h1>
    );
  }
}


export default Synth;

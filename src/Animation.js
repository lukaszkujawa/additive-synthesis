import * as React from 'react';


let wave = [
]


let unit_size = 0

let waveImage = null
let waveImageBuff = null
let gridImage = null
let waveOffsPos = 433
let waveOffs = waveOffsPos

let my_curve = []
let animation = true


class Animation extends React.Component {


  constructor(props) {
    super(props);

    this.initAnimation("sin")
    this.tick = this.tick.bind(this);
  }

  initWave(wavetype) {
    wave = []
    if( wavetype == "sin") {
      wave.push( { x: 0, y: 0,  amp: 1, r: 1, angle: 0, vel: 1, col1:  "#FF0000", col2:  "#FF0000" } )
    }

    if( wavetype == "two") {
      wave.push( { x: 0, y: 0,  amp: 1, r: 1, angle: 0, vel: 5, col1:  "#FF0000", col2:  "#FF0000" } )
      wave.push( { x: 0, y: 0,  amp: 1, r: 1, angle: 90, vel: -4, col1:  "#FF0000", col2:  "#FF0000" } )
    }


    else if( wavetype == "saw")  {
      for(let xx = 1 ; xx < 16 ; xx++) {
        wave.push(  { x: 0, y: 0,  amp: 1, r: 1/xx, angle: 0, vel: 3*xx*Math.pow(-1,xx), col1:  "#FF0000", col2:  "#FFAAAA" } )
      }
    }

    else if( wavetype == "sawr")  {
      for(let xx = 1 ; xx < 16 ; xx++) {
        wave.push(  { x: 0, y: 0,  amp: 1, r: 1/xx, angle: 180, vel: 3*xx*Math.pow(-1,xx), col1:  "#FF0000", col2:  "#FFAAAA" } )
      }
    }

    else if( wavetype == "square")  {
      for(let xx = 1 ; xx < 16 ; xx++) {
          wave.push(  { x: 0, y: 0, amp: 1, r: 1/(2*xx-1), angle: 0, vel: 2*xx-1, col1:  "#FF0000", col2:  "#FFAAAA" } )
      }
    }

    else if( wavetype == "triangle")  {
      for(let xx = 1 ; xx < 6 ; xx+=4) {
          wave.push(  { x: 0, y: 0, r: 1 / Math.pow(xx, 2) , angle: 0, vel:  1.5 * xx, col1:  "#FF0000", col2:  "#FFAAAA" } )
          wave.push(  { x: 0, y: 0, r: 1 / Math.pow(xx+2, 2) , angle: 0, vel: - 1.5 * (xx+2), col1:  "#FF0000", col2:  "#FFAAAA" } )
      }
    }

    else if( wavetype == "impulse")  {
      let mxx = 8
      for(let xx = 0 ; xx < mxx ; xx++) {
        wave.push(  { x: 0, y: 0,  amp: 1, r: (mxx-xx)/mxx, angle: 270, vel: (1+xx) * Math.pow(-1,xx), col1:  "#FF0000", col2:  "#FFAAAA" } )
      }
    }

  }

  initAnimation(wavetype) {
    animation = false
    this.initWave(wavetype)
    let sum = 0
    for( let i in wave ) {
      sum += wave[i].r
    }

    for( let i in wave ) {
      wave[i].r /= sum
    }

    unit_size = 1*this.props.height/2-20
    animation = true
  }

  drawCircler(ctx, circle) {
    let radius = circle.r * unit_size
    ctx.beginPath();
    ctx.lineWidth = 1
    ctx.strokeStyle = circle.col1
    ctx.arc(circle.x, circle.y, radius, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 1
    ctx.strokeStyle = circle.col2
    ctx.moveTo(circle.x, circle.y);
    let y = circle.y - radius
    let rad = circle.angle * Math.PI/180
    let xp = circle.x+radius * Math.cos(rad)
    let yp = circle.y+radius * Math.sin(rad)
    ctx.lineTo(xp, yp);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(xp, yp, 4, 0, 2 * Math.PI);
    ctx.fillStyle = circle.col2
    ctx.fill();
    ctx.stroke();

    return [xp, yp]
  }

  drawGrid(canvas, ctx) {
    let ymid = (canvas.height/2).toFixed(0)*1
    let cx = canvas.width / 4
    ctx.globalAlpha = 0.2;
    ctx.beginPath();
    ctx.lineWidth = 1
    ctx.strokeStyle = "#333333"
    ctx.moveTo(20, ymid)
    ctx.lineTo(canvas.width, ymid);

    ctx.moveTo(20, ymid+1*unit_size)
    ctx.lineTo(canvas.width, ymid+1*unit_size);

    ctx.moveTo(20, ymid  - unit_size)
    ctx.lineTo(canvas.width, ymid - unit_size);

    for(let i = -1 ; i < 7 ; i++) {
      ctx.moveTo(cx+i*unit_size, 20)
      ctx.lineTo(cx+i*unit_size, canvas.height-20);
    }

    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  drawCurve(ctx) {
    if(my_curve.length < 2) return

    ctx.beginPath();
    ctx.lineWidth = 1
    ctx.strokeStyle = "#FF0000"
    ctx.moveTo(my_curve.lenght, my_curve[my_curve.lenght-1])

    for(let x = my_curve.length-2 ; x >= 0 ; x--){
      ctx.lineTo(waveOffsPos + my_curve.length - x, my_curve[x]);
    }

    ctx.stroke();
  }

  tick() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    if(waveImage == null) {
      waveImage = ctx.createImageData(canvas.width, canvas.height);
      waveImageBuff = ctx.createImageData(canvas.width, canvas.height);
    }

    const { width, height } = this.props;
    ctx.clearRect(0, 0, width, height);
    ctx.save()

    //ctx.putImageData(waveImage, waveOffsPos - waveOffs , 0);
    this.drawGrid(canvas, ctx)

    let cords = [canvas.width / 4, canvas.height / 2]

    for(let i in wave) {
      let ci = wave[i]
      ci.x = cords[0]
      ci.y = cords[1]
      cords = this.drawCircler(ctx, ci)
      ci.angle += ci.vel
      if(ci.angle > 360) ci.angle -= 360
    }

    ctx.beginPath();
    ctx.lineWidth = 1
    ctx.strokeStyle = "#333333"
    ctx.moveTo(cords[0], cords[1])
    ctx.lineTo(waveOffsPos, cords[1]);
    ctx.arc(waveOffsPos, cords[1], 2, 0, 2 * Math.PI);
    ctx.stroke();

    my_curve.push(cords[1].toFixed(0))
    if(my_curve.length > 700) {
      my_curve = my_curve.slice(-350)
    }
    this.drawCurve(ctx)


    ctx.restore()
    if(animation) requestAnimationFrame(this.tick);
  }

  componentDidMount() {

    requestAnimationFrame(this.tick)
  }

  restart(wavetype) {
    my_curve = []
    waveOffs = waveOffsPos
    this.initAnimation(wavetype)
  }

  render() {
    const { width, height } = this.props;

    return (
      <div>
        <h3>Additive Synthesis</h3>
        <div className="nav">
          <div className="button" onClick={() => this.restart("sin")}>SINE</div>
          <div className="button" onClick={() => this.restart("two")}>2x SINE</div>
          <div className="button" onClick={() => this.restart("saw")}>SAW</div>
          <div className="button" onClick={() => this.restart("sawr")}>SAW-R</div>
          <div className="button" onClick={() => this.restart("triangle")}>TRIANGLE</div>
          <div className="button" onClick={() => this.restart("impulse")}>IMPULSE</div>
          <div className="button" onClick={() => this.restart("square")}>SQUARE</div>
        </div>
        <canvas ref="canvas" width={width} height={height} />
      </div>
    );
  }
}

export default Animation;

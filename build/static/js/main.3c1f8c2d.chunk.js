(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,n){},17:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},18:function(e,t,n){},20:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(8),o=n.n(r),l=(n(15),n(1)),c=n(2),s=n(4),h=n(3),u=n(5);n(17),n(18);window.AudioContext=window.AudioContext||window.webkitAudioContext;var v=new AudioContext,f=v.sampleRate,d=0,m=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(h.a)(t).call(this,e))).state={isPlaying:!1,oscillator:null},n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"startSynth",value:function(){for(var e=function(e,t){var n=e/(f/(t*(Math.floor(e/f)+1)))*Math.PI*2;return Math.sin(n)>0?1:-1},t=[],n=0;n<5*f;n++)t[n]=.2*e(n,261.625565);var a=new Float32Array(t.length);for(n=0;n<t.length;n++)a[n]=t[n];var i=v.createBuffer(1,a.length,v.sampleRate);i.copyToChannel(a,0);var r=v.createBufferSource();r.buffer=i,r.connect(v.destination),r.start(0)}},{key:"xstartSynth",value:function(){if(0==this.state.isPlaying){console.log(" * Beep * ",f),this.state.isPlaying=!0;var e=v.createScriptProcessor(4096,0,1);e.onaudioprocess=function(e){for(var t=440*Math.PI,n=e.outputBuffer.getChannelData(0),a=0;a<n.length;a++)n[a]=Math.sin(t*((d+a)/f));if((d+=a)>f){var i=d;d-=f,console.log(i,d)}},e.connect(v.destination)}}},{key:"render",value:function(){return a.createElement("h1",{onClick:this.startSynth.bind(this)},"Play Wave ",this.props.name)}}]),t}(a.Component);m.defaultProps={};var g=n(6),p=[],w=0,y=null,F=[],k=!0,A=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(h.a)(t).call(this,e))).initAnimation("sin"),n.tick=n.tick.bind(Object(g.a)(Object(g.a)(n))),n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"initWave",value:function(e){if(p=[],"sin"==e&&p.push({x:0,y:0,amp:1,r:1,angle:0,vel:1,col1:"#FF0000",col2:"#FF0000"}),"two"==e)p.push({x:0,y:0,amp:1,r:1,angle:0,vel:5,col1:"#FF0000",col2:"#FF0000"}),p.push({x:0,y:0,amp:1,r:1,angle:90,vel:-4,col1:"#FF0000",col2:"#FF0000"});else if("saw"==e)for(var t=1;t<16;t++)p.push({x:0,y:0,amp:1,r:1/t,angle:0,vel:3*t*Math.pow(-1,t),col1:"#FF0000",col2:"#FFAAAA"});else if("sawr"==e)for(var n=1;n<16;n++)p.push({x:0,y:0,amp:1,r:1/n,angle:180,vel:3*n*Math.pow(-1,n),col1:"#FF0000",col2:"#FFAAAA"});else if("square"==e)for(var a=1;a<16;a++)p.push({x:0,y:0,amp:1,r:1/(2*a-1),angle:0,vel:2*a-1,col1:"#FF0000",col2:"#FFAAAA"});else if("triangle"==e)for(var i=1;i<6;i+=4)p.push({x:0,y:0,r:1/Math.pow(i,2),angle:0,vel:1.5*i,col1:"#FF0000",col2:"#FFAAAA"}),p.push({x:0,y:0,r:1/Math.pow(i+2,2),angle:0,vel:-1.5*(i+2),col1:"#FF0000",col2:"#FFAAAA"});else if("impulse"==e)for(var r=0;r<8;r++)p.push({x:0,y:0,amp:1,r:(8-r)/8,angle:270,vel:(1+r)*Math.pow(-1,r),col1:"#FF0000",col2:"#FFAAAA"})}},{key:"initAnimation",value:function(e){k=!1,this.initWave(e);var t=0;for(var n in p)t+=p[n].r;for(var a in p)p[a].r/=t;w=1*this.props.height/2-20,k=!0}},{key:"drawCircler",value:function(e,t){var n=t.r*w;e.beginPath(),e.lineWidth=1,e.strokeStyle=t.col1,e.arc(t.x,t.y,n,0,2*Math.PI),e.stroke(),e.beginPath(),e.lineWidth=1,e.strokeStyle=t.col2,e.moveTo(t.x,t.y);t.y;var a=t.angle*Math.PI/180,i=t.x+n*Math.cos(a),r=t.y+n*Math.sin(a);return e.lineTo(i,r),e.stroke(),e.beginPath(),e.arc(i,r,4,0,2*Math.PI),e.fillStyle=t.col2,e.fill(),e.stroke(),[i,r]}},{key:"drawGrid",value:function(e,t){var n=1*(e.height/2).toFixed(0),a=e.width/4;t.globalAlpha=.2,t.beginPath(),t.lineWidth=1,t.strokeStyle="#333333",t.moveTo(20,n),t.lineTo(e.width,n),t.moveTo(20,n+1*w),t.lineTo(e.width,n+1*w),t.moveTo(20,n-w),t.lineTo(e.width,n-w);for(var i=-1;i<7;i++)t.moveTo(a+i*w,20),t.lineTo(a+i*w,e.height-20);t.stroke(),t.globalAlpha=1}},{key:"drawCurve",value:function(e){if(!(F.length<2)){e.beginPath(),e.lineWidth=1,e.strokeStyle="#FF0000",e.moveTo(F.lenght,F[F.lenght-1]);for(var t=F.length-2;t>=0;t--)e.lineTo(433+F.length-t,F[t]);e.stroke()}}},{key:"tick",value:function(){var e=this.refs.canvas,t=e.getContext("2d");null==y&&(y=t.createImageData(e.width,e.height),t.createImageData(e.width,e.height));var n=this.props,a=n.width,i=n.height;t.clearRect(0,0,a,i),t.save(),this.drawGrid(e,t);var r=[e.width/4,e.height/2];for(var o in p){var l=p[o];l.x=r[0],l.y=r[1],r=this.drawCircler(t,l),l.angle+=l.vel,l.angle>360&&(l.angle-=360)}t.beginPath(),t.lineWidth=1,t.strokeStyle="#333333",t.moveTo(r[0],r[1]),t.lineTo(433,r[1]),t.arc(433,r[1],2,0,2*Math.PI),t.stroke(),F.push(r[1].toFixed(0)),F.length>700&&(F=F.slice(-350)),this.drawCurve(t),t.restore(),k&&requestAnimationFrame(this.tick)}},{key:"componentDidMount",value:function(){requestAnimationFrame(this.tick)}},{key:"restart",value:function(e){F=[],433,this.initAnimation(e)}},{key:"render",value:function(){var e=this,t=this.props,n=t.width,i=t.height;return a.createElement("div",null,a.createElement("h3",null,"Additive Synthesis"),a.createElement("div",{className:"nav"},a.createElement("div",{className:"button",onClick:function(){return e.restart("sin")}},"SINE"),a.createElement("div",{className:"button",onClick:function(){return e.restart("two")}},"2x SINE"),a.createElement("div",{className:"button",onClick:function(){return e.restart("saw")}},"SAW"),a.createElement("div",{className:"button",onClick:function(){return e.restart("sawr")}},"SAW-R"),a.createElement("div",{className:"button",onClick:function(){return e.restart("triangle")}},"TRIANGLE"),a.createElement("div",{className:"button",onClick:function(){return e.restart("impulse")}},"IMPULSE"),a.createElement("div",{className:"button",onClick:function(){return e.restart("square")}},"SQUARE")),a.createElement("canvas",{ref:"canvas",width:n,height:i}))}}]),t}(a.Component),b=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"App"},i.a.createElement(A,{width:"960",height:"425"}))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,n){e.exports=n(20)}},[[9,2,1]]]);
//# sourceMappingURL=main.3c1f8c2d.chunk.js.map
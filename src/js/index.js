import Chameleon from './chameleon';

const canvas = document.getElementById("demo");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

const FRAMES_PRE_SECOND = 30;
const MILLIS_PER_FRAME = Math.floor(1000 / FRAMES_PRE_SECOND);

const rand255 = ()=>Math.random()*255;
const c2 = new Chameleon(rand255(), rand255(), rand255(), 1, 700, Chameleon.easing.LINEAR);
const c1 = new Chameleon(rand255(), rand255(), rand255(), 1, 300, Chameleon.easing.IN_OUT_QUADRATIC );
const colors = [c1, c2];



let drawHandle = 0;

const draw = ()=>{
  c1.update();
  c2.update();
  ctx.fillStyle = c1.toString();
  ctx.fillRect(0,0,W/2,H);
  ctx.fillStyle = c2.toString();
  ctx.fillRect(W/2,0,W/2,H);
  const anyUpdating = colors.reduce((soFar, c)=>soFar || c.isUpdating(), false);
  if (!anyUpdating) {
    stopDraw();
  } else {
    console.log('still drawing')
  }
}

const requestDraw = ()=>requestAnimationFrame(draw);

const launchDraw = ()=>{
  if (drawHandle === 0) {
    drawHandle = setInterval(requestDraw, MILLIS_PER_FRAME);
  }
}

const stopDraw = ()=>{
  if (drawHandle !==0) {
    const tmp = drawHandle;
    drawHandle = 0;
    clearInterval(tmp);
  }
}

launchDraw();

document.addEventListener('click', ()=>{
  c1.moveTo(rand255(), rand255(), rand255(), 1);
  c2.moveTo(rand255(), rand255(), rand255(), 1);
  launchDraw();
});

document.addEventListener("DOMContentLoaded", ()=>{
  console.log('ready');
  fetch('/js/index.js').then(r=>r.text()).then(js=>document.querySelector("pre").innerHTML = js);
});


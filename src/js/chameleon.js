
const DEFAULT_DURATION = 150; // in milliseconds

/*
other variations can be found at https://easings.net/
*/
const LINEAR = n=>n;
const IN_OUT_QUADRATIC = n=> n < 0.5 ? (2 * n * n) : (1 - Math.pow(-2 * n + 2, 2) / 2);
const IN_QUADRATIC = n => n * n;
const OUT_QUADRATIC = n => 1 - (1 - n) * (1 - n);


export default class Chameleon {

  constructor(r, g, b, a = 1, duration = DEFAULT_DURATION, easing= LINEAR) {
    this.set(r, g, b, a);
    this.progress = 1;
    this.duration = Number.isFinite(duration) ? duration : DEFAULT_DURATION;
    this.startTime = -1;
    this.easing = easing;
  }

  set(r, g, b, a = 1) {
    r = returnSafeNumber(r);
    g = returnSafeNumber(g);
    b = returnSafeNumber(b);
    a = returnSafeNumber(a);
    this.rgba = [r, g, b, a];
    this.start = [r, g, b, a];
    this.target = [r, g, b, a];
    this.diff = [];
  }

  moveTo(r,g,b,a) {
    this.setTarget(r,g,b,a);
    this.startTransition();
  }

  /* sets the target color but does not start the transition */
  setTarget(r,g,b,a) {
    this.rgba.forEach((c,i)=>this.start[i] = c);
    r = returnSafeNumber(r);
    g = returnSafeNumber(g);
    b = returnSafeNumber(b);
    a = returnSafeNumber(a);
    this.target = [r, g, b, a];
    this.target.forEach((c, i)=> this.diff[i] = c-this.start[i]);
  }

  startTransition() {
    this.startTime = Date.now();
    this.progress = 0;
  }


  update() {
    if (this.progress < 1) {
      this.progress = (Date.now() - this.startTime) / this.duration;
      if (this.progress >= 1) {
        this.rgba = this.target.slice(0);
      } else {
        const progress = this.easing(this.progress);
        this.start.forEach((c, i)=>this.rgba[i] = c + this.diff[i] * progress);
      }
    }
  }

  isUpdating() {
    return this.progress < 1;
  }

  toString() {
    const [r,g,b,a] = this.rgba;
    return `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${a})`;
  }
}


Chameleon.easing = { LINEAR, IN_OUT_QUADRATIC, IN_QUADRATIC, OUT_QUADRATIC };




const returnSafeNumber = n=>Number.isFinite(n) ? n : 0;
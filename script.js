const colorList = ['maroon','brown','olive','teal','navy','black','red','orange','yellow','lime','green','cyan','blue','purple','magenta','grey','pink','apricot','beige','mint','lavender','white'];

let colors = {};
let currentDrawingFunction = () => {};
let tShrinkFactor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(RADIUS);
  createNewColorScheme();
  tShrinkFactor = random(10000);
  noLoop();
}

function draw() {
  resetToDefaultColors();
  currentDrawingFunction();
}

function createNewColorScheme() {
  colors.defaultStroke = color(random(colorList));
  colors.defaultFill = color(random(colorList));
  colors.defaultBG = color(random(colorList.filter( c => c != colors.defaultStroke || c != colors.defaultFill )))  
  resetToDefaultColors();
  redraw();
}

function resetToDefaultColors() {
  stroke(colors.defaultStroke);
  fill(colors.defaultFill);
  background(colors.defaultBG);
  redraw();
}

// key bindings
const functionBindings = {
  "1":drawCircles,
  "2":cantor,
  "3":koch
}

const utilBindings = {
  "a": () => isLooping() ? noLoop() : loop(),
  "c": createNewColorScheme
}

function keyPressed() {
  if( key in functionBindings ) {
    resetToDefaultColors();
    currentDrawingFunction = functionBindings[key];
    redraw()
  }
  if( key in utilBindings ) {
    utilBindings[key]()
  }
}

function drawCircles(x=width/2, y=height/2, r=(width > height ? height/2 : width/2 )) {
  noFill();
  circle(x, y, r);
  if(r > 2) {
    r *= 0.75;    
    // r *= map(noise(tShrinkFactor),0,1,0.5,0.9);
    // tShrinkFactor += 0.0001;
    drawCircles(x, y, r);
  }  
}

function cantor( x = 0, y = height/3, length = width ) {
  if( length > 1 ) {
    line( x, y, x + length, y );
    y += 20;
    // y += map(noise(tShrinkFactor),0,1,10,30);
    // tShrinkFactor += 0.0001;
    cantor(x,y,length/3);
    cantor(x+length*2/3,y,length/3); 
  }
}

function koch( n = 4 ) {
  const kLine = (k) => { line(k.start.x, k.start.y, k.end.x, k.end.y) }
  const kLinesFor = (k) => {
    const v = p5.Vector.sub(k.end,k.start);
    const a = k.start.copy();
    const b = v.copy().div(3).add(k.start);
    const d = v.copy().mult(2/3).add(k.start);
    const e = k.end.copy();
    let c = a.copy();
    const v3 = v.copy().div(3)
    c.add(v3);
    v3.rotate(-radians(60));
    c.add(v3);
    return [{start:a,end:b},{start:b,end:c},{start:c,end:d},{start:d,end:e}];
  }

  let lines = [{
    start: createVector(0,height/2),
    end: createVector(width,height/2)
  }];

  for( let i = 0; i < n; i++ ) {
    newLines = [];
    for( const l of lines ) {
      newLines = [...newLines, ...kLinesFor(l)]
    }
    lines = newLines;
  }
  
  for( let l of lines ) {
    kLine(l);
  }
  
}
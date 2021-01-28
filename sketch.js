
// ml5 Face Detection Model
let faceapi;
let detections = [];
let mode;
let video;

function preload(){
  img1 = loadImage('/horse.jpg');
  img2 = loadImage('/horse.jpg');
}
function setup() {
  createCanvas(720, 270);
  video = createCapture(VIDEO);
  video.size(360, 270);
  video.hide();
  const faceOptions = { withLandmarks: true, withExpressions: false, withDescriptors: false };
  faceapi = ml5.faceApi(video, faceOptions, faceReady);
  img2.filter(BLUR,10);
  img1.resize(360,270);
  mode=0;
}

// Start detecting faces
function faceReady() {
  faceapi.detect(gotFaces);
}

// Got faces
function gotFaces(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  detections = result;
  faceapi.detect(gotFaces);
}

// Draw everything
function draw() {
  image(video, 360, 0, 360, 270);
  var xmax=0;
  var xmin=9999;
  var ymax=0;
  var ymin=9999;
  if (detections.length > 0) {
    let points = detections[0].landmarks.positions;
    for (let i = 0; i < points.length; i++) {
      if(points[i]._x>xmax){
        xmax=points[i]._x;
      }
      if(points[i]._y>ymax){
        ymax=points[i]._y;
      }
      if(points[i]._x<xmin){
        xmin=points[i]._x;
      }
      if(points[i]._y<ymin){
        ymin=points[i]._y;
      }
    }
      let w = xmax-xmin;
      let h =ymax-ymin;
      let Sx=xmin;
      let Sy= ymin;
      
      stroke(161, 95, 251);
      strokeWeight(4);
      noFill();
      rec1=rect(Sx+360,Sy,w,h);
      if(mode==0){
        image(img1, 0, 0, 360, 270);
      }
     if(mode==1){
       image(img2, 0, 0, 360, 270);
       
       image(img1, Sx, Sy, w, h,Sx,Sy,w,h);
      }
     if(mode==2){
       image(img1, 0, 0, 360, 270);
       let d= dist(Sx,Sy,150,0);
       if(d<30){
         copy(Sx+360+2,Sy+2,w-4,h-4,170,0,50,50);
       }
     }
    stroke(255, 0, 0);
    strokeWeight(10);
    point1= point(Sx+w/2,Sy+h/2);     
  }
}

 function keyReleased(){
    if(key=='v'){
       mode=1;
    }
     if(key=='e'){
      mode=0;
     }
    if(key=='r'){
      mode=2;
     }
  }
const cv = document.getElementById("cv");
const ctx = cv.getContext("2d");

const pos = [50, 50];
const speed = [200, 60];
const size = 300;
let lastTime;

function draw(time) {
  if (!lastTime) {
    lastTime = time;
  }
  const ellapsedTimeS = (time - lastTime) / 1000;
  lastTime = time;
  //console.log(ellapsedTime);

  ctx.fillStyle = "rgb(0, 80, 120)";
  ctx.clearRect(0, 0, 300, 300);
  
  ctx.beginPath();
  pos[0] += ellapsedTimeS * speed[0];
  pos[1] += ellapsedTimeS * speed[1];
  pos[0] = pos[0] >= size ? pos[0] % size : pos[0];
  pos[1] = pos[1] >= size ? pos[1] % size : pos[1];
  ctx.arc(pos[0], pos[1], 20, 0, 2 * Math.PI, true);
  ctx.fill();

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

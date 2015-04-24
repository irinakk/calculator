var cx = document.querySelector(".canvas").getContext('2d');
var min_gap = 120,
  max_gap = 180,
  num = Math.ceil(document.querySelector(".canvas").getAttribute("width") / ((min_gap + max_gap) / 2));



function drawPlum() {
  cx.rotate(15 * Math.PI / 180);
  for (var i = 0; i < 5; i++) {
    drawPetal();
    cx.rotate(27 * Math.PI / 180);
  }
  cx.save();
  drawStamen();

  cx.restore();
  cx.rotate(30 * Math.PI / 180);
  cx.translate(160, -20);
  cx.scale(.7, .7);
  drawPetal();
  cx.rotate(-45 * Math.PI / 180);
  cx.scale(10 / 7, 10 / 7);
  cx.translate(-160, 20);
  cx.rotate(-30 * Math.PI / 180);
  cx.rotate(-15 * Math.PI / 180);
}

function drawPetal() {
  cx.beginPath();
  cx.moveTo(0, -7);
  cx.bezierCurveTo(-100, -120, 100, -120, 0, -7);
  cx.closePath();
  cx.fill();
  cx.rotate(45 * Math.PI / 180);
  cx.clearRect(-80, -80, 20, 20);
}

function drawStamen() {
  cx.fillStyle = '#fff';
  cx.strokeStyle = '#fff';
  cx.lineWidth = 2;
  cx.beginPath();
  cx.arc(8, -7, 10, 0, Math.PI * 2);
  cx.closePath();
  cx.fill();
  cx.stroke();
  cx.beginPath();
  cx.arc(5, 10, 5, 0, Math.PI * 2);
  cx.closePath();
  cx.fill();
  cx.stroke();
  cx.beginPath();
  cx.arc(-15, 15, 2, 0, Math.PI * 2);
  cx.closePath();
  cx.fill();
  cx.stroke();
  cx.beginPath();
  cx.arc(15, 30, 5, 0, Math.PI * 2);
  cx.closePath();
  cx.fill();
  cx.stroke();
}

(function paint() {
  cx.translate(100, 100);
  cx.scale(.9, .9);
  var grad = cx.createLinearGradient(0, -120, 0, 0);
  grad.addColorStop(0, '#FEEDE3');
  grad.addColorStop(0.6, '#FAD7C3');
  grad.addColorStop(0.8, '#FFC5C1');
  grad.addColorStop(1, '#EC6988');
  cx.fillStyle = grad;


  drawPlum();
  cx.translate(-120, 200);
  drawPlum();
  cx.translate(300, 0);
  drawPlum();
  for (var n = 0; n < num - 2; n++) {
    cx.translate(min_gap, -200);
    drawPlum();
    cx.translate(max_gap, 200);
    drawPlum();
  }
})();
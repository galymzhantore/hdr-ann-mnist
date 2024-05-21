const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;

function startDrawing(e) {
  isDrawing = true;
  draw(e);
}

function stopDrawing() {
  isDrawing = false;
  ctx.stroke();
  ctx.beginPath();
}

function draw(e) {
  if (!isDrawing) return;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.strokeStyle = "black";

  ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.stroke();
  ctx.beginPath();
  document.getElementById("prediction").innerHTML = "";
}
function resizeCanvas() {
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");
  tempCanvas.width = 28;
  tempCanvas.height = 28;
  tempCtx.drawImage(canvas, 0, 0, 28, 28);
  return tempCanvas;
}
function canvasToMNISTTensor() {
  const resizedCanvas = resizeCanvas();
  const tmpctx = resizedCanvas.getContext("2d");
  let imageDatas = tmpctx.getImageData(0, 0, 28, 28);
  let tensorArray = Array.from(imageDatas.data).map((value) => value);
  const hasNonZero = tensorArray.some((value) => value !== 0);
  if (!hasNonZero) {
    return null;
  }
  // (0, 0, 0, 0) -> white
  // (0, 0, 0, 255) -> black
  let toTensor = [];

  for (let i = 0; i < tensorArray.length; i += 4) {
    let color = (tensorArray[i] + tensorArray[i + 1] + tensorArray[i + 2]) / 3;
    if (color === 0) {
      toTensor.push(tensorArray[i + 3] == 0 ? 0 : 255);
    }
  }
  let tensor2D = [];
  for (let i = 0; i < 28; i++) {
    tensor2D.push(toTensor.slice(i * 28, (i + 1) * 28));
  }

  return tensor2D;
}
function submitDrawing() {
  const tensor = canvasToMNISTTensor();
  $.ajax({
    url: "/process",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ value: tensor }),
    success: function (data) {
      document.getElementById("prediction").innerHTML = data.prediction;
    },
    error: function (error) {
      console.log(error);
    },
  });
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

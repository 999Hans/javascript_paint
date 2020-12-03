const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "#2c2c2c";

ctx.lineWidth = 2.5;
ctx.fillStyle = "white";

let painting = false;
let filling = false;

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function changeColor(event) {
  ctx.strokeStyle = event.target.style.backgroundColor;
  ctx.fillStyle = event.target.style.backgroundColor;
}
function changeSize(event) {
  ctx.lineWidth = event.target.value;
}

function changeMode(event) {
  if (!filling) {
    event.target.innerText = "PAINT";
    filling = true;
  } else {
    event.target.innerText = "FIll";
    filling = false;
  }
}

function fillCanvas() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function rightClick(event) {
  event.preventDefault();
}

function saveCanvas() {
  let url = canvas.toDataURL("image/png");
  let image = document.createElement("A");

  image.href = url;
  image.download = "jsPaint";
  image.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", fillCanvas);
  canvas.addEventListener("contextmenu", rightClick);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", changeColor)
);

if (range) {
  range.addEventListener("input", changeSize);
}

if (mode) {
  mode.addEventListener("click", changeMode);
}

if (save) {
  save.addEventListener("click", saveCanvas);
}

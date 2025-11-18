let spriteSheet;
let frames = [];
const frameW = 63;       // 單張影格寬度
const frameH = 79;       // 單張影格高度
const frameSpacing = 5;  // 每張影格之間的間隔
const totalFrames = 12;  // spritesheet 中的影格數量

let currentFrame = 0;
let frameCounter = 0;
const frameDelay = 6;    // 動畫切換速度（數字越大越慢）
const spriteScale = 1;   // 可以改變角色大小 (1 = 原始大小)

let posX, posY;
const spriteSpeed = 4;
let facing = 1; // 1 = 向右, -1 = 向左

function preload() {
  // 圖片路徑：6/all.png
  spriteSheet = loadImage('6/all.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1); // 保持像素風格時可確保顯示一致
  imageMode(CENTER);
  noSmooth(); // 若為像素風格可開啟

  // 初始位置置中
  posX = width / 2;
  posY = height / 2;

  // 根據 spritesheet 水平排列方式切割影格（preload 已確保圖片載入完成）
  for (let i = 0; i < totalFrames; i++) {
    let fx = i * (frameW + frameSpacing);
    frames[i] = spriteSheet.get(fx, 0, frameW, frameH);
  }
}

function draw() {
  background('#73BF00');

  // 鍵盤移動（平滑）
  let moved = false;
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // 65 = 'A'
    posX -= spriteSpeed;
    facing = -1;
    moved = true;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // 68 = 'D'
    posX += spriteSpeed;
    facing = 1;
    moved = true;
  }
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) { // 87 = 'W'
    posY -= spriteSpeed;
    moved = true;
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { // 83 = 'S'
    posY += spriteSpeed;
    moved = true;
  }

  // 邊界限制（考慮縮放與圖片大小）
  const halfW = (frameW * spriteScale) / 2;
  const halfH = (frameH * spriteScale) / 2;
  posX = constrain(posX, halfW, width - halfW);
  posY = constrain(posY, halfH, height - halfH);

  // 顯示目前影格於指定位置，並依 spriteScale 與 facing 縮放/翻轉
  if (frames[currentFrame]) {
    push();
    translate(posX, posY);
    scale(spriteScale * facing, spriteScale);
    image(frames[currentFrame], 0, 0);
    pop();
  }

  // 更新動畫（只有在移動或持續播放時仍可自動播放）
  frameCounter++;
  if (frameCounter >= frameDelay) {
    frameCounter = 0;
    currentFrame = (currentFrame + 1) % totalFrames;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // 調整位置以確保在新視窗大小內
  const halfW = (frameW * spriteScale) / 2;
  const halfH = (frameH * spriteScale) / 2;
  posX = constrain(posX, halfW, width - halfW);
  posY = constrain(posY, halfH, height - halfH);
}

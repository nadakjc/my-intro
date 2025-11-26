// ----- 1. 캔버스, 컨텍스트 가져오기 -----
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// ----- 2. 공 상태 변수 설정 -----
let x = canvas.width / 2;   // 공의 x 위치 (가로)
let y = canvas.height / 2;  // 공의 y 위치 (세로)
let vx = 3;                 // x 방향 속도
let vy = 2;                 // y 방향 속도
const radius = 15;          // 공 반지름

// ----- 3. 공 그리기 함수 -----
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2); // 원 그리기
  ctx.fillStyle = "#ffffff";              // 공 색상 (흰색)
  ctx.fill();                             // 내부 채우기
  ctx.closePath();
}

// ----- 4. 매 프레임마다 호출될 업데이트 함수 -----
function update() {
  // 배경 지우기 (다음 프레임을 위해 캔버스 clear)
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 공 위치 업데이트
  x += vx;
  y += vy;

  // 벽에 부딪히면 튕기기 (좌우)
  if (x + radius > canvas.width || x - radius < 0) {
    vx = -vx; // x 방향 반전
  }

  // 위아래 벽 충돌
  if (y + radius > canvas.height || y - radius < 0) {
    vy = -vy; // y 방향 반전
  }

  // 공 다시 그리기
  drawBall();

  // 다음 프레임 예약 (브라우저가 최적 타이밍에 호출)
  requestAnimationFrame(update);
}

// ----- 5. 게임 시작 -----
update();

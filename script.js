const car = document.querySelector(".car");
const scoreDisplay = document.getElementById("score");
const gameOverText = document.getElementById("gameOver");
const restartBtn = document.getElementById("restartBtn");
const startBtn = document.getElementById("startBtn");
const optionBtn = document.getElementById("optionBtn");
const backBtn = document.getElementById("backBtn");
const menuContainer = document.getElementById("menuContainer");
const gameContainer = document.getElementById("gameContainer");
const optionContainer = document.getElementById("optionContainer");

// Load audio elements
const bgMusic = document.getElementById("bgMusic");
const collisionSound = document.getElementById("collisionSound");

let carPosition = 125;
let obstacleSpeed = 3; // Initial speed
let speedIncrement = 0.1; // Speed increases by 0.1 every time an obstacle reaches the bottom
let score = 0;
let gameOver = false;
let obstacles = [];

// Start Game
startBtn.addEventListener("click", () => {
  menuContainer.style.display = "none";
  gameContainer.style.display = "block";
  startGame();
  bgMusic.play(); // Play background music
});

// Show Options
optionBtn.addEventListener("click", () => {
  menuContainer.style.display = "none";
  optionContainer.style.display = "block";
});

// Back to Menu
backBtn.addEventListener("click", () => {
  optionContainer.style.display = "none";
  menuContainer.style.display = "block";
});

// Move car left
document.getElementById("leftBtn").addEventListener("click", () => {
  if (carPosition > 0 && !gameOver) {
    carPosition -= 50;
    car.style.left = carPosition + "px";
  }
});

// Move car right
document.getElementById("rightBtn").addEventListener("click", () => {
  if (carPosition < 250 && !gameOver) {
    carPosition += 50;
    car.style.left = carPosition + "px";
  }
});

// Restart Game
restartBtn.addEventListener("click", () => {
  location.reload(); // Reload page to restart game
});

// Start the game loop
function startGame() {
  gameOver = false;
  score = 0;
  obstacleSpeed = 3; // Reset speed to initial
  speedIncrement = 0.1; // Reset speed increment
  scoreDisplay.textContent = score;
  obstacles = [];
  createObstacles(); // Create multiple obstacles
  moveObstacles();
}

// Create multiple obstacles
function createObstacles() {
  for (let i = 0; i < 3; i++) {
    // 3 obstacles for now
    let obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.left = Math.floor(Math.random() * 3) * 100 + "px";
    obstacle.style.top = `${-100 * (i + 1)}px`; // Stagger the positions
    document.querySelector(".road").appendChild(obstacle);
    obstacles.push(obstacle);
  }
}

// Move obstacles and detect collision
function moveObstacles() {
  if (gameOver) return;

  obstacles.forEach((obstacle) => {
    let obstaclePosition = parseInt(obstacle.style.top);
    obstaclePosition += obstacleSpeed;
    obstacle.style.top = obstaclePosition + "px";

    // Reset obstacle position and increase score
    if (obstaclePosition > 500) {
      obstacle.style.top = "-100px";
      obstacle.style.left = Math.floor(Math.random() * 3) * 100 + "px";
      score += 10;
      scoreDisplay.textContent = score;

      // Increase the speed of obstacles
      obstacleSpeed += speedIncrement;
    }

    // Detect collision with car
    const obstacleTop = parseInt(
      window.getComputedStyle(obstacle).getPropertyValue("top")
    );
    const obstacleLeft = parseInt(
      window.getComputedStyle(obstacle).getPropertyValue("left")
    );

    // Game over if the obstacle is below the car's position
    if (obstacleTop > 400 && obstacleTop < 500) {
      // Check if obstacle is in the same lane as the car
      if (obstacleLeft === carPosition) {
        gameOver = true;
        gameOverText.style.display = "block"; // Display "Game Over" message
        restartBtn.style.display = "inline-block"; // Show restart button
        bgMusic.pause(); // Stop background music
        collisionSound.play(); // Play collision sound
      }
    }
  });

  if (!gameOver) {
    requestAnimationFrame(moveObstacles);
  }
}

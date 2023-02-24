//------Game rule------
// Based on the concept of Whack-a mole game , Buzz Lightyear and Woody randomly appear on the screen. Clicking Buzz adds 10 points to the score, while clicking Woody deducts 10 points and a red cross image will also appear.

const homeScreen = document.getElementById("home-screen");
const start_btn = document.getElementById("start-btn");
const end_btn = document.getElementById("end-btn");
const gameScreen = document.getElementById("game-screen");
const time = document.getElementById("time");
const scores = document.getElementById("score");
const message = document.getElementById("message");
const endGame = document.getElementById("end-game-button");

const buzzList = document.querySelectorAll(".buzz");
const woodyList = document.querySelectorAll(".woody");
const wrong = document.querySelectorAll(".wrong");

let currentPage = 1;

let timeUP = false;
let score = 0;

start_btn.addEventListener("click", function () {
  if (currentPage === 1) {
    gameScreen.scrollIntoView({ behavior: "smooth" });
    currentPage = 2;
  }
});

for (let i = 0; i < buzzList.length; i++) {
  buzzList[i].onclick = function () {
    this.style.display = "none";
    score += 10;
    scores.innerHTML = score;

    setTimeout(function () {
      this.style.display = "none";
    }, 260);
  };
}
setInterval(function () {
  const i = Math.floor(Math.random() * 9);
  buzzList[i].style.display = "block";
}, 700);

// -----woody----

for (let i = 0; i < woodyList.length; i++) {
  woodyList[i].onclick = function () {
    this.style.display = "none";
    score -= 10;
    scores.innerHTML = score;
    const timer = setTimeout(() => {}, 260);
  };
}

setInterval(function () {
  const i = Math.floor(Math.random() * 9);
  woodyList[i].style.display = "block";
}, 6000);

// ------End Game-----
endGame.addEventListener("click", function () {
  if (currentPage === 2) {
    homeScreen.scrollIntoView({ behavior: "smooth" });
    currentPage = 1;
  }
});

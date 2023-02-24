const homeScreen = document.getElementById("home-screen");
const gameRule = document.getElementById("game-rule");
const startBtn = document.getElementById("start-btn");
const endBtn = document.getElementById("end-btn");
const gameScreen = document.getElementById("game-screen");
const time = document.getElementById("time");
const scores = document.getElementById("score");
const message = document.getElementById("message");
const endGame = document.getElementById("end-game-button");

const buzzList = document.querySelectorAll(".buzz");
const woodyList = document.querySelectorAll(".woody");
const wrong = document.querySelectorAll(".wrong");

// ------End Game at Game Page-----
endGame.addEventListener("click", function () {
  message.style.display = "none";
  if (currentPage === 2) {
    homeScreen.scrollIntoView({ behavior: "smooth" });
    currentPage = 1;
    resetGame();
  }
});
// ------End Game at Home Page-----
endBtn.addEventListener("click", function () {
  if (message.style.display === "none") {
    message.style.display = "block";
  } else {
    message.style.display = "none";
  }
});

let currentPage = 1;
let timeUp = false;
let score = 0;
let timeRemaining = 45;
let timerId;

function resetGame() {
  score = 0;
  scores.innerHTML = score;
  timeRemaining = 45;
  time.innerHTML = timeRemaining;
  clearTimeout(timerId);
  timeUp = false;
  showWoody();
}

function updateTime() {
  timeRemaining--;
  time.innerHTML = timeRemaining;
  if (timeRemaining === 0) {
    timeUp = true;
    clearTimeout(timerId);
    setTimeout(function () {
      endGame();
    }, 2000);
  }
}

//------Game Start------

startBtn.addEventListener("click", function () {
  message.style.display = "none";
  if (currentPage === 1) {
    gameScreen.scrollIntoView({ behavior: "smooth" });
    currentPage = 2;
    setTimeout(function () {
      timerId = setInterval(updateTime, 1000);
    });
  }
});

let woodyIntervalId = null;
let buzzIntervalId = null;

//----Show Woody-------

function showWoody() {
  if (timeUp) {
    return;
  }
  const i = Math.floor(Math.random() * 9);
  woodyList[i].style.display = "block";
  woodyIntervalId = setTimeout(function () {
    if (woodyList[i].style.display === "block") {
      woodyList[i].style.display = "none";
      wrong[i].style.display = "none";
    }
    if (!timeUp) {
      showBuzz(); // start showing buzz element
    }
  }, 2000); // hide Woody after 2 seconds
}

for (let i = 0; i < woodyList.length; i++) {
  woodyList[i].onclick = function () {
    clearTimeout(woodyIntervalId);
    this.style.display = "none";
    score -= 10;
    scores.innerHTML = score;
    wrong[i].style.display = "block"; // display the corresponding wrong element
    setTimeout(function () {
      wrong[i].style.display = "none"; // hide the wrong element after a delay
      if (!timeUp) {
        showBuzz(); // start showing buzz element
      }
    }, 2000);
  };
}

//----Show Buzz-------
function showBuzz() {
  if (timeUp) {
    return;
  }
  const i = Math.floor(Math.random() * 9);
  buzzList[i].style.display = "block";
  buzzIntervalId = setTimeout(function () {
    buzzList[i].style.display = "none";
    if (!timeUp) {
      showWoody(); // start showing woody element
    }
  }, 900); // hide Buzz after 900ms
}

showWoody(); // start showing woody element

for (let i = 0; i < buzzList.length; i++) {
  buzzList[i].onclick = function () {
    clearTimeout(buzzIntervalId);
    this.style.display = "none";
    score += 10;
    scores.innerHTML = score;
    setTimeout(function () {
      showWoody(); // start showing woody element
    }, 1000);
  };
}

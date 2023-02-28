//sound buttons
const soundOnBtn = document.getElementById("sound-on-btn");
const soundOffBtn = document.getElementById("sound-off-btn");
const soundButtons = document.getElementById("sound-buttons");

//home page
const gameTitle = document.getElementById("gameTitle");
const gameButtons = document.getElementById("game-buttons");
const buzzVideo = document.getElementById("buzzVideo");
const homeScreen = document.getElementById("home-screen");
const gameRule = document.getElementById("game-rule");
const startBtn = document.getElementById("start-btn");
const endBtn = document.getElementById("end-btn");

//game page
const gameScreen = document.getElementById("game-screen");
const time = document.getElementById("time");
const scores = document.getElementById("score");
const message = document.getElementById("message");
const replayGame = document.getElementById("replay-game-button");
const backHome = document.getElementById("back-to-homepage");

const buzzList = document.querySelectorAll(".buzz");
const woodyList = document.querySelectorAll(".woody");
const wrong = document.querySelectorAll(".wrong");

// Set autoplay to false
buzzVideo.autoplay = false;

// Show sound buttons
soundButtons.style.display = "flex";

// Play video with sound if sound is on, otherwise mute the video
let isSoundOn = false;

// Play the video after user chooses sound on
soundOnBtn.addEventListener("click", () => {
  buzzVideo.muted = false;
  isSoundOn = true;
  soundButtons.style.display = "none";
  startBtn.style.display = "block";
  buzzVideo.play();
});

// Play the video after user chooses sound off
soundOffBtn.addEventListener("click", () => {
  buzzVideo.muted = true;
  isSoundOn = false;
  soundOffBtn.style.display = "none";
  startBtn.style.display = "block";
  buzzVideo.play();
});

// Show game buttons after video is finished
buzzVideo.addEventListener("ended", () => {
  gameTitle.style.display = "block";
  gameRule.style.display = "block";
  gameButtons.style.display = "flex";
  soundButtons.style.display = "none";
});

// ------End Game at Home Page-----
endBtn.addEventListener("click", function () {
  if (message.style.display === "none") {
    message.style.display = "block";
  } else {
    message.style.display = "none";
  }
});

//------Game Start------

let currentPage = 1;
let timeUp = false;
let score = 0;
let timeRemaining = 46;
let timerId;

function resetGame() {
  score = 0;
  scores.innerHTML = score;
  timeRemaining = 46;
  updateTime();
  time.innerHTML = timeRemaining;
  clearTimeout(timerId);
  timeUp = false;
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

startBtn.addEventListener("click", function () {
  message.style.display = "none";
  if (currentPage === 1) {
    gameScreen.scrollIntoView({ behavior: "smooth" });
    currentPage = 2;
    setTimeout(function () {
      resetGame();
      timerId = setInterval(updateTime, 1000);
      showWoodyTimeoutId = setTimeout(function () {
        showWoody();
      }, 2000);
    }, 2000);
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
      showBuzz();
    }
  }, 2000); // hide Woody after 2 seconds
}

for (let i = 0; i < woodyList.length; i++) {
  woodyList[i].onclick = function () {
    clearTimeout(woodyIntervalId);
    this.style.display = "none";
    score -= 10;
    scores.innerHTML = score;
    wrong[i].style.display = "block";
    setTimeout(function () {
      wrong[i].style.display = "none";
      if (!timeUp) {
        showBuzz();
      }
    }, 2000); // hide Woody
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
      showWoody();
    }
  }, 1500); // hide Buzz after 900ms
}

for (let i = 0; i < buzzList.length; i++) {
  buzzList[i].onclick = function () {
    clearTimeout(buzzIntervalId);
    this.style.display = "none";
    score += 10;
    scores.innerHTML = score;
    setTimeout(function () {
      showWoody();
    }, 1000);
  };
}

// ------Replay Game at Game Page-----

function playGame() {
  message.style.display = "none";
  resetGame();
  woodyList.forEach((woody) => (woody.style.display = "none"));
  buzzList.forEach((buzz) => (buzz.style.display = "none"));
  wrong.forEach((wrong) => (wrong.style.display = "none"));
  clearInterval(woodyIntervalId);
  clearInterval(buzzIntervalId);
  timerId = setInterval(updateTime, 1000);
  showWoodyTimeoutId = setTimeout(function () {
    showWoody();
  }, 2000);
}

replayGame.addEventListener("click", function () {
  message.style.display = "none";
  playGame();
});

//----End Game at Game Page------
backHome.addEventListener("click", function () {
  message.style.display = "none";
  if (currentPage === 2) {
    homeScreen.scrollIntoView({ behavior: "smooth" });
    currentPage = 1;
    resetGame();
    woodyList.forEach((woody) => (woody.style.display = "none"));
    buzzList.forEach((buzz) => (buzz.style.display = "none"));
    wrong.forEach((wrong) => (wrong.style.display = "none"));
    clearInterval(woodyIntervalId);
    clearInterval(buzzIntervalId);
  }
});

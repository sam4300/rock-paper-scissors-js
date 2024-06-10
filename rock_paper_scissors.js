let result = "";

let score = JSON.parse(localStorage.getItem("score"));
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
}
updateScoreElement();

function pickComputerMove() {
  const num = Math.random();
  let computersMove = "";
  if (num >= 0 && num < 1 / 3) {
    computersMove = "Rock";
  } else if (num >= 1 / 3 && num < 2 / 3) {
    computersMove = "Paper";
  } else if (num >= 2 / 3 && num <= 1) {
    computersMove = "Scissors";
  }
  return computersMove;
}

function createSignals(yourChoice) {
  let computerMove = pickComputerMove();
  if (computerMove === "Rock") {
    if (yourChoice === "Rock") {
      result = "It's a Tie.";
    } else if (yourChoice === "Paper") {
      result = "You win.";
    } else {
      result = "You lose.";
    }
  } else if (computerMove === "Paper") {
    if (yourChoice === "Paper") {
      result = "It's a Tie.";
    } else if (yourChoice === "Rock") {
      result = "You lose.";
    } else {
      result = "You win.";
    }
  } else if (computerMove === "Scissors") {
    if (yourChoice === "Scissors") {
      result = "It's a Tie.";
    } else if (yourChoice === "Rock") {
      result = "You win.";
    } else {
      result = "You lose.";
    }
  }
  if (result === "You win.") {
    score.wins++;
  } else if (result === "You lose.") {
    score.losses++;
  } else {
    score.ties++;
  }

  localStorage.setItem("score", JSON.stringify(score));
  document.querySelector(".js-players-move").innerHTML = `you
<img src="game_icons/${yourChoice}-emoji.png" alt="" class="game-icon">
<img src="game_icons/${computerMove}-emoji.png" alt="" class="game-icon">
computer`;
  updateScoreElement();
  document.querySelector(".js-result").innerHTML = result;
}

function updateScoreElement() {
  const scoreElement = document.querySelector(".js-score-element");
  scoreElement.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  localStorage.removeItem("score");
  updateScoreElement();
  document.querySelector(".js-result").innerHTML = "Play The Game";
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const yourChoice = pickComputerMove();
      createSignals(yourChoice);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

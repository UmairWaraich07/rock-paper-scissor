const totalScore = {yourScore: 0, computerScore: 0};
// ** getComputerChoice randomly selects between `rock` `paper` `scissors` and returns that string **
function getComputerChoice () {
  const rpsArray = ['rock', 'paper', 'scissor'];
  let randomNumber = Math.floor (Math.random () * rpsArray.length);
  return rpsArray[randomNumber];
}

// ** getResult compares playerChoice & computerChoice and returns the score accordingly **
function getResult (playerChoice, computerChoice) {
  let score;

  // All situations where human draws, set `score` to 0
  if (playerChoice == computerChoice) {
    score = 0;
  } else if (playerChoice == 'rock' && computerChoice == 'scissor') {
    // All situations where human wins, set `score` to 1
    score = 1;
  } else if (playerChoice == 'paper' && computerChoice == 'rock') {
    score = 1;
  } else if (playerChoice == 'scissor' && computerChoice == 'paper') {
    score = 1;
  } else {
    // Otherwise human loses (aka set score to -1)
    score = -1;
  }
  // return score
  return score;
}

const playerScore = document.getElementById ('player-score');
const hands = document.getElementById ('hands');
const result = document.getElementById ('result');
const computerScore = document.getElementById ('computer-score');

// ** showResult updates the DOM to `You Win!` or `You Lose!` or `It's a Draw!` based on the score. Also shows Player Choice vs. Computer Choice**
function showResult (score, playerChoice, computerChoice) {
  //shows playerScore on DOM
  playerScore.innerText = `Your Score : ${totalScore.yourScore}`;

  computerScore.innerText = `Computer Score : ${totalScore.computerScore}`;

  //shows playerChoice versus computerChoice on screen
  hands.innerText = `🧑${playerChoice} vs 🤖 ${computerChoice}`;

  //shows result of the game on the screen
  if (score == -1) {
    result.innerText = 'You Lose!';
  } else if (score == 1) {
    result.innerText = 'You Won!';
  } else {
    result.innerText = "It's a draw!";
  }
}

// ** Calculate who won and show it on the screen **
function onClickRPS (playerChoice) {
  let playerChoiceValue = playerChoice.value;
  let computerChoice = getComputerChoice ();
  let score = getResult (playerChoiceValue, computerChoice);
  if (score == 1) {
    totalScore.yourScore += 1;
  } else if (score == -1) {
    totalScore.computerScore += 1;
  }
  showResult (score, playerChoiceValue, computerChoice);
}

// ** Make the RPS buttons actively listen for a click and do something once a click is detected **
function playGame () {
  //select all RPS Buttons
  let buttons = document.querySelectorAll ('.rpsButton');
  // * Adds an on click event listener to each RPS button and every time you click it, it calls the onClickRPS function with the RPS button that was last clicked *
  for (const button of buttons) {
    button.addEventListener ('click', function () {
      return onClickRPS (this);
    });
  }

  // Add a click listener to the end game button that runs the endGame() function on click
  let endGameButton = document.getElementById ('endGameButton');
  endGameButton.addEventListener ('click', endGame);
}

// ** endGame function clears all the text on the DOM **
function endGame () {
  totalScore.computerScore = 0;
  totalScore.yourScore = 0;
  playerScore.innerText = '';
  hands.innerText = '';
  result.innerText = '';
  computerScore.innerText = '';
}

playGame ();

function computerPlay() {
    return rpsChoices[Math.floor(Math.random()*3)];
}

function playRound(event) {
    const gamePlayerSelection = event.target.innerText;
    const gameComputerSelection = computerSelection;

    if (roundCount === 1) {
        results.innerHTML = `Results:<br>Player ${ playerScore } : Computer ${ computerScore }`;
    }

    if (gamePlayerSelection === gameComputerSelection) {
        playerTie(gamePlayerSelection);
    }

    switch (gamePlayerSelection) {
        case "Rock":
            if (gameComputerSelection === "Scissors") { playerWin(gamePlayerSelection, gameComputerSelection); }
            if (gameComputerSelection === "Paper") { playerLose(gamePlayerSelection, gameComputerSelection); }
            break;
        case "Paper":
            if (gameComputerSelection === "Rock") { playerWin(gamePlayerSelection, gameComputerSelection); }
            if (gameComputerSelection === "Scissors") { playerLose(gamePlayerSelection, gameComputerSelection); }
            break;
        case "Scissors":
            if (gameComputerSelection === "Paper") { playerWin(gamePlayerSelection, gameComputerSelection); }
            if (gameComputerSelection === "Rock") { playerLose(gamePlayerSelection, gameComputerSelection); }
            break;
    }

    if (roundCount === 5) {
        if (playerScore > computerScore) {
            finalResult.innerHTML = "You Win!";
        }
        else if (playerScore < computerScore) {
            finalResult.innerHTML = "You Lose!";
        }
        else {
            finalResult.innerHTML = "It's a Draw!";
        }
        gameOver();
    }

    computerSelection = computerPlay();
    roundCount++;
}

function playerWin(gamePlayerSelection, gameComputerSelection) {
    lastResult.innerHTML += `You Win! ${ gamePlayerSelection } (You) beats ${ gameComputerSelection } (Com) (Round ${ roundCount }/5)<br>`;
    playerScore++;
}

function playerLose(gamePlayerSelection, gameComputerSelection) {
    lastResult.innerHTML += `You Lose! ${ gameComputerSelection } (Com) beats ${ gamePlayerSelection } (You) (Round ${ roundCount }/5)<br>`;
    computerScore++;
}

function playerTie(gamePlayerSelection) {
    lastResult.innerHTML += `It's a tie! Both selected ${ gamePlayerSelection } (Round ${ roundCount }/5)<br>`;
}

function gameOver() {
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    roundCount = 1;
    playerScore = 0
    computerScore = 0;

    const resetParas = document.querySelectorAll('.resultParas p');
    for(let i = 0; i < resetParas.length; i++) {
        resetParas[i].innerHTML = "";
    }
    resetButton.parentNode.removeChild(resetButton);

    computerSelection = computerPlay();
}

const rpsChoices = ["Rock", "Paper", "Scissors"];
const results = document.querySelector('.rounds');
const lastResult = document.querySelector('.lastResult');
const finalResult = document.querySelector('.finalResult');

const playerChoice = Array.from(document.querySelectorAll(".rps-button"));
playerChoice.forEach(button => button.addEventListener("click", playRound));

let computerSelection = computerPlay();
let playerScore = 0, computerScore = 0;
let roundCount = 1;

results.innerHTML = "";
lastResult.innerHTML = "";
finalResult.innerHTML = "";
let resetButton;
let playerScore = 0;
let computerScore = 0;

const resultMessage = document.getElementById('resultMessage');
const playerScoreDisplay = document.getElementById('playerScore');
const computerScoreDisplay = document.getElementById('computerScore');
const resetButton = document.getElementById('resetRPS');
const themeToggle = document.getElementById('themeToggle');

const moves = ['Rock', 'Paper', 'Scissors'];

function getComputerMove() {
    return moves[Math.floor(Math.random() * moves.length)];
}

function determineWinner(playerMove, computerMove) {
    if (playerMove === computerMove) {
        return 'draw';
    } else if (
        (playerMove === 'Rock' && computerMove === 'Scissors') ||
        (playerMove === 'Paper' && computerMove === 'Rock') ||
        (playerMove === 'Scissors' && computerMove === 'Paper')
    ) {
        return 'player';
    } else {
        return 'computer';
    }
}

function playRound(playerMove) {
    const computerMove = getComputerMove();
    const winner = determineWinner(playerMove, computerMove);

    if (winner === 'player') {
        resultMessage.textContent = `You win! ${playerMove} beats ${computerMove}.`;
        playerScore++;
    } else if (winner === 'computer') {
        resultMessage.textContent = `You lose! ${computerMove} beats ${playerMove}.`;
        computerScore++;
    } else {
        resultMessage.textContent = `It's a draw! You both chose ${playerMove}.`;
    }

    playerScoreDisplay.textContent = `Your Score: ${playerScore}`;
    computerScoreDisplay.textContent = `Computer Score: ${computerScore}`;
    resetButton.style.display = 'inline-block';
}

document.getElementById('rock').addEventListener('click', () => playRound('Rock'));
document.getElementById('paper').addEventListener('click', () => playRound('Paper'));
document.getElementById('scissors').addEventListener('click', () => playRound('Scissors'));

resetButton.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    resultMessage.textContent = '';
    playerScoreDisplay.textContent = `Your Score: 0`;
    computerScoreDisplay.textContent = `Computer Score: 0`;
    resetButton.style.display = 'none';
});

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
});
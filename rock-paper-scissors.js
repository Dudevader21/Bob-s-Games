let playerScore = 0;
let computerScore = 0;
let tieScore = 0;

document.getElementById('rockButton').addEventListener('click', () => playGame('rock'));
document.getElementById('paperButton').addEventListener('click', () => playGame('paper'));
document.getElementById('scissorsButton').addEventListener('click', () => playGame('scissors'));

function playGame(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const resultMessage = document.getElementById('resultMessage');
    let result = '';

    if (playerChoice === computerChoice) {
        result = "It's a tie!";
        tieScore++;
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'You win!';
        playerScore++;
    } else {
        result = 'You lose!';
        computerScore++;
    }

    resultMessage.textContent = `You chose ${playerChoice}. Computer chose ${computerChoice}. ${result}`;
    updateScore();
    document.getElementById('resetButton').style.display = 'inline-block';
}

function updateScore() {
    document.getElementById('playerScore').textContent = `Player: ${playerScore}`;
    document.getElementById('computerScore').textContent = `Computer: ${computerScore}`;
    document.getElementById('tieScore').textContent = `Ties: ${tieScore}`;
}

document.getElementById('resetButton').addEventListener('click', resetGame);

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    tieScore = 0;
    document.getElementById('playerScore').textContent = `Player: 0`;
    document.getElementById('computerScore').textContent = `Computer: 0`;
    document.getElementById('tieScore').textContent = `Ties: 0`;
    document.getElementById('resultMessage').textContent = '';
    document.getElementById('resetButton').style.display = 'none';
}
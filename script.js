let randomNumber;
let attempts;
let range;
let bestScore = localStorage.getItem('bestScore') || Infinity;

document.getElementById('bestScore').textContent = bestScore === Infinity ? "N/A" : bestScore;

function setDifficulty(level) {
    switch(level) {
        case 'easy':
            range = 50;
            break;
        case 'moderate':
            range = 100;
            break;
        case 'hard':
            range = 200;
            break;
    }
    attempts = 0;
    randomNumber = Math.floor(Math.random() * range) + 1;
    document.getElementById('difficultyMessage').textContent = `Difficulty: ${level.charAt(0).toUpperCase() + level.slice(1)} (1-${range})`;
    document.getElementById('guessInput').disabled = false;
    document.getElementById('guessButton').disabled = false;
}

function makeGuess() {
    const guess = Number(document.getElementById('guessInput').value);
    attempts++;

    if (guess === randomNumber) {
        document.getElementById('resultMessage').textContent = `Congratulations! You guessed it in ${attempts} attempts.`;
        if (attempts < bestScore) {
            bestScore = attempts;
            localStorage.setItem('bestScore', bestScore);
            document.getElementById('bestScore').textContent = bestScore;
        }
        endGame();
    } else if (guess < randomNumber) {
        document.getElementById('resultMessage').textContent = `Too low! Attempts so far: ${attempts}`;
    } else if (guess > randomNumber) {
        document.getElementById('resultMessage').textContent = `Too high! Attempts so far: ${attempts}`;
    }
}

function endGame() {
    document.getElementById('guessInput').disabled = true;
    document.getElementById('guessButton').disabled = true;
    document.getElementById('resetButton').style.display = 'inline-block';
}

function resetGame() {
    document.getElementById('resultMessage').textContent = '';
    document.getElementById('difficultyMessage').textContent = '';
    document.getElementById('guessInput').value = '';
    document.getElementById('guessInput').disabled = true;
    document.getElementById('guessButton').disabled = true;
    document.getElementById('resetButton').style.display = 'none';
}
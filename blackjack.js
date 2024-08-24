let deck, playerHand, dealerHand;
let playerScore = 0;
let dealerScore = 0;
let gameCount = 0;

const playerCards = document.getElementById('playerCards');
const dealerCards = document.getElementById('dealerCards');
const playerScoreDisplay = document.getElementById('playerScore');
const dealerScoreDisplay = document.getElementById('dealerScore');
const resultMessage = document.getElementById('resultMessage');
const hitButton = document.getElementById('hitButton');
const standButton = document.getElementById('standButton');
const resetButton = document.getElementById('resetButton');
const historyBody = document.getElementById('historyBody');

// Initialize the deck of cards
function initializeDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    deck = [];

    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }

    // Shuffle the deck
    deck = deck.sort(() => Math.random() - 0.5);
}

// Get the value of a card
function getCardValue(card) {
    if (['J', 'Q', 'K'].includes(card.value)) {
        return 10;
    } else if (card.value === 'A') {
        return 11; // Handle ace as 11 initially, may need adjustment later
    } else {
        return parseInt(card.value);
    }
}

// Update the scores displayed
function updateScores() {
    playerScore = calculateHandValue(playerHand);
    dealerScore = calculateHandValue(dealerHand);

    playerScoreDisplay.textContent = `Score: ${playerScore}`;
    dealerScoreDisplay.textContent = `Score: ${dealerScore}`;
}

// Calculate the value of a hand
function calculateHandValue(hand) {
    let value = 0;
    let aceCount = 0;

    for (let card of hand) {
        value += getCardValue(card);
        if (card.value === 'A') {
            aceCount++;
        }
    }

    // Adjust for aces if value is over 21
    while (value > 21 && aceCount > 0) {
        value -= 10;
        aceCount--;
    }

    return value;
}

// Display a card on the screen
function displayCard(card, targetElement) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.textContent = `${card.value} of ${card.suit}`;
    targetElement.appendChild(cardElement);
}

// Deal the initial cards to the player and dealer
function dealInitialCards() {
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];

    playerHand.forEach(card => displayCard(card, playerCards));
    dealerHand.forEach(card => displayCard(card, dealerCards));

    updateScores();
}

// Handle the "Hit" action
function hit() {
    playerHand.push(deck.pop());
    displayCard(playerHand[playerHand.length - 1], playerCards);
    updateScores();

    if (playerScore > 21) {
        endGame('Dealer wins.');
    }
}

// Handle the "Stand" action
function stand() {
    hitButton.disabled = true;
    standButton.disabled = true;

    // Dealer's turn
    while (dealerScore < 17) {
        dealerHand.push(deck.pop());
        displayCard(dealerHand[dealerHand.length - 1], dealerCards);
        updateScores();
    }

    if (dealerScore > 21) {
        endGame('You win!');
    } else if (dealerScore > playerScore) {
        endGame('Dealer wins.');
    } else if (dealerScore < playerScore) {
        endGame('You win!');
    } else {
        endGame('It\'s a tie!');
    }
}

// End the game and display the result
function endGame(result) {
    resultMessage.textContent = result;
    hitButton.style.display = 'none';
    standButton.style.display = 'none';
    resetButton.style.display = 'inline-block';

    // Add the result to the game history
    addGameToHistory(result, playerScore, dealerScore);
}

// Reset the game for a new round
function resetGame() {
    playerCards.innerHTML = '';
    dealerCards.innerHTML = '';
    resultMessage.textContent = '';

    hitButton.style.display = 'inline-block';
    standButton.style.display = 'inline-block';
    resetButton.style.display = 'none';

    hitButton.disabled = false;
    standButton.disabled = false;

    initializeDeck();
    dealInitialCards();
}

// Add a game result to the history table
function addGameToHistory(result, playerFinalScore, dealerFinalScore) {
    gameCount++;
    const newRow = document.createElement('tr');

    const gameNumberCell = document.createElement('td');
    gameNumberCell.textContent = gameCount;

    const resultCell = document.createElement('td');
    resultCell.textContent = result;

    const playerScoreCell = document.createElement('td');
    playerScoreCell.textContent = playerFinalScore;

    const dealerScoreCell = document.createElement('td');
    dealerScoreCell.textContent = dealerFinalScore;

    newRow.appendChild(gameNumberCell);
    newRow.appendChild(resultCell);
    newRow.appendChild(playerScoreCell);
    newRow.appendChild(dealerScoreCell);

    // Insert the new row at the top of the history table
    historyBody.insertBefore(newRow, historyBody.firstChild);
}

// Event listeners for buttons
hitButton.addEventListener('click', hit);
standButton.addEventListener('click', stand);
resetButton.addEventListener('click', resetGame);

// Initialize the game on page load
window.onload = () => {
    initializeDeck();
    dealInitialCards();
};
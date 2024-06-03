// app.js
const boxes = document.querySelectorAll('.box');
const msgContainer = document.querySelector('.msgcontainer');
const msg = document.getElementById('msg');
const newGameBtn = document.getElementById('new');
const resetBtn = document.getElementById('reset');
const playerXTurnsElem = document.getElementById('playerX-turns');
const playerOTurnsElem = document.getElementById('playerO-turns');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let playerXTurns = 0;
let playerOTurns = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleResultValidation = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        msg.innerText = `Player ${currentPlayer} has won!`;
        msgContainer.classList.remove('hide');
        isGameActive = false;
        return;
    }

    if (!gameBoard.includes('')) {
        msg.innerText = 'Game ended in a draw!';
        msgContainer.classList.remove('hide');
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const handleBoxClick = (e) => {
    const clickedBox = e.target;
    const clickedBoxIndex = Array.from(boxes).indexOf(clickedBox);

    if (gameBoard[clickedBoxIndex] !== '' || !isGameActive) {
        return;
    }

    gameBoard[clickedBoxIndex] = currentPlayer;
    clickedBox.innerText = currentPlayer;

    if (currentPlayer === 'X') {
        playerXTurns++;
        playerXTurnsElem.innerText = playerXTurns;
    } else {
        playerOTurns++;
        playerOTurnsElem.innerText = playerOTurns;
    }

    handleResultValidation();
};

const handleResetGame = () => {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    msgContainer.classList.add('hide');
    boxes.forEach(box => box.innerText = '');
    playerXTurns = 0;
    playerOTurns = 0;
    playerXTurnsElem.innerText = playerXTurns;
    playerOTurnsElem.innerText = playerOTurns;
};

boxes.forEach(box => box.addEventListener('click', handleBoxClick));
newGameBtn.addEventListener('click', handleResetGame);
resetBtn.addEventListener('click', handleResetGame);

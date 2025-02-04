const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#FF9999',
    '#77DD77', '#AEC6CF', '#FDFD96', '#B19CD9', '#FF6961', '#CFCFC4'
];

let targetColor = '';
let score = 0;
let gameActive = true;

const optionsContainer = document.getElementById('optionsContainer');
const colorBox = document.querySelector('.color-box');
const statusElement = document.querySelector('.status');
const scoreElement = document.querySelector('.score');

function generateRandomColors() {
    const targetIndex = Math.floor(Math.random() * colors.length);
    targetColor = colors[targetIndex];
    
    
    const otherColors = colors.filter(color => color !== targetColor);

    const shuffledOthers = [...otherColors].sort(() => Math.random() - 0.5);
    const selectedOthers = shuffledOthers.slice(0, 5);
    
    const colorOptions = [targetColor, ...selectedOthers];
    return colorOptions.sort(() => Math.random() - 0.5);
}

function createColorButtons() {
    optionsContainer.innerHTML = '';
    const colorOptions = generateRandomColors();

    colorOptions.forEach(color => {
        const button = document.createElement('button');
        button.className = 'color-option';
        button.style.backgroundColor = color;
        button.dataset.testid = 'colorOption';
        
        button.addEventListener('click', () => handleGuess(color));
        optionsContainer.appendChild(button);
    });

    colorBox.style.backgroundColor = targetColor;
}

function handleGuess(selectedColor) {
    if (!gameActive) return;

    const buttons = document.querySelectorAll('.color-option');
    
    if (selectedColor === targetColor) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
        statusElement.textContent = 'Correct! Well done!';
        statusElement.style.color = '#2ecc71';
        
        buttons.forEach(btn => {
            if (btn.style.backgroundColor === targetColor) {
                btn.classList.add('correct');
            }
        });
        
        gameActive = false;
    } else {
        statusElement.textContent = 'Wrong! Try again!';
        statusElement.style.color = '#e74c3c';
        
        buttons.forEach(btn => {
            if (btn.style.backgroundColor === selectedColor) {
                btn.classList.add('wrong');
            }
        });
    }
}

function newGame() {
    score = 0;
    gameActive = true;
    scoreElement.textContent = 'Score: 0';
    statusElement.textContent = '';
    statusElement.style.color = 'inherit';
    
    document.querySelectorAll('.color-option').forEach(btn => {
        btn.classList.remove('correct', 'wrong');
    });
    
    createColorButtons();
}

document.querySelector('.new-game-btn').addEventListener('click', newGame);
createColorButtons();
// Перевірка на випадок, якщо constants.js не завантажився
if (typeof gameState === 'undefined') {
    window.gameState = {
        board: ["", "", "", "", "", ""],
        currentRow: 0
    };
}

function renderBoard() {
    const boardElement = document.querySelector(".grid");
    if (!boardElement) return;

    boardElement.innerHTML = '';

    gameState.board.forEach((word) => {
        for (let i = 0; i < 5; i++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            if (word[i]) {
                tile.textContent = word[i].toUpperCase();
            }
            boardElement.appendChild(tile);
        }
    });
}

function handleInput(key) {
    if (gameState.currentRow >= gameState.board.length) return;

    let currentWord = gameState.board[gameState.currentRow];

    if (/^[а-щьюяіїєґ]$/.test(key)) {
        if (currentWord.length < 5) {
            gameState.board[gameState.currentRow] += key;
        }
    } else if (key === "backspace" || key === "⌫") {
        gameState.board[gameState.currentRow] = currentWord.slice(0, -1);
    } else if (key === "enter") {
        if (currentWord.length === 5) {
            if (gameState.currentRow < gameState.board.length - 1) {
                gameState.currentRow++;
            } else {
                alert("Гра закінчена!");
            }
        }
    }
    renderBoard();
}

function initGame() {
    renderBoard();

    // Слухаємо фізичну клавіатуру
    window.addEventListener('keydown', (e) => {
        handleInput(e.key.toLowerCase());
    });

    // Слухаємо віртуальну клавіатуру (кліки)
    const keys = document.querySelectorAll('.key');
    keys.forEach(keyElement => {
        keyElement.addEventListener('click', () => {
            const val = keyElement.textContent.toLowerCase();
            // Якщо кнопка порожня (як твій shift), ігноруємо
            if (val.trim() !== "") {
                handleInput(val);
            }
        });
    });

    // Окремо для Backspace та Enter, якщо у них немає тексту або є ID
    const backspaceBtn = document.getElementById('backspace');
    if (backspaceBtn) backspaceBtn.addEventListener('click', () => handleInput('backspace'));
    
    const enterBtn = document.getElementById('enter');
    if (enterBtn) enterBtn.addEventListener('click', () => handleInput('enter'));
}

document.addEventListener("DOMContentLoaded", initGame);
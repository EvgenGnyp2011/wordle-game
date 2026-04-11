function renderBoard(gameState) {
    const tiles = document.querySelectorAll('.tile'); 
    const allLetters = gameState.board.flatMap(word => {
        while (letters.length < 5) letters.push('');
        return letters;
    });

    tiles.forEach((tile, index) => {
        tile.textContent = allLetters[index] ?? '';
    });
}

window.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    
    if (/^[а-щьюяіїєґ]$/.test(key)) {
        console.log("Введено літеру:", key);
    } else if (key === "enter") {
        console.log("Натиснуто Enter");
    } else if (key === "backspace") {
        console.log("Натиснуто Backspace");
    }
});

function showError(gameState) {
    if (gameState.error) {
        console.error("Помилка гри:", gameState.error);
    }
}

function renderBoard(gameState) {
    let board = gameState.board; 
    let tiles = document.querySelectorAll('.tile');
    
    let allLetters = [];
    board.forEach(word => {
        let letters = word.split('');
        while (letters.length < 5) {
            letters.push('');
        }
        allLetters = allLetters.concat(letters);
    });

    tiles.forEach((tile, index) => {
        if (allLetters[index]) {
            tile.textContent = allLetters[index];
        } else {
            tile.textContent = '';
        }
    });
}


window.addEventListener('keydown', (event) => {
    let key = event.key.toLowerCase();
    
    if (/^[а-щьюяіїєґ]$/.test(key)) {
        console.log("Введено літеру:", key);
    } else if (key === "enter") {
        console.log("Натиснуто Enter");
    } else if (key === "backspace") {
        console.log("Натиснуто Backspace");
    }
});

function showError(gameState) {
    let error = gameState.error;
    if (error) {

        alert(error);
    }
}

let testState = {
    board: ["привіт", "сонечко"], 
    error: null
};

renderBoard(testState);
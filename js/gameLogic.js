const WORD_LENGTH = 5;
const targetWord = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
let currentGuess = "";
let guesses = [];

const tiles = document.querySelectorAll('.tile');
const keys = document.querySelectorAll('.key');

keys.forEach(key => {
    key.addEventListener('click', () => handleInput(key.textContent.toUpperCase()));
});

window.addEventListener('keydown', (e) => {
    const key = e.key.toUpperCase();
    if (key === 'ENTER') handleInput('ENTER');
    else if (key === 'BACKSPACE') handleInput('BACKSPACE');
    else if (/^[А-ЯЄІЇҐ]$/.test(key)) handleInput(key);
});

function handleInput(key) {
    if (key === 'ENTER') {
        if (currentGuess.length === WORD_LENGTH) checkWord();
    } else if (key === 'BACKSPACE') {
        currentGuess = currentGuess.slice(0, -1);
        updateGrid();
    } else if (currentGuess.length < WORD_LENGTH && key.length === 1) {
        currentGuess += key;
        updateGrid();
    }
}

function updateGrid() {
    const rowOffset = guesses.length * WORD_LENGTH;
    for (let i = 0; i < WORD_LENGTH; i++) {
        const tile = tiles[rowOffset + i];
        tile.textContent = currentGuess[i] || "";
    }
}

function checkWord() {
    const rowOffset = guesses.length * WORD_LENGTH;
    const guessLetters = currentGuess.split('');
    const targetLetters = targetWord.split('');
    const results = Array(WORD_LENGTH).fill('wrong');

    guessLetters.forEach((l, i) => {
        if (l === targetLetters[i]) {
            results[i] = 'correct';
            targetLetters[i] = null;
        }
    });

    guessLetters.forEach((l, i) => {
        if (results[i] !== 'correct' && targetLetters.includes(l)) {
            results[i] = 'misplaced';
            targetLetters[targetLetters.indexOf(l)] = null;
        }
    });

    results.forEach((res, i) => {
        tiles[rowOffset + i].classList.add(res);
    });

    if (currentGuess === targetWord) {
        finish("Вітаємо! Ви вгадали слово!");
    } else {
        guesses.push(currentGuess);
        currentGuess = "";
        if (guesses.length === 6) finish("Гра закінчена! Слово: " + targetWord);
    }
}

function finish(msg) {
    setTimeout(() => {
        alert(msg);
        location.reload();
    }, 250);
}
document.addEventListener('DOMContentLoaded', () => {
    const WORD_LENGTH = 5;
    const MAX_ATTEMPTS = 6;
    
    let wordsSource = typeof Words !== 'undefined' ? Words : (typeof WORDS !== 'undefined' ? WORDS : []);
    const validWords = wordsSource.filter(w => w && w.length === WORD_LENGTH).map(w => w.toUpperCase());
    
    if (validWords.length === 0) return;

    const targetWord = validWords[Math.floor(Math.random() * validWords.length)];
    let currentGuess = "";
    let guesses = [];
    let isGameOver = false;

    const tiles = document.querySelectorAll('.tile');
    const keyboardMap = {};
    document.querySelectorAll('.key').forEach(key => {
        keyboardMap[key.textContent.trim().toUpperCase()] = key;
    });

    function handleInput(key) {
        if (isGameOver) return;

        if (key === 'ENTER') {
            if (currentGuess.length === WORD_LENGTH) checkWord();
        } else if (key === 'BACKSPACE' || key === '⌫') {
            currentGuess = currentGuess.slice(0, -1);
            updateGrid();
        } else if (currentGuess.length < WORD_LENGTH && key.length === 1) {
            if (/^[А-ЯЄІЇҐ]$/.test(key)) {
                currentGuess += key;
                updateGrid();
            }
        }
    }

    function updateGrid() {
        const rowOffset = guesses.length * WORD_LENGTH;
        for (let i = 0; i < WORD_LENGTH; i++) {
            const tile = tiles[rowOffset + i];
            if (tile) tile.textContent = currentGuess[i] || "";
        }
    }

    function checkWord() {
        const rowOffset = guesses.length * WORD_LENGTH;
        const guessLetters = currentGuess.split('');
        const targetLetters = [...targetWord];
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
            const tile = tiles[rowOffset + i];
            const letter = guessLetters[i];
            const keyBtn = keyboardMap[letter];

            if (tile) {
                tile.classList.add(res);
                const color = res === 'correct' ? '#6aaa64' : (res === 'misplaced' ? '#c9b458' : '#787c7e');
                tile.style.backgroundColor = color;
                tile.style.borderColor = color;
                tile.style.color = 'white';

                if (keyBtn) updateKeyboardColor(keyBtn, res);
            }
        });

        if (currentGuess === targetWord) {
            isGameOver = true;
            setTimeout(() => alert("ПЕРЕМОГА!"), 500);
        } else {
            guesses.push(currentGuess);
            currentGuess = "";
            if (guesses.length === MAX_ATTEMPTS) {
                isGameOver = true;
                setTimeout(() => alert(`СЛОВО: ${targetWord}`), 500);
            }
        }
    }

    function updateKeyboardColor(btn, status) {
        const currentRes = btn.getAttribute('data-status');
        if (currentRes === 'correct') return;
        if (currentRes === 'misplaced' && status === 'wrong') return;

        btn.setAttribute('data-status', status);
        btn.style.backgroundColor = status === 'correct' ? '#6aaa64' : (status === 'misplaced' ? '#525252' : '#ff0000');
        btn.style.color = 'white';
    }

    document.querySelectorAll('.key').forEach(key => {
        key.addEventListener('click', () => {
            const val = key.textContent.trim().toUpperCase();
            handleInput(val === '⌫' ? 'BACKSPACE' : val);
        });
    });

    window.addEventListener('keydown', (e) => {
        const k = e.key.toUpperCase();
        if (k === 'ENTER' || k === 'BACKSPACE') handleInput(k);
        else handleInput(k);
    });
});
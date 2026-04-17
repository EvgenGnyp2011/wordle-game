document.addEventListener('DOMContentLoaded', () => {
    const WORD_LENGTH = 5;
    const MAX_ATTEMPTS = 6;
    const COLORS = {
        correct: '#6aaa64',
        misplaced: '#858585',
        wrong: '#ff0000'
    };

    const wordsSource = typeof Words !== 'undefined' ? Words : (typeof WORDS !== 'undefined' ? WORDS : []);
    const validWords = wordsSource.filter(w => w?.length === WORD_LENGTH).map(w => w.toUpperCase());
    
    if (validWords.length === 0) return;

    let targetWord = validWords[Math.floor(Math.random() * validWords.length)];
    let currentGuess = "";
    let guessesCount = 0;
    let isGameOver = false;

    const tiles = document.querySelectorAll('.tile');
    const keyboardButtons = {}; 
    document.querySelectorAll('.key').forEach(btn => {
        keyboardButtons[btn.textContent.trim().toUpperCase()] = btn;
    });

    function handleInput(key) {
        if (isGameOver) return;

        if (key === 'ENTER') {
            if (currentGuess.length === WORD_LENGTH) checkWord();
        } 
        else if (key === 'BACKSPACE' || key === '⌫') {
            currentGuess = currentGuess.slice(0, -1);
        } 
        else if (currentGuess.length < WORD_LENGTH && /^[А-ЯЄІЇҐ]$/.test(key)) {
            currentGuess += key;
        }
        
        updateDisplay();
    }

    function updateDisplay() {
        const startIdx = guessesCount * WORD_LENGTH;
        for (let i = 0; i < WORD_LENGTH; i++) {
            const tile = tiles[startIdx + i];
            if (tile) tile.textContent = currentGuess[i] || "";
        }
    }

    function checkWord() {
        const guessLetters = currentGuess.split('');
        const targetLetters = [...targetWord];
        const results = Array(WORD_LENGTH).fill('wrong');

        guessLetters.forEach((letter, i) => {
            if (letter === targetLetters[i]) {
                results[i] = 'correct';
                targetLetters[i] = null;
            }
        });

        guessLetters.forEach((letter, i) => {
            if (results[i] !== 'correct' && targetLetters.includes(letter)) {
                results[i] = 'misplaced';
                targetLetters[targetLetters.indexOf(letter)] = null;
            }
        });

        const startIdx = guessesCount * WORD_LENGTH;
        results.forEach((status, i) => {
            const tile = tiles[startIdx + i];
            const letter = guessLetters[i];
            const color = COLORS[status];

            tile.style.backgroundColor = color;
            tile.style.borderColor = color;
            tile.style.color = 'white';

            updateKeyColor(keyboardButtons[letter], status);
        });

        if (currentGuess === targetWord) {
            isGameOver = true;
            setTimeout(() => alert("ПЕРЕМОГА!"), 200);
        } else {
            guessesCount++;
            currentGuess = "";
            if (guessesCount === MAX_ATTEMPTS) {
                isGameOver = true;
                setTimeout(() => alert("СЛОВО: " + targetWord), 200);
            }
        }
    }

    function updateKeyColor(btn, status) {
        if (!btn) return;
        const currentStatus = btn.getAttribute('data-status');
        
        if (currentStatus === 'correct') return;
        if (currentStatus === 'misplaced' && status === 'wrong') return;

        btn.setAttribute('data-status', status);
        btn.style.backgroundColor = (status === 'wrong') ? '#3a3a3c' : COLORS[status];
        btn.style.color = 'white';
    }

    window.addEventListener('keydown', (e) => handleInput(e.key.toUpperCase()));
    
    document.querySelectorAll('.key').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.textContent.trim().toUpperCase();
            handleInput(text === '⌫' ? 'BACKSPACE' : text);
        });
    });
});
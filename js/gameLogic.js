document.addEventListener('DOMContentLoaded', () => {

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

let wordsSource = [];

if (typeof Words !== "undefined") wordsSource = Words;
else if (typeof WORDS !== "undefined") wordsSource = WORDS;

const validWords = wordsSource
    .filter(w => w && w.length === WORD_LENGTH)
    .map(w => w.toUpperCase());

if(validWords.length === 0){
    console.error("Словник не знайдено");
    return;
}

let targetWord = validWords[Math.floor(Math.random()*validWords.length)];

let currentGuess = "";
let guessesCount = 0;
let isGameOver = false;

const tiles = document.querySelectorAll(".tile");
const keys = document.querySelectorAll(".key");

const keyboard = {};

keys.forEach(btn=>{
    const letter = btn.textContent.trim().toUpperCase();
    keyboard[letter] = btn;
});

function handleInput(key){

    if(isGameOver) return;

    if(key === "ENTER"){
        if(currentGuess.length === WORD_LENGTH){
            checkWord();
        }
        return;
    }

    if(key === "BACKSPACE" || key === "⌫"){
        currentGuess = currentGuess.slice(0,-1);
        updateGrid();
        return;
    }

    const ukr = /^[А-ЯЄІЇҐ]$/;

    if(ukr.test(key) && currentGuess.length < WORD_LENGTH){
        currentGuess += key;
        updateGrid();
    }
}

function updateGrid(){

    const start = guessesCount * WORD_LENGTH;

    for(let i=0;i<WORD_LENGTH;i++){

        const tile = tiles[start+i];

        tile.textContent = currentGuess[i] || "";

    }

}

function checkWord(){

    const guessLetters = currentGuess.split("");
    const targetLetters = targetWord.split("");

    const result = new Array(WORD_LENGTH).fill("wrong");

    for(let i=0;i<WORD_LENGTH;i++){
        if(guessLetters[i] === targetLetters[i]){
            result[i] = "correct";
            targetLetters[i] = null;
        }
    }

    for(let i=0;i<WORD_LENGTH;i++){

        if(result[i] === "correct") continue;

        const index = targetLetters.indexOf(guessLetters[i]);

        if(index !== -1){
            result[i] = "misplaced";
            targetLetters[index] = null;
        }

    }

    const start = guessesCount * WORD_LENGTH;

    for(let i=0;i<WORD_LENGTH;i++){

        const tile = tiles[start+i];
        const status = result[i];
        const letter = guessLetters[i];

        tile.classList.add(status);

        const key = keyboard[letter];

        if(key){
            updateKeyColor(key,status);
        }

    }

    if(currentGuess === targetWord){

        isGameOver = true;

        setTimeout(()=>{
            alert("Перемога!");
        },200);

        return;
    }

    guessesCount++;
    currentGuess="";

    if(guessesCount === MAX_ATTEMPTS){

        isGameOver = true;

        setTimeout(()=>{
            alert("Слово було: "+targetWord);
        },200);

    }

}

function updateKeyColor(btn,status){

    const old = btn.dataset.status;

    if(old === "correct") return;

    if(old === "misplaced" && status === "wrong") return;

    btn.dataset.status = status;

    btn.classList.remove("correct","misplaced","wrong");
    btn.classList.add(status);

}

const latinToUkr = {
    q: "Й", w: "Ц", e: "У", r: "К", t: "Е", y: "Н", u: "Г", i: "Ш", o: "Щ", p: "З",
    "[": "Х", "]": "Ї",
    a: "Ф", s: "І", d: "В", f: "А", g: "П", h: "Р", j: "О", k: "Л", l: "Д",
    ";": "Ж", "'": "Є",
    z: "Я", x: "Ч", c: "С", v: "М", b: "И", n: "Т", m: "Ь",
    ",": "Б", ".": "Ю"
};

window.addEventListener("keydown", e => {
    const rawKey = e.key;

    if (rawKey === "Enter" || rawKey === "Backspace") {
        e.preventDefault();
    }

    let key = rawKey;
    if (typeof key === "string" && key.length === 1) {
        const lower = key.toLowerCase();
        key = latinToUkr[lower] || key.toUpperCase();
    } else if (key === "Enter") {
        key = "ENTER";
    } else if (key === "Backspace") {
        key = "BACKSPACE";
    } else if (typeof key === "string") {
        key = key.toUpperCase();
    }

    handleInput(key);
});

keys.forEach(btn=>{

    btn.addEventListener("click",()=>{

        const key = btn.textContent.trim().toUpperCase();

        handleInput(key === "⌫" ? "BACKSPACE" : key);

    });

});

});
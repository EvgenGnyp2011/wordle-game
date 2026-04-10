# initGame(wordLength = 5)
{ wordLength: 5, maxAttempts: 6, attemptsLeft: 6, status: 'playing' }
# checkWord(input)
{
result: ['correct', 'misplaced', 'wrong', 'correct', 'wrong'],
attemptsLeft: 5,
status: 'playing' // або 'won' або 'lost'
}
# getGameState()
{
wordLength: 5, maxAttempts: 6, attemptsLeft: 4,
attempts: [{ input: 'СЛОВО', result: ['correct', 'misplaced', 'wrong', 'correct', 'wrong']
}],
status: 'playing'
}
# resetGame()
Скидає гру, генерує нове слово. Повертає те саме, що initGame().
# Спільні константи та слова — js/constants.js
Цей файл пишуть разом на уроці 1. Game Brain доповнює масив слів, обидва імпортують константи.
const STATUS = { PLAYING: 'playing', WON: 'won', LOST: 'lost' };
const RESULT = { CORRECT: 'correct', MISPLACED: 'misplaced', WRONG: 'wrong' };
const WORDS = [
'БАТІГ', 'ВІТЕР', 'ГІЛКА', 'ДВЕРІ', 'ЗЕМЛЯ',
'ЗІРКА', 'КАЗКА', 'КНИГА', 'КРИЛО', 'ЛІЖКО',
'МІСТО', 'НІЧКА', 'ВОВНА', 'ПІСНЯ', 'ПЛЯМА',
'РІЧКА', 'СЕРЦЕ', 'СНІГИ', 'ТАНОК', 'ТРАВА',
'ХВИЛЯ', 'ХМАРА', 'ЦУКОР', 'ЧАШКА', 'ШКОЛА',
'ЩАСТЯ', 'ЗАМОК', 'ЯЛИНА', 'ЯГОДА', 'ПОЇЗД'
];

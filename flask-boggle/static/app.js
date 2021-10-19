let score = 0;
let timer = 60;

$('#guess-form').on('submit', async function guess(evt) {
    evt.preventDefault();

    word = $('#guess-word')[0].value;
    handleGuess(word);

    $('#guess-word')[0].value = '';
})

$('#start').on('click', () => {
    startGame();
    setTimeout(() => {
        endGame();
    }, timer*1000);
})

async function handleGuess(word) {
    const res = await axios.get(`http://localhost:5000/check-word/${word}`);
    alert(res.data);

    if (res.data === 'ok') {
        changeScore(word.length)
    }
}

function changeScore(add) {
    score = score + add;

    let scoreHTML = $('#score');
    scoreHTML[0].innerHTML = `Score: ${score}`;
}

function changeTimer(time) {
    let timerHTML = $('#timer');
    timerHTML[0].innerHTML = `Time Left: ${time}`
}

async function startGame() {
    $('#guess-form')[0].hidden = false;
    $('#timer')[0].hidden = false;

    setInterval(function () {
        timer = timer - 1;
        changeTimer(timer);
    }, 1000);
}

function endGame() {
    alert('GAME OVER!');
    $('#guess-form')[0].hidden = true;
    $('#timer')[0].hidden = true;
    updateTimesPlayed();
    updateHighScore(score);
}

async function updateTimesPlayed() {
    const res = await axios.get(`http://localhost:5000/start-game`);
    const times = res.data.timesPlayed;
    $('#play-count')[0].innerHTML = `Times Played: ${times}`;
}

async function updateHighScore(highScore) {
    const res = await axios.get(`http://localhost:5000/update-high-score/${highScore}`);
    const high = res.data.highScore;
    $('#high-score')[0].innerHTML = `High Score: ${high}`
}
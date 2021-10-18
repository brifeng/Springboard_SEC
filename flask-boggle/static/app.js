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
        alert('GAME OVER!');
        $('#guess-form')[0].hidden = true;
        $('#timer')[0].hidden = true;
    }, 60000);
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
    console.log(score);

    let scoreHTML = $('#score');
    scoreHTML[0].innerHTML = `Score: ${score}`;
}

function changeTimer(time) {
    let timerHTML = $('#timer');
    timerHTML[0].innerHTML = `Time Left: ${time}`
}

async function startGame() {
    console.log('game started');
    // const res = await axios.get(`http://localhost:5000/start-game`);

    setInterval(function () {
        timer = timer - 1;
        changeTimer(timer);
    }, 1000);
}


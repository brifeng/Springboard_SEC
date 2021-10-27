class BoggleGame {
    constructor(time) {
        this.timer = time;
        this.score = 0;
        this.wordBank = [];


        $('#guess-form').on('submit', function guess(evt) {
            evt.preventDefault();

            const word = $('#guess-word')[0].value;
            game.handleGuess(word);

            $('#guess-word')[0].value = '';
        })

        $('#start').on('click', () => {
            this.startGame();
            setTimeout(() => {
                this.endGame();
            }, this.timer * 1000);
        })
    }


    async handleGuess(word) {
        if (this.wordBank.indexOf(word) === -1) {
            this.wordBank.push(word);
        } else {
            alert('already used');
            return
        }
        const res = await axios.get(`http://localhost:5000/check-word/${word}`);
        alert(res.data);

        if (res.data === 'ok') {
            this.changeScore(word.length)
        }
    }

    changeScore(add) {
        game.score = game.score + add;

        let scoreHTML = $('#score');
        scoreHTML[0].innerHTML = `Score: ${this.score}`;
    }

    changeTimer(time) {
        let timerHTML = $('#timer');
        timerHTML[0].innerHTML = `Time Left: ${time}`
    }

    startGame() {
        $('#guess-form')[0].hidden = false;
        $('#timer')[0].hidden = false;

        setInterval(function () {
            game.timer = game.timer - 1;
            game.changeTimer(game.timer);
        }, 1000);
    }

    endGame() {
        alert('GAME OVER!');
        $('#guess-form')[0].hidden = true;
        $('#timer')[0].hidden = true;
        this.updateTimesPlayed();
        this.updateHighScore(this.score);
    }

    async updateTimesPlayed() {
        const res = await axios.get(`http://localhost:5000/start-game`);
        const times = res.data.timesPlayed;
        $('#play-count')[0].innerHTML = `Times Played: ${times}`;
    }

    async updateHighScore(highScore) {
        const res = await axios.get(`http://localhost:5000/update-high-score/${highScore}`);
        const high = res.data.highScore;
        $('#high-score')[0].innerHTML = `High Score: ${high}`
    }
}

let game = new BoggleGame(60);



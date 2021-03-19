const gameContainer = document.getElementById("game");

const colorChoices = [ //hardcoded colors to choose from
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "brown",
    "pink",
    "black",
]

let COLORS = [];
for (let cardNum = 9; cardNum > 0; cardNum--) {
    // choose random color from colorChoices
    const colorSelect = colorChoices[Math.floor(Math.random() * colorChoices.length)];

    // push color to COLORS
    COLORS.push(colorSelect);
    COLORS.push(colorSelect);

    // remove color from colorChoice, so no duplicates
    colorChoices.splice(colorChoices.indexOf(colorSelect), 1);
}


// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

let shuffledColors = shuffle(COLORS);
let card1 = '';
let card2 = '';
let score = 0;
let highScore;

if (!localStorage.highScore) { // if no local high score
    localStorage.setItem('highScore', '0');
    highScore = 0;
    // localStorage.setItem('highScore', JSON.stringify(highScore));
} else { //if there is a local high score
    highScore = parseInt(JSON.parse(localStorage.highScore));
}

const currentScore = document.createElement('h3');

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
    currentScore.innerText = `Current Score: ${score}`;
    gameContainer.prepend(currentScore);


    for (let color of colorArray) {
        // create a new div
        const newDiv = document.createElement("div");

        // give it a class attribute for the value we are looping over
        newDiv.classList.add(color);

        newDiv.classList.add('hidden');

        // call a function handleCardClick when a div is clicked on
        newDiv.addEventListener("click", handleCardClick);

        // append the div to the element with an id of game
        gameContainer.append(newDiv);
    }
}


// const currentScore = document.querySelector('#current-score');
// const bestScore = document.querySelectorAll('#best-score');

// TODO: Implement this function!
function handleCardClick(event) {
    // you can use event.target to see which element was clicked
    // console.log("you just clicked", event.target);

    // call function to reveal color
    if (card1 === '') { //is empty
        card1 = event.target;
        card1.classList.remove('hidden'); //show color
    } else if (card1 !== '' && card2 !== '') {
        return;
        // console.log('ever happens?'); //do nothing if both cards already selected
    } else {
        card2 = event.target;

        if (card1 === card2) {
            card2 = '';
            return;
        }
        card2.classList.remove('hidden');

        // console.log('check');
        //compare the cards
        if (card1.className === card2.className) {
            card1.removeEventListener("click", handleCardClick);
            card2.removeEventListener("click", handleCardClick);
            card1 = '';
            card2 = '';
            // console.log('same');
        } else {
            // console.log('different');

            setTimeout(function() { //hide color
                card1.classList.add('hidden');
                card2.classList.add('hidden');
                card1 = '';
                card2 = '';
            }, 1000);
        }

    }
    // console.log('done');
    score++;

    currentScore.innerText = `Current Score: ${score} Best Score: ${highScore}`;

    //if there's no other card revealed, don't hide
    //else if there is another card revealed, compare them

    //if both are the same, stay revealed
    //else if not the same, hide both cards
}

// function reveal()



// when the DOM loads
const startButton = document.querySelector('#start-button');
const resetButton = document.querySelector('#reset-button');

startButton.addEventListener('click', function() {
    if (!gameContainer.firstElementChild) {
        createDivsForColors(shuffledColors);
    }
});


resetButton.addEventListener('click', function() {
    if (gameContainer.childElementCount > 1) {
        clearBoard();
    }
});
// createDivsForColors(shuffledColors);

function clearBoard() {
    if (GameOver()) {
        gameContainer.innerText = '';
        shuffledColors = shuffle(COLORS);
        createDivsForColors(shuffledColors);
        if (highScore === 0 || highScore > score) {
            highScore = score;
            localStorage.highScore = JSON.stringify(highScore);
        }
        score = 0;
        highScore = parseInt(JSON.parse(localStorage.highScore));
        currentScore.innerText = `Current Score: ${score} Best Score: ${highScore}`;
    }
}

function GameOver() {
    for (const cards of gameContainer.children) {
        if (cards.className.includes('hidden')) { //if a card is hidden, ie game not over
            return false; //
        }
    }
    return true;
}
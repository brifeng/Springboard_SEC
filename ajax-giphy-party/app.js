console.log("Let's get this party started!");


async function getGif(searchTerm) {
    const res = await axios.get(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`);
    const gif = makeImg(res);
    appendImg(gif);
}

function makeImg(test) {
    const newImg = document.createElement('img');
    newImg.src = test.data.data[0].images.fixed_width.url;
    return newImg;
}

function appendImg(img) {
    const list = document.querySelector('#gifs');
    const li = document.createElement('li');
    li.append(img);
    list.append(li);
}

const gifForm = document.querySelector('#gif-form');
const gifInput = document.querySelector('#gif-input');
const clearBtn = document.querySelector('#clear-gifs');

gifForm.addEventListener('submit', function(e) {
    e.preventDefault();
    getGif(gifInput.value);
    gifInput.value = '';
});

clearBtn.addEventListener('click', clearGifs);

function clearGifs() {
    let list = document.querySelector('#gifs');
    while (list.firstElementChild) {
        list.removeChild(list.children[0]);
    }
}
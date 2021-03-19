const memeURL = document.querySelector('#img');
const topText = document.querySelector('#top');
const bottomText = document.querySelector('#bottom');
const submitBtn = document.querySelector('#submit');

const result = document.querySelector('#result');

// when submit button is clicked, store all fields
// make the meme in element
// append to results section
submitBtn.addEventListener('click', function(e) {
    e.preventDefault();

    const image = memeURL.value;
    const top = topText.value;
    const bottom = bottomText.value;

    try {
        console.log(imageExists(image));
        makeMeme();
        memeURL.value = '';
        topText.value = '';
        bottomText.value = '';
    } catch {
        alert('Invalid Image URL!')
    }
});


function makeMeme() {
    const image = memeURL.value;
    const top = topText.value;
    const bottom = bottomText.value;

    const newMeme = document.createElement('div');
    newMeme.classList.add('relative');

    // make new elements from form submission
    const newImage = document.createElement('img');
    newImage.src = image;
    newImage.classList.add('image');

    const newTop = document.createElement('div');
    newTop.innerText = top;
    newTop.classList.add('top-text');

    const newBottom = document.createElement('div');
    newBottom.innerText = bottom;
    newBottom.classList.add('bottom-text');

    // put it together
    newMeme.appendChild(newImage);
    newMeme.appendChild(newTop);
    newMeme.appendChild(newBottom);
    result.appendChild(newMeme);


    newMeme.addEventListener('dblclick', function(e) {
        newMeme.remove();
    })


    // remove button (replaced by above)
    // const removeButton = document.createElement('button');
    // removeButton.innerText = 'X';
    // newMeme.appendChild(removeButton);
    // removeButton.addEventListener('click', function(e) {
    //     removeButton.parentElement.remove();
    // });

    // result.addEventListener('click', function (e) {
    //     removeMeme(e.target);
    // });
}

// function to check if image exists 
// https://stackoverflow.com/questions/18837735/check-if-image-exists-on-server-using-javascript
function imageExists(image_url) {

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;
}
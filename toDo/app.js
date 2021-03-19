// Part 1
// For this assignment you will be combining your knowledge of DOM access 
// and events to build a todo app!

// As a user, you should be able to:

// Add a new todo (by submitting a form)

const form = document.querySelector('form');
const toDoInput = document.querySelector('input');
const list = document.querySelector('ul');

const arrayToDo = [];




form.addEventListener('submit', function(e) {
    e.preventDefault();
    // do something with toDoInput.value
    let newToDo = document.createElement('li');
    newToDo.innerText = toDoInput.value;
    list.appendChild(newToDo);
    toDoInput.value = ''; //clear entry


    let itemObj = {
        value: newToDo.innerText,
        complete: false
    }
    arrayToDo.push(itemObj);
    localStorage.setItem('thingsToDo', JSON.stringify(arrayToDo));

    // localStorage.setItem('thingsToDo', JSON.stringify(document.querySelectorAll('li')));

})

// Mark a todo as completed (cross out the text of the todo)
list.addEventListener('click', function(e) {
    //add css style to li element clicked
    const completed = e.target;
    if (completed.tagName === 'LI') { //must click on li, not the ul
        completed.classList.toggle('complete');
    }
})

// Remove a todo
list.addEventListener('dblclick', function(e) {
    const removed = e.target;
    if (removed.tagName === 'LI') {
        e.target.remove();
    }
})

// Part 2
// Now that you have a functioning todo app, save your todos in localStorage! 
// Make sure that when the page refreshes, the todos on the page remain there.


// generate list from localStorage
try {
    for (localItem of JSON.parse(localStorage.thingsToDo)) {
        const item = document.createElement('li');
        item.innerText = localItem.value;
        list.appendChild(item);
        arrayToDo.push(localItem)
            // console.log(item);
    }
} catch {}
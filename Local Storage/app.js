const darkSwitch = document.querySelector('#switch');


if (localStorage.dark === 'true') {
    document.body.className = 'dark';
    darkSwitch.checked = true;
}else {
    document.body.className = '';
    darkSwitch.checked = false;
}

darkSwitch.addEventListener('click', function () {
    toggleDarkMode();
});

function toggleDarkMode() {
    if (localStorage.dark === 'false') {
        // console.log('turn on dark');
        localStorage.dark = 'true';
        document.body.classList.add('dark');
    } else {
        // console.log('turn off dark');
        localStorage.dark = 'false';
        document.body.classList.remove('dark');
    }
}

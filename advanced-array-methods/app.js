const arr = [1, 2, 3, 4, 5, 6];

function myForEach(input, func) {
    for (let i = 0; i < input.length; i++) {
        func(input[i]);
    }

    for (let i of input) {
        // do something;
        func(i);
    }
    return undefined;
};

function myMap(input, func) {
    let arr = [];
    for (let i = 0; i < input.length; i++) {
        arr[i] = func(input[i]);
    }
    return arr;
}

function myFilter(input, func) {
    let arr = [];
    for (let i = 0; i < input.length; i++) {
        if (func(input[i])) {
            arr.push(input[i]);
        }
    }
    return arr;
}

function mySome(input, func) {
    for (let el of input) {
        if (func(el)) {
            return true;
        }
    }
    return false;
}

function myEvery(input, func) {
    for (let el of input) {
        if (!func(el)) {
            return false;
        }
    }
    return true;
}

function myFind(input, func) {
    for (let el of input) {
        if (func(el) === true) {
            return el;
        }
    }
    return undefined;
}

function myFindIndex(input, func) {
    for (let i = 0; i < input.length; i++) {
        if (func(input[i]) === true) {
            return i;
        }
    }
    return -1;
}
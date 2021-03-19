// ES2015

const filterOutOdds = (...nums) => (nums.filter((num) => num % 2 === 0))



// findMin()
const findMin = (...nums) => (nums.reduce((min, next) => min > next ? next : min))



// mergeObjects()
const mergeObjects = (obj1, obj2) => ({...obj1, ...obj2 });



// doubleAndReturnArgs()
const doubleAndReturnArgs = (arr, ...nums) => ([...arr, ...nums.map((num) => num * 2)]);




// Slice and Dice!
/** remove a random element in the items array
and return a new array without that item. */

// function removeRandom(items) {
// }
const removeRandom = (items) => {
    const output = [...items];
    output.splice(Math.floor(Math.random() * output.length), 1);
    return output;
}

/** Return a new array with every item in array1 and array2. */

// function extend(array1, array2) {
// }
const extend = (array1, array2) => [...array1, ...array2];

/** Return a new object with all the keys and values
from obj and a new key/value pair */

// function addKeyVal(obj, key, val) {
// }
const addKeyVal = (obj, key, val) => {
    const output = {...obj };
    output[key] = val;
    return output;
}


/** Return a new object with a key removed. */

// function removeKey(obj, key) {
// }
const removeKey = (obj, key) => {
    const output = {...obj };
    delete output[key];
    return output;
}


/** Combine two objects and return a new object. */

// function combine(obj1, obj2) {
// }
const combine = (obj1, obj2) => ({...obj1, ...obj2 });


/** Return a new object with a modified key and value. */

// function update(obj, key, val) {
// }
const update = (obj, key, val) => {
    const output = {...obj };
    output[key] = val;
    return output;
}
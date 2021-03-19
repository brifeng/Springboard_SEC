// Quick Question #1
new Set([1, 1, 2, 2, 3, 4]) // { 1, 2, 3, 4 }


// Quick Question #2
[...new Set("referee")].join("") // ref


// Quick Question #3
let m = new Map();
m.set([1, 2, 3], true);
m.set([1, 2, 3], false);
// { [1, 2, 3] => true,
//   [1, 2, 3] => false}


// hasDuplicate
const hasDuplicate = (arr) => {
    return arr.length !== new Set(arr).size;
}


// vowelCount
const vowelCount = (str) => {
    const vowels = 'aeiou';
    const output = new Map();
    for (const char of str.toLowerCase()) {
        if (vowels.indexOf(char) != -1) {
            if (output[char] !== undefined)
                output[char]++;
            else
                output[char] = 1;
        }
    }
    return output;
}
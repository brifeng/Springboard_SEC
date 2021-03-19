// Same keys and values ES2015
const createInstructor = (firstName, lastName) => {
    return {
        firstName,
        lastName
    }
}

// Computed Property Names ES2015
const favoriteNumber = 42;
const instructor = {
    firstName: 'Colt',
    [favoriteNumber]: 'That is my favorite!'
};

// Object Methods ES2015
{
    const instructor = {
        firstName: 'Colt',
        sayHi() {
            return 'Hi!';
        },
        sayBye() {
            return this.firstName + ' says bye!';
        }
    }
}

// createAnimal function
const createAnimal = (species, verb, noise) => {
    return {
        species,
        [verb]() {
            console.log(noise);
        }
    }
}
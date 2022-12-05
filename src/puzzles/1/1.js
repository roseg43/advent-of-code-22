import dataString from '../../data/1.js';

/**
 * Takes the data string and converts it into a multidimensional array representing each elf and
 * the food items they're holding.
 * @returns {Array} An array containing an array indice of each elf's caloric items.
 */
const getElfGroups = () => {
    const dataArray = dataString.split('\n');
    const elves = [];
    let currentElf = [];

    dataArray.forEach( (string) => {
        if (string === '') {
            elves.push(currentElf);
            currentElf = [];
        } else {
            currentElf.push(string);
        }
    });
    
    // At the end, push the final elf which hasn't been pushed yet
    elves.push(currentElf);

    return elves;
}

/**
 * Reduces the array of caloric items an elf is carrying down to a singular sum
 * @param {Array} values All of the caloric items an individual elf is carrying
 * @returns {Number} The caloric sum of all items
 */
const getCaloricSum = (values) => values.reduce((previousValue, currentValue) => previousValue + parseInt(currentValue), 0);

/**
 * Flattens our collection of elves into an aray of singular caloric sums.
 * @returns {Array} Contains the sum of each elf's caloric items
 */
const getElvesToSingularCaloricValues = () => {
    const elves = getElfGroups();
    return elves.map((values) => getCaloricSum(values));
}

/**
 * Reduces our array of caloric sums to the largest sum in the list.
 */
const elfWithMostCalories = getElvesToSingularCaloricValues().reduce((previousValue, currentValue) => currentValue > previousValue ? currentValue : previousValue);

const init = () => {
   console.log(`The elf with the most calories is carrying ${elfWithMostCalories} calories of food items`);
};

export default init;
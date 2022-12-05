import dataString from '../../../data/1.js';

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
 * 
 * @param {Array} elves Array of numbers representing the caloric sum of each elf's caloric items
 * @param {string} sortBy Whether to sort in ascending or descending order.
 * @returns 
 */
const sortElvesByCaloricValue = (elves, sortBy = 'desc') => elves.sort((a, b) => {
    if (a === b) {
        return 0;
    }

    if (sortBy === 'desc') {
        return a < b ? 1 : -1;
    } else if (sortBy === 'asc') {
        return a > b ? 1 : -1;
    }
})

/**
 * Flattens our collection of elves into an aray of singular caloric sums.
 * @returns {Array} Contains the sum of each elf's caloric items
 */
const getElvesWithSingularCaloricValues = (elves, shouldSort = true) => {
    const elvesWithSums = elves.map((values) => getCaloricSum(values));
    return shouldSort ? sortElvesByCaloricValue(elvesWithSums) : elvesWithSums;
}

// Raw groupings. We don't need individual food items yet, so this is currently private.
const elfGroups = getElfGroups();

/**
 * Adds up the caloric value of an arbitrary number of elves.
 * @param {Arrau} elves - An array holding the sum of each elf's caloric items, sorted in descendending order
 * @param {Number} limit - The number of elves to sum together
 * @returns {Number} The final sum
 */
export const sumElvesCalories = (elves, limit = 1) => Math.max(elves.slice(0, limit).reduce((previousValue, currentValue) => previousValue + currentValue, 0), elves[0]);

/**
 * We make the unsorted and sorted groups available for import, in case we ever need them in original order
 */
export const elves = getElvesWithSingularCaloricValues(elfGroups, false);
export const elvesSorted = getElvesWithSingularCaloricValues(elfGroups);
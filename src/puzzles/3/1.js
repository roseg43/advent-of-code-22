
import dataString from '../../../data/3.js';

// Turn our string into the data we need
const rucksacks = dataString.split('\n').map((string) => {
    return [string.substring(0,(string.length / 2)), string.substring((string.length / 2))];
});
console.log(rucksacks);

const convertLetterToPriority = (letter) => {
    // Remove the starting unicode index for alphanumeric characters
    const baseScore = letter.toLowerCase().charCodeAt() - 96;
    
    // Check if it's uppercase and apply our extra points if so
    if (letter.match(/[A-Z]/)) {
        console.log('Uppercase letter found:', letter);
        return baseScore + 26;
    }
    return baseScore;
}

const findCommonItems = (compartments) => {
    const lettersToCheck = compartments[0].split('').filter((value, index, self) => self.indexOf(value) === index);
    const commonItems = lettersToCheck.map((letter) => compartments[1].includes(letter) ? letter : null).filter((letter, index, self) => letter && self.indexOf(letter) == index);
    console.log('common items: ',commonItems);
    return commonItems;
}

const init = () => {
    const pointSum = rucksacks.reduce((sum, item) => {
        console.log('current sum:', sum);
        const commonItems = findCommonItems(item);
        
        // Convert shared letters to points
        points = commonItems.map(convertLetterToPriority);
        
        // Reduce a single rucksack to a point value
        const singleBagSum = points.reduce((sum2, value) => sum2 + value, 0);
        console.log(singleBagSum);
        
        return sum + singleBagSum;
    }, 0);

    console.log(pointSum);
}

export default init;
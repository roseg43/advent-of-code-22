
import dataString from '../../../data/3.js';

// Turn our string into the data we need
const rucksacks = dataString.split('\n').map((string) => {
    return [string.substring(0,(string.length / 2)), string.substring((string.length / 2))];
});


const chunkArray = (arr, len) => {
  let chunks = [],
      i = 0,
      n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }

  return chunks;
}

const convertLetterToPriority = (letter) => {
    // Remove the starting unicode index for alphanumeric characters
    const baseScore = letter.toLowerCase().charCodeAt() - 96;
    
    // Check if it's uppercase and apply our extra points if so
    if (letter.match(/[A-Z]/)) {
        return baseScore + 26;
    }
    return baseScore;
}

const findCommonItems = (groups) => {
    const lettersToCheck = groups[0].split('').filter((value, index, self) => self.indexOf(value) === index);
    const commonItems = lettersToCheck.map((letter) => groups[1].includes(letter) ? letter : null).filter((letter, index, self) => letter && self.indexOf(letter) == index);
    
    return commonItems;
}

const findCommonItemInGroup = (group) => {
    const groupsAsStrings = group.map((item) => item.join(''));
    return findCommonItems([findCommonItems([groupsAsStrings[0], groupsAsStrings[1]]).join(''), groupsAsStrings[2]]).filter((value) => value && typeof value !== 'undefined')[0];
}

const init = () => {
    // Group elves into their groups
    const groups = chunkArray(rucksacks, 3);
    const idTypes = groups.map(findCommonItemInGroup);
    
    const sum = idTypes.reduce((sum, value) => {
        return sum + convertLetterToPriority(value);
    }, 0);
    
    console.log(sum);
}

export default init;
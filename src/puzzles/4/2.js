import dataString from '../../../data/4.js';

const data = dataString.split('\n')
    .map((rangePair) => rangePair.split(',')
        .map((rangeString) => rangeString.split('-')
            .map((rangeVal) => parseInt(rangeVal)
        )
    )
);


const getLargestNumberInSet = (set) => {
    return set.reduce((largestNumber, current) => {
        return Math.max(largestNumber, Array.isArray(current) ? getLargestNumberInSet(current) : current);
    }, 0);
}

const high = getLargestNumberInSet(data);

/**
 * This is definitely a kind of weird way to do our comparisons, but eh…
 */
let sourceString = [];
let i = 1;
while (i < high + 1) {
    sourceString.push(i);
    i++;
}


/**
 * Creates a range using the range we generated from 0 to the highest number in our dataset.
 * I have no idea why I decided to go with this approach
 * @param {Array} set An elf's assignment range
 * @returns {Array} The range we want to use for our intersection comparisons
 */
const createRangeFromSource = (set) => {
   return sourceString.slice(set[0]-1, set[1]);
}


const init = () => {

    /**
     * Now that we have our sample range, let's expand our range strings from the
     * source data.
     */
    let containingSets = 0;
    
    data.forEach((group) => {
        // We're now looking at two sets, one for each elf
        const set1 = createRangeFromSource(group[0]);
        const set2 = createRangeFromSource(group[1]);
        
        // Determine which set we should check against
        let largerSet, smallerSet;
        if (set1.length < set2.length ) {
            smallerSet = set1,
            largerSet = set2;
        } else {
            // If they're the same length, it doesn't matter which we assign where
            smallerSet = set2,
            largerSet = set1;
        }
    
        // Check to see if the larger set contains the smaller set.
        if (smallerSet.some((el) => largerSet.includes(el))) {
            containingSets++;
        }
    })
    
    console.log('Sets containing one another:', containingSets);
}

export default init;
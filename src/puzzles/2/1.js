import dataString from '../../../data/2.js';

const outcomeMap = [
    ['A', 'B', 'C'],
    ['Y', 'Z', 'X'],
];

// Turn our string into the data we need
const data = dataString.split('\n').filter((el) => el).map((string) => string.split(' '));

/**
 * Gets the nicename for each player's action and then computes who won
 * @param {*} yourAction 
 * @param {*} theirAction 
 */
const computeYourOutcome = (theirAction, yourAction) => {
    const theirActionIndex = outcomeMap[0].indexOf(theirAction);
    // check if your action has the same index as yours in the 'lose' map
    const yourActionIndex = outcomeMap[1].indexOf(yourAction);

    return (yourActionIndex + 1) % 3 === theirActionIndex ? 3 : yourActionIndex === theirActionIndex ? 6 : 0; 
}

const scoreGuide = () => {
    const points = data.reduce((pointSum, currentRound) => {
        const [ theirAction, yourAction ] = currentRound;
        const actionPoints = (outcomeMap[1].indexOf(yourAction) + 2) % 3 === 0 ? 3 : (outcomeMap[1].indexOf(yourAction) + 2) % 3;
        const outcomePoints = computeYourOutcome(...currentRound);

        return pointSum + actionPoints + outcomePoints
    }, 0)
    
    console.log('The number of points you would score using the strategy guide is: ', points);
}

export default scoreGuide;

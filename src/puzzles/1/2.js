import { elvesSorted as elves, sumElvesCalories } from './utils/index.js';



const init = () => {
    const limit = 3;
   console.log(`The elf with the most calories is carrying ${sumElvesCalories(elves)} calories of food items`);
   console.log(`The combined caloric count of the ${limit} elves carrying the most calories is: ${sumElvesCalories(elves, limit)} calories`);
};

export default init;
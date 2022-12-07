import {diagram, instructions} from '../../../data/5.js';

/**
 * We want to take an instruction and convert it to an array of number, source, destination
 */
const parseInstruction = (instruction) => {
    return instruction.match(/\d/g);
};

const chunkArray = (arr, len) => {
  let chunks = [],
      i = 0,
      n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }

  return chunks;
}

/**
 * Transposes a matrix
 */
const transpose = (a) => a[0].map((_, c) => a.map(r => r[c]));


const moveCrate = (source, dest, columns) => {
    let _columns = [...columns]
    const crateToMove = _columns[source - 1].shift();
    _columns[dest - 1].unshift(crateToMove);
    return _columns;
}

/**
 * Moves a number of crates from one column to another, retaining their original order
 */
const moveCrates = (source, dest, columns, count = 1) => {
    let _columns = [...columns]
    
    // Create our subcollection
    const cratesToMove = _columns[source - 1].slice(0, count);

    // Remove the crates from the source column
    cratesToMove.forEach((_) => _columns[source - 1].shift());

    // Add the crates to the destination column
    _columns[dest - 1].unshift(...cratesToMove);
    return _columns;
}

const runInstruction = (count, source, dest, columns) => {
    console.log('instruction column state:', columns);
    const targetGroup = columns[source];
    console.log(`Run instruction: Move ${count} from ${source} to ${dest}`);
    let newColumnState = [...columns];
    newColumnState = moveCrates(source, dest, newColumnState, count)
    return newColumnState;
}

const init = () => {
    // Split the diagram into rows
    const rows = diagram.split('\n')
        .map((crates) => chunkArray(crates, 4)
        .map((string) => string.trim()));
    
    // Remove the last row as it just gives us the column labels
    rows.pop();

    // Split the instructions into an array of instructions
    const instructionsArr = instructions.split('\n').map((instruction) => (instruction.match(/\d+/g)).map((val) => parseInt(val)));
    let columns = transpose(rows).map((column) => column.filter((crate) => crate !== ''));
    
    console.log(columns);

   instructionsArr.reduce((columnState, instruction) => runInstruction(...instruction, columnState), columns);

   // Get the first item from every column and concat it to a string
    const result = columns.map((column) => column[0]).join('');
    console.log(result.replace(/[\[\]]/g, ''));

};

export default init;
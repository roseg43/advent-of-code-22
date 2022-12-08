import dataString from '../../../data/6.js'

/**
 * Leverages Set to determine if all values in the buffer segment are unique
 * @param {string} segment the last 4 characters in the buffer stream
 * @returns {bool} does this match the pattern for a buffer marker?
 */
const isBufferSegmentMarker = (segment) => [...new Set(segment)].length === segment.length;

const streamBuffer = (buffer) => {
    // Stores last 14 characters
    let segment = [];
    let markerPosition = 0;
    
    // Identifies how long a marker is in the buffer
    const markerLength = 14;

    for (let i = 0; i + markerLength < buffer.length; i++) {
        if (segment.length === markerLength) {
            if (isBufferSegmentMarker(segment)) {
                markerPosition = i;
                break;
            }
            segment.shift();
        }
        segment.push(buffer[i]);
    }
    
    return markerPosition;
}

const init = () => {
    console.log('The first buffer marker is at position: ', streamBuffer(dataString));
    return;
}

export default init;
import dataString from '../../../data/6.js'

/**
 * Leverages Set to determine if all values in the buffer segment are unique
 * @param {string} segment the last 4 characters in the buffer stream
 * @returns {bool} does this match the pattern for a buffer marker?
 */
const isBufferSegmentMarker = (segment) => [...new Set(segment)].length === segment.length;

const streamBuffer = (buffer) => {
    // Stores last 4 characters
    let segment = [];
    let markerPosition = 0;
    for (let i = 0; i + 4 < buffer.length; i++) {
        if (segment.length === 4) {
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
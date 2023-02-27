/**
 * Formats a time duration in seconds to a string in the format "HH:mm:ss.SS".
 * @param {string} timeInSeconds - The time duration in seconds.
 * @returns {string} The formatted time string.
 */
export const timer = (timeInSeconds) => {
  let pad = function (num, size) {
      return ('00' + num).slice(size * -1);
    },
    time = parseFloat(timeInSeconds).toFixed(2),
    hours = Math.floor(time / 60 / 60),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60),
    milliseconds = time.slice(-2);

  return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2) + '.' + pad(milliseconds, 2);
};

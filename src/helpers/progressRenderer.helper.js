/**
 * Returns the progress of a timer as a percentage string.
 * @param {number} remainingTime - The remaining time in milliseconds.
 * @param {number} duration - The total duration of the timer in milliseconds.
 * @returns {string} - A string representing the progress of the timer as a percentage.
 */
export const progressRenderer = (remainingTime, duration) => {
  const percentage = ((remainingTime / 1000) * 100) / duration;
  return `${percentage > 0 ? `${percentage}%` : '0%'}`;
};

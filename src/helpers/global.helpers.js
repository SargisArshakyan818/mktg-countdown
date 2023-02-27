import { CountDownStatus } from '../constants/constants';

/**
 * Returns whether the input field should be disabled based on the countDown status.
 * @param {string} status - The current countDown status.
 * @returns {boolean} - Whether the input field should be disabled.
 */
export const inputDisabledRenderer = (status) => {
  return (
    status === CountDownStatus.START ||
    status === CountDownStatus.RESUME ||
    status === CountDownStatus.PAUSE
  );
};

/**
 * Returns whether the image should be displayed based on the countDown status.
 * @param {string} status - The current countDown status.
 * @returns {boolean} - Whether the image should be displayed.
 */
export const imageRenderer = (status) => {
  return status === CountDownStatus.INITIAL || status === CountDownStatus.PAUSE;
};

/**
 * Returns whether the stop button should be disabled based on the countDown status.
 * @param {string} status - The current countDown status.
 * @returns {boolean} - Whether the stop button should be disabled.
 */
export const stopDisabledRenderer = (status) => {
  return status === CountDownStatus.INITIAL;
};

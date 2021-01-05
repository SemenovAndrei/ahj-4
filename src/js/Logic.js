/* eslint-disable no-param-reassign */

import cardSystem from './cardSystem';

/**
 * @class Logic
 */
export default class Logic {
  constructor() {
    this.answer = {};
  }

  /**
   * Check card number
   *
   * @param {number} number - number of card
   */
  checkNumber(number) {
    this.setAnswerParam(number);

    if (this.answer.lengthNumber.filter((e) => e === number.length).length) {
      const arrNumber = [...number].reverse();

      this.setValid(arrNumber);
    } else {
      this.answer.valid = 'invalid';
    }
  }

  /**
   * Set param to this.answer
   *
   * @param {number} number - card number
   */
  setAnswerParam(number) {
    const result = [];

    Object.entries(cardSystem).forEach((key) => {
      key[1].code.forEach((e) => {
        if (/\W/.test(e)) {
          const testArr = e.split('-');

          if (Logic.getParamFromArray(testArr, number)) {
            result.push([key[1], Logic.getParamFromArray(testArr, number)]);
          }
        } else {
          const el = new RegExp(`^${e}`);
          if (el.test(number)) {
            result.push([key[1], e]);
          }
        }
      });
    });

    if (result.length) {
      const sortedResult = result.sort((a, b) => a[1] > b[1]);
      // eslint-disable-next-line prefer-destructuring
      this.answer = sortedResult[0][0];
    } else {
      this.answer = {
        name: 'unknown',
        lengthNumber: [''],
      };
    }
  }

  /**
   *
   * @param {array} array - range of numbers
   * @param {number} number - card number
   *
   * @return shortNumber if range is correct
   */
  static getParamFromArray(array, number) {
    const shortNumber = number.slice(0, array[0].length);

    if (shortNumber >= array[0] && shortNumber <= array[1]) {
      return shortNumber;
    }
  }

  /**
   * Set param to valid\invalid
   *
   * @param {array} arrNumber - array from card number
   */
  setValid(arrNumber) {
    const result = [];

    arrNumber.forEach((e, index) => {
      if (index % 2 !== 0) {
        e *= 2;
        if (e > 9) {
          e -= 9;
        }
      }
      result[index] = Number(e);
    });
    this.answer.valid = result.reduce((a, b) => a + b) % 10 === 0 ? 'valid' : 'invalid';
  }

  /**
   * Set card number to this.answer.number
   *
   * @param {number} number - card number
   */
  setNumber(number) {
    const arrNumber = number.split('');
    const result = [];

    arrNumber.forEach((e, index) => {
      if ((index + 1) % 4 === 0 && index !== arrNumber.length - 1) {
        e += ' - ';
      }
      result[index] = e;
    });

    this.answer.number = result.join('');
  }

  /**
   *
   * @param {number} number - card number
   *
   * @return this.answer
   */
  getAnswer(number) {
    this.checkNumber(number);

    this.setNumber(number);

    return this.answer;
  }
}

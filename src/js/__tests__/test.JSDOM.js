import Logic from '../Logic';
import ContentBlock from '../ContentBlock';
import FormMain from '../FormMain';
import CreditCardValidator from '../CreditCardValidator';

const logic = new Logic();

const contentBlock = new ContentBlock();

const form = new FormMain();

const creditCardValidator = new CreditCardValidator(form, logic, contentBlock);
creditCardValidator.init();

describe('test CreditCardValidator', () => {
  const field = document.querySelector('.field');
  const btn = document.querySelector('.btn-submit');

  describe('valid', () => {
    test.each([
      ['4539244964332726'],
      ['4556732257150183'],
      ['4262554819450199'],
      ['4024007144808820'],
      ['4485573488574759'],
    ])('%p', (number) => {
      field.value = number;
      btn.click();

      const numberValid = document.querySelector('.mark-invalid');

      expect(numberValid.classList.contains('mark-valid')).toBeTruthy();
    });
  });
  describe('invalid', () => {
    test.each([
      ['45392449643327261'],
      ['4556732257150181'],
      ['4262554819450191'],
      ['40240071448088201'],
      ['4485573488574751'],
    ])('%p', (number) => {
      field.value = number;
      btn.click();

      const numberValid = document.querySelector('.mark-invalid');

      expect(numberValid.classList.contains('mark-valid')).toBeFalsy();
    });
  });
});

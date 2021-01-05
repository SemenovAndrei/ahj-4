import Logic from '../Logic';

const logic = new Logic();

describe('check system', () => {
  test.each([
    ['34', 'americanExpress'],
    ['37', 'americanExpress'],
    ['31', 'chinaTUnion'],
    ['62', 'chinaUnionPay'],
    ['36', 'dinersClubInternational'],
    ['54', 'dinersClubUnitedStatesCanada'],
    ['6011', 'discoverCard'],
    ['65', 'discoverCard'],
    ['60400100', 'ukrCard'],
    ['60', 'ruPay'],
    ['636', 'interPayment'],
    ['637', 'instaPayment'],
    ['3528', 'jcb'],
    ['6759', 'maestroUK'],
    ['5018', 'maestro'],
    ['5019', 'dankort'],
    ['2200', 'mir'],
    ['6054740', 'npsPridnestrovie'],
    ['51', 'mastercard'],
    ['979200', 'troy'],
    ['4', 'visa'],
    ['4026', 'visaElectron'],
    ['1', 'uatp'],
  ])('%p %p', (number, value) => {
    const answer = logic.getAnswer(number);
    expect(answer.type).toBe(value);
  });
});

describe('check validation', () => {
  describe('valid', () => {
    test.each([
      ['4539244964332726'],
      ['4556732257150183'],
      ['4262554819450199'],
      ['4024007144808820'],
      ['4485573488574759'],
    ])('%p', (number) => {
      const answer = logic.getAnswer(number);
      expect(answer.valid).toBe('valid');
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
      const answer = logic.getAnswer(number);
      expect(answer.valid).toBe('invalid');
    });
  });
});

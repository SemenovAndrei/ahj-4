import Logic from './Logic';
import ContentBlock from './ContentBlock';
import FormMain from './FormMain';
import CreditCardValidator from './CreditCardValidator';

const logic = new Logic();

const contentBlock = new ContentBlock();

const form = new FormMain();

const creditCardValidator = new CreditCardValidator(form, logic, contentBlock);
creditCardValidator.init();

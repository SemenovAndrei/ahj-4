/**
 * @class CreditCardValidator
 */
export default class CreditCardValidator {
  /**
   * @constructor
   *
   * @param {Class} form - FormMain
   * @param {Class} logic - Logic
   * @param {Class} contentBlock - ContentBlock
   */
  constructor(form, logic, contentBlock) {
    this.form = form;
    this.logic = logic;
    this.contentBlock = contentBlock;
  }

  /**
   * init app validation
   */
  init() {
    this.addElements();
    this.addListeners();
  }

  /**
   * Add elements to page
   */
  addElements() {
    this.addContainer();
    this.addForm();
    this.addCardPreview();
    this.addField();
    this.addBtn();
    this.addHint();
    this.addContent();
  }

  /**
   * Add container on page
   */
  addContainer() {
    const container = document.createElement('div');
    container.classList.add('container');
    this.body = document.querySelector('body');
    this.body.insertAdjacentElement('afterbegin', container);

    this.container = container;
  }

  /**
   * Add form in container
   */
  addForm() {
    this.container.insertAdjacentElement('afterbegin', this.form.getForm());
  }

  /**
   * Add this.cardPreview
   */
  addCardPreview() {
    this.cardPreview = document.querySelector('.card-preview');
  }

  /**
   * Add this.field
   */
  addField() {
    this.field = document.querySelector('.field');
  }

  /**
   * Add this.btn
   */
  addBtn() {
    this.btn = document.querySelector('.btn-submit');
  }

  /**
   * Add this.hint
   */
  addHint() {
    this.hint = document.querySelector('.hint');
  }

  /**
   * Add this.content
   */
  addContent() {
    this.content = document.createElement('div');
    this.content.classList.add('content');
    this.container.insertAdjacentElement('beforeend', this.content);
  }

  /**
   * Add listeners
   */
  addListeners() {
    this.btn.addEventListener('click', (e) => this.validate(e));
    this.field.addEventListener('input', () => this.showPreview());
  }

  /**
   * @return this.field.value
   */
  getNumber() {
    return this.field.value;
  }

  /**
   * Clear this.field.value
   */
  clearNumber() {
    this.field.value = '';
  }

  /**
   * Show this.hint
   */
  showHint() {
    const top = `${this.field.getBoundingClientRect().top - 30}px`;

    this.hint.style.top = top;
    this.hint.textContent = 'Нужно ввести номер';

    setTimeout(() => {
      this.hint.textContent = '';
      this.hint.removeAttribute('style');
    }, 2000);
  }

  /**
   * Show this.preview
   */
  showPreview() {
    if (this.getNumber() > 0) {
      [...this.cardPreview.classList]
        .filter((el) => el.match(/^card-name.*/))
        .forEach((e) => this.cardPreview.classList.remove(e));

      const answer = this.logic.getAnswer(this.getNumber());

      if (answer.name !== 'unknown') {
        this.cardPreview.classList.add(`card-name-${answer.type}`);
      }
    } else {
      [...this.cardPreview.classList]
        .filter((el) => el.match(/^card-name.*/))
        .forEach((e) => this.cardPreview.classList.remove(e));
    }
  }

  /**
   * Run card number validation
   *
   * @param {event} e - Event
   */
  validate(e) {
    e.preventDefault();

    if (this.getNumber() > 0) {
      const answer = this.logic.getAnswer(this.getNumber());
      this.showAnswer(answer);
    } else {
      this.showHint();
    }
    this.clearNumber();
  }

  /**
   * Show answer in this.content block
   *
   * @param {Object} answer - object with properties
   */
  showAnswer(answer) {
    this.clearContent();

    const contentBlock = this.contentBlock.getContentBlock(answer);

    const cardName = contentBlock.querySelector('.card-name');

    if (answer.url) {
      cardName.classList.add(`card-name-${answer.type}`);
    } else {
      cardName.textContent = answer.name;
    }

    const mark = contentBlock.querySelector('.mark-invalid');

    if (answer.valid === 'valid') {
      mark.classList.add('mark-valid');
    }

    this.content.insertAdjacentElement('afterbegin', contentBlock);
  }

  /**
   * Clear this.content block
   */
  clearContent() {
    this.content.innerHTML = '';
  }
}

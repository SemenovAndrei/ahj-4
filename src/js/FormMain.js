/**
 * @class FormMain
 */
export default class FormMain {
  constructor() {
    this.form = null;
  }

  /**
   * @return this.form
   */
  getForm() {
    this.createForm();

    return this.form;
  }

  /**
   * Create the form width markup
   */
  createForm() {
    const form = document.createElement('form');
    form.classList.add('form-main');
    form.innerHTML = FormMain.addMarkUpForm();
    this.form = form;
  }

  /**
   * Create markup for the form
   */
  static addMarkUpForm() {
    return `
    <label class="label" for="field">
      <div class="label-title">Check your credit card number</div>
      <div class="pictures-container">
        <div class="card-preview "></div>
      </div>
    </label>
    <div class="controls">
      <input type="number" class="field" id="field" placeholder="write the number here" required>
      <button class="btn btn-submit">Click to Validate</button>
    </div>
    <div class="hint"></div>
      `;
  }
}

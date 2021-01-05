/**
 * @class ContentBlock
 */
export default class ContentBlock {
  constructor() {
    this.contentBlock = null;
  }

  /**
   * Create & return this.contentBlock
   *
   * @param {Object} answer - object with properties
   *
   * @return {ContentBlock}
   */
  getContentBlock(answer) {
    this.answer = answer;

    this.createContentBlock();

    return this.contentBlock;
  }

  /**
   * Create this.contentBlock
   */
  createContentBlock() {
    this.contentBlock = document.createElement('div');
    this.contentBlock.classList.add('content-block');
    this.contentBlock.innerHTML = this.getMarkup();
  }

  /**
   * @return markup for this.contentBlock
   */
  getMarkup() {
    return `
    <div class="card-name"></div>
    <div class="card-number">${this.answer.number}</div>
    <div class="card-valid">Number <span class="mark-invalid">${this.answer.valid}</span></div>
    `;
  }
}

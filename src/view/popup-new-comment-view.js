import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

import { EMOTIONS } from '../const.js';

const BLANK_COMMENT = {
  emotion: null,
  text: '',
};

const createCommentEmotionTemplate = (emotion) =>
  `<div class="film-details__add-emoji-label">
  ${emotion
    ? `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}"></img>`
    : ''}
  </div>`;

const createEmotionsListTemplate = (currentEmotion) => EMOTIONS.map((emotion) =>
  `<input type="radio"
  id="emoji-${emotion}"
  class="film-details__emoji-item visually-hidden"
  name="comment-emoji"
  value="${emotion}"
  ${currentEmotion === emotion ? 'checked' : ''}/>
  <label for="emoji-${emotion}"
  class="film-details__emoji-label"><img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji"></label>`
).join('');

const createPopupNewCommentTemplate = (data) => {

  const {emotion, text} = data;

  const emotionCommentTemplate = createCommentEmotionTemplate(emotion);
  const emotionsListTemplate = createEmotionsListTemplate(emotion);

  return (
    `<div class="film-details__new-comment">
      ${emotionCommentTemplate}

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${text}</textarea>
      </label>

      <div class="film-details__emoji-list">
        ${emotionsListTemplate}
      </div>
    </div>`
  );
};

export default class PopupNewCommentView extends AbstractStatefulView {

  constructor(comment = BLANK_COMMENT) {
    super();
    this._state = PopupNewCommentView.parseCommentToState(comment);
    this.#setInnerHandlers();
  }

  get template() {
    return createPopupNewCommentTemplate(this._state);
  }

  setEnterShiftKeysDownHandler = (callback) => {
    this._callback.enterShiftKeysDown = callback;
    this.element.addEventListener('keydown', this.#enterShiftKeysDownHandler);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setEnterShiftKeysDownHandler(this._callback.enterShiftKeysDown);
  };

  reset = () => {
    this.updateElement(
      PopupNewCommentView.parseCommentToState(BLANK_COMMENT),
    );
  };

  #enterShiftKeysDownHandler = (evt) => {

    if (evt.shiftKey && evt.key === 'Enter') {
      evt.preventDefault();

      this._callback.enterShiftKeysDown(PopupNewCommentView.parseStateToComment(this._state));
    }
  };

  #emotionChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      emotion: evt.target.value,
    });
  };

  #textInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      text: evt.target.value,
    });
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__comment-input')
      .addEventListener('input', this.#textInputHandler);

    this.element.querySelector('.film-details__comment-input')
      .addEventListener('keydown', this.#enterShiftKeysDownHandler);


    this.element.querySelector('.film-details__emoji-list')
      .addEventListener('change', this.#emotionChangeHandler);
  };

  static parseCommentToState = (comment) => {
    const state = {...comment};

    return state;
  };

  static parseStateToComment = (state) => {
    const comment = {...state};

    return comment;
  };
}

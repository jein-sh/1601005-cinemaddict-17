import {remove, render} from '../framework/render.js';
import PopupNewCommentView from '../view/popup-new-comment-view.js';
import {UserAction} from '../const.js';
import {nanoid} from 'nanoid';


export default class NewCommentPresenter {
  #container = null;
  #changeData = null;
  #newCommentComponent = new PopupNewCommentView();

  constructor(container, changeData) {
    this.#container = container;
    this.#changeData = changeData;
  }

  init = () => {
    render(this.#newCommentComponent, this.#container);

    this.#newCommentComponent.setCtrlEnterKeysDownHandler(this.#handleCtrlEnterClick);
  };

  destroy = () => {
    remove(this.#newCommentComponent);
  };

  #handleCtrlEnterClick = (comment) => {
    this.#changeData(
      UserAction.ADD_COMMENT,
      {id: nanoid(), ...comment},
    );
  };
}

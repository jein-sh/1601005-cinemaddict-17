import {render} from '../framework/render.js';
import PopupCommentsContainerView from '../view/popup-comments-container-view.js';
import PopupCommentsView from '../view/popup-comments-view.js';
import PopupCommentsListView from '../view/popup-comments-list-view.js';
import CommentPresenter from '../presenter/comment-presenter.js';
import NewCommentPresenter from './new-comment-presenter.js';

import {UserAction} from '../const.js';

export default class CommentsPresenter {
  #container = null;
  #commentsModel = null;

  #commentPresenter = new Map();
  #newCommentPresenter = null;

  #popupCommentsComponent = null;
  #popupCommentsContainerComponent = new PopupCommentsContainerView();
  #popupCommentsListComponent = new PopupCommentsListView();

  constructor(container, commentsModel) {
    this.#container = container;
    this.#commentsModel = commentsModel;

    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  get comments() {
    return this.#commentsModel.comments;
  }

  init = () => {
    this.#renderPopupCommentsContent();
  };

  #renderPopupCommentsContainer = () => {
    render(this.#popupCommentsContainerComponent, this.#container);
  };

  #renderPopupComments = (comments) => {
    this.#popupCommentsComponent = new PopupCommentsView(comments);
    render(this.#popupCommentsComponent, this.#popupCommentsContainerComponent.element);
  };

  #renderPopupCommentsList = () => {
    render(this.#popupCommentsListComponent, this.#popupCommentsComponent.element);
  };

  #renderComment = (comment) => {
    const commentPresenter = new CommentPresenter(this.#popupCommentsListComponent.element, this.#handleViewAction);
    commentPresenter.init(comment);
    this.#commentPresenter.set(comment.id, commentPresenter);
  };

  #renderComments = (comments) => {
    comments.forEach((comment) => this.#renderComment(comment));
  };

  #clearComments = () => {
    this.#commentPresenter.forEach((presenter) => presenter.destroy());
    this.#commentPresenter.clear();
  };

  #renderPopupNewComment = () => {
    this.#newCommentPresenter = new NewCommentPresenter(this.#popupCommentsComponent.element, this.#handleViewAction);
    this.#newCommentPresenter.init();
  };

  #renderPopupCommentsContent = () => {
    this.#renderPopupCommentsContainer();
    this.#renderPopupComments(this.comments);
    this.#renderPopupCommentsList();
    this.#renderComments(this.comments);
    this.#renderPopupNewComment();
  };

  #handleViewAction = (actionType, update) => {
    switch (actionType) {
      case UserAction.ADD_COMMENT:
        this.#commentsModel.addComment(update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteComment(update);
        break;
    }
  };

  #handleModelEvent = () => {
    this.#clearComments();
    this.#renderComments();
  };

}

import {render, replace, remove} from '../framework/render.js';
import FilmCardView from '../view/film-card-view';
import PopupDetailsView from '../view/popup-details-view.js';
import PopupCommentsView from '../view/popup-comments-view.js';
import PopupWrapperView from '../view/popup-wrapper-view.js';
import PopupFormView from '../view/popup-form-view.js';
import PopupNewCommentView from '../view/popup-new-comment-view.js';
import PopupCommentsContainerView from '../view/popup-comments-container-view.js';

const bodyElement = document.querySelector('body');

export default class FilmPresenter {

  #filmListContainer = null;
  #filmCardsModel = null;

  #filmComponent = null;
  #popupDetailsComponent = null;
  #popupCommentsComponent = null;

  #popupWrapperComponent = new PopupWrapperView();
  #popupFormComponent = new PopupFormView();
  #popupCommentsContainerComponent = new PopupCommentsContainerView();
  #popupNewCommentComponent = new PopupNewCommentView();

  #film = null;
  #comments = [];
  #changeData = null;

  constructor(filmListContainer, filmCardsModel, changeData) {
    this.#filmListContainer = filmListContainer;
    this.#filmCardsModel = filmCardsModel;
    this.#changeData = changeData;
  }

  init = (film) => {
    this.#film = film;
    this.#comments = [...this.#filmCardsModel.comments];

    const prevFilmComponent = this.#filmComponent;
    const prevPopupDetailsComponent = this.#popupDetailsComponent;
    const prevPopupCommentsComponent = this.#popupCommentsComponent;

    this.#filmComponent = new FilmCardView(this.#film);
    this.#popupDetailsComponent = new PopupDetailsView(this.#film);
    this.#popupCommentsComponent = new PopupCommentsView(this.#comments);

    this.#filmComponent.setFilmCardClickHandler(this.#handleFilmCardClick);
    this.#filmComponent.setAddToWatchlistClickHandler(this.#handleAddToWatchlistClick);
    this.#filmComponent.setMarkAsWatchedClickHandler(this.#handleMarkAsWatchedClick);
    this.#filmComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#popupDetailsComponent.setCloseButtonClickHandler(this.#handleCloseButtonClick);
    this.#popupDetailsComponent.setAddToWatchlistClickHandler(this.#handleAddToWatchlistClick);
    this.#popupDetailsComponent.setMarkAsWatchedClickHandler(this.#handleMarkAsWatchedClick);
    this.#popupDetailsComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevFilmComponent === null) {
      render(this.#filmComponent, this.#filmListContainer);
      return;
    }

    if (this.#filmListContainer.contains(prevFilmComponent.element)) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    if (prevPopupDetailsComponent.element) {
      replace(this.#popupDetailsComponent, prevPopupDetailsComponent);
      remove(prevPopupDetailsComponent);
    }

    if (prevPopupCommentsComponent.element) {
      replace(this.#popupCommentsComponent, prevPopupCommentsComponent);
      this.#renderPopupNewComment();
      remove(prevPopupCommentsComponent);
    }

    remove(prevFilmComponent);
  };

  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#popupDetailsComponent);
    remove(this.#popupCommentsComponent);
  };

  #renderPopupWrapper = () => {
    render(this.#popupWrapperComponent, bodyElement);
  };

  #renderPopupForm = () => {
    render(this.#popupFormComponent, this.#popupWrapperComponent.element);
  };

  #renderPopupDetails = () => {
    render(this.#popupDetailsComponent, this.#popupFormComponent.element);
  };

  #renderPopupCommentsContainer = () => {
    render(this.#popupCommentsContainerComponent, this.#popupFormComponent.element);
  };

  #renderPopupComments = () => {
    render(this.#popupCommentsComponent, this.#popupCommentsContainerComponent.element);
  };

  #renderPopupNewComment = () => {
    render(this.#popupNewCommentComponent, this.#popupCommentsComponent.element);
  };

  #renderPopup = () => {
    this.#renderPopupWrapper();
    this.#renderPopupForm();
    this.#renderPopupDetails();
    this.#renderPopupCommentsContainer();
    this.#renderPopupComments();
    this.#renderPopupNewComment();
  };

  #showPopup = () => {
    bodyElement.classList.add('hide-overflow');
    this.#renderPopup();
  };

  #closePopup = () => {
    const popup = bodyElement.querySelector('.film-details');
    if(popup) {
      popup.remove();
      bodyElement.classList.remove('hide-overflow');
      this.#popupNewCommentComponent.reset();
    }
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleFilmCardClick = () => {
    this.#closePopup();
    this.#showPopup();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleCloseButtonClick = () => {
    this.#closePopup();
  };

  #handleAddToWatchlistClick = () => {
    this.#changeData({...this.#film, userDetails: {...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist}});
  };

  #handleMarkAsWatchedClick = () => {
    this.#changeData({...this.#film, userDetails: {...this.#film.userDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched}});
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#film, userDetails: {...this.#film.userDetails, favorite: !this.#film.userDetails.favorite}});
  };
}

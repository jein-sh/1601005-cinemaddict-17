import {render, replace, remove} from '../framework/render.js';
import FilmCardView from '../view/film-card-view';
import PopupPresenter from './popup-presenter.js';
import {UserAction, UpdateType} from '../const.js';

const bodyElement = document.querySelector('body');

export default class FilmPresenter {
  #filmListContainer = null;
  #filmComponent = null;
  #film = null;
  #changeData = null;
  #filmsModel = null;
  #commentsModel = null;
  #popupPresenter = null;

  constructor(filmListContainer, filmsModel, commentsModel, changeData) {
    this.#filmListContainer = filmListContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;

  }

  init = (film) => {
    this.#film = film;
    console.log('init', film.id)

    const prevFilmComponent = this.#filmComponent;

    this.#filmComponent = new FilmCardView(this.#film);

    this.#filmComponent.setFilmCardClickHandler(this.#handleFilmCardClick);
    this.#filmComponent.setAddToWatchlistClickHandler(this.#handleAddToWatchlistClick);
    this.#filmComponent.setMarkAsWatchedClickHandler(this.#handleMarkAsWatchedClick);
    this.#filmComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevFilmComponent === null) {
      render(this.#filmComponent, this.#filmListContainer);
      return;
    }

    if (this.#filmListContainer.contains(prevFilmComponent.element)) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);
  };

  destroy = () => {
    remove(this.#filmComponent);
  };

  setSaving = () => {
    this.#filmComponent.updateElement({
      isDisabled: true,
    });
  };

  setAborting = () => {
    this.#filmComponent.updateElement({
      isDisabled: false,
    });

    this.#filmComponent.shake(reset);
  };

  #renderPopup = () => {
    // this.#commentsModel.init(this.#film)
    this.#popupPresenter = new PopupPresenter(bodyElement, this.#commentsModel, this.#handleViewAction);
    this.#popupPresenter.init(this.#film);
    console.log('renderPopup', this.#popupPresenter, this.#film.id)
  };

  #rerenderPopup = () => {
    console.log('rerender', this.#popupPresenter)
    if(this.#popupPresenter) {
      this.#popupPresenter.init(this.#film);
      console.log('rerender with popupPresenter')
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    if (actionType === UserAction.UPDATE_FILM) {
      this.#filmsModel.updateFilm(updateType, update);
    }
    this.#popupPresenter.init(update);
  };

  #handleFilmCardClick = () => {
    this.#renderPopup();
  };

  #handleAddToWatchlistClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {...this.#film, userDetails: {...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist}}
    );
    console.log('handle', this.#popupPresenter, this.#film.userDetails.watchlist)
    this.#rerenderPopup();
  };

  #handleMarkAsWatchedClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this.#film, userDetails: {...this.#film.userDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched}}
    );

    this.#rerenderPopup();
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this.#film, userDetails: {...this.#film.userDetails, favorite: !this.#film.userDetails.favorite}}
    );

    this.#rerenderPopup();
  };
}

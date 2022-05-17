import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmListView from '../view/film-list-view.js';
import EmptyFilmListView from '../view/empty-film-list-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardView from '../view/film-card-view';
import PopupView from '../view/popup-view.js';

import {render} from '../render.js';

const bodyElement = document.querySelector('body');
const siteMainElement = document.querySelector('.main');

const FILM_COUNT_PER_STEP = 5;

export default class FilmPresenter {
  #filmsContainer = null;
  #filmCardsModel = null;
  #films = [];
  #comments = [];
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  #emptyFilmListComponent = new EmptyFilmListView();
  #filmsComponent = new FilmsView();
  #filmListComponent = new FilmListView();
  #filmListContainer = new FilmListContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  constructor (filmsContainer, filmCardsModel) {
    this.#filmsContainer = filmsContainer;
    this.#filmCardsModel = filmCardsModel;
  };

  init = () => {
    this.#films = [...this.#filmCardsModel.films];
    this.#comments = [...this.#filmCardsModel.comments];
    this.#renderFilmList();
  }

  #renderFilmList = () => {

    if (this.#films.length === 0) {
      render(this.#emptyFilmListComponent, siteMainElement);
    } else {
      render(new SortView(), siteMainElement);
      render(this.#filmsComponent, this.#filmsContainer);
      render(this.#filmListComponent, this.#filmsComponent.element);
      render(this.#filmListContainer, this.#filmListComponent.element);

      for (let i = 0; i < Math.min(this.#films.length, FILM_COUNT_PER_STEP); i++) {
        this.#renderFilm(this.#films[i]);
      }

      if (this.#films.length > FILM_COUNT_PER_STEP) {
        render(this.#showMoreButtonComponent, this.#filmListComponent.element);

        this.#showMoreButtonComponent.element.addEventListener('click', this.#onShowMoreButtonClick);
      }
    }
  };

  #renderFilm = (film) => {
    const filmComponent = new FilmCardView(film);
    const popupComponent = new PopupView(film, this.#comments);

    const showPopup = () => {

      bodyElement.appendChild(popupComponent.element);
    };

    const closePopup = () => {
      bodyElement.querySelector('.film-details').remove();
      bodyElement.classList.remove('hide-overflow');
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    filmComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      showPopup();
      bodyElement.classList.add('hide-overflow');
      document.addEventListener('keydown', onEscKeyDown);
    });

    popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      closePopup();
    });

    render(filmComponent, this.#filmListContainer.element);
  };

  #onShowMoreButtonClick = (evt) => {
    evt.preventDefault();
    this.#films
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };
}

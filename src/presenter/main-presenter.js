import {render, RenderPosition, remove} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import FilmsWrapperView from '../view/films-wrapper-view.js';
import FilmListView from '../view/film-list-view.js';
import EmptyFilmListView from '../view/empty-film-list-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmPresenter from './film-presenter.js';
import { updateItem } from '../untils.js';

const FILM_COUNT_PER_STEP = 5;
const siteMainElement = document.querySelector('.main');

export default class MainPresenter {
  #container = null;
  #filmCardsModel = null;
  #films = [];
  #filmPresenter = new Map();
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  #emptyFilmListComponent = new EmptyFilmListView();
  #filmsWrapperComponent = new FilmsWrapperView();
  #filmListComponent = new FilmListView();
  #filmListContainerComponent = new FilmListContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  constructor (container, filmCardsModel) {
    this.#container = container;
    this.#filmCardsModel = filmCardsModel;
  }

  init = () => {
    this.#films = [...this.#filmCardsModel.films];
    this.#renderFilmsContent();
  };

  #renderEmptyFilmList = () => {
    render(this.#emptyFilmListComponent, siteMainElement);
  };

  #renderSort = () => {
    render(new SortView(), this.#filmsWrapperComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderFilmsWrapper = () => {
    render(this.#filmsWrapperComponent, this.#container);
  };

  #renderFilmList = () => {
    render(this.#filmListComponent, this.#filmsWrapperComponent.element);
  };

  #renderFilmListContainer = () => {
    render(this.#filmListContainerComponent, this.#filmListComponent.element);
  };

  #renderShowMoreButton = () => {
    render(this.#showMoreButtonComponent, this.#filmListComponent.element);
    this.#showMoreButtonComponent.setClickHandler(this.#onShowMoreButtonClick);
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmListContainerComponent.element, this.#filmCardsModel, this.#handleFilmChange);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #renderFilms = (from, to) => {

    this.#films
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film));
  };

  #renderFilmsContent = () => {

    if (this.#films.length === 0) {
      this.#renderEmptyFilmList();

    } else {
      this.#renderSort();
      this.#renderFilmsWrapper();
      this.#renderFilmList();
      this.#renderFilmListContainer();
      this.#renderFilms(0, Math.min(this.#films.length, FILM_COUNT_PER_STEP));

      if (this.#films.length > FILM_COUNT_PER_STEP) {
        this.#renderShowMoreButton();
      }
    }
  };

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  };

  #handleFilmChange = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  };

  #onShowMoreButtonClick = () => {
    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      remove(this.#showMoreButtonComponent);
    }
  };
}

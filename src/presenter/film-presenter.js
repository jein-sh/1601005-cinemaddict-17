import FilmsView from '../view/films-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardView from '../view/film-card-view';
import PopupView from '../view/popup-view.js';

import {render} from '../render.js';

const bodyElement = document.querySelector('body');

export default class FilmPresenter {
  #filmsContainer = null;
  #filmCardsModel = null;
  #films = [];
  #comments =[];

  #filmsComponent = new FilmsView();
  #filmListComponent = new FilmListView();
  #filmListContainer = new FilmListContainerView();

  init = (filmsContainer, filmCardsModel) => {
    this.#filmsContainer = filmsContainer;
    this.#filmCardsModel = filmCardsModel;
    this.#films = [...this.#filmCardsModel.films];
    this.#comments = [...this.#filmCardsModel.comments];

    render(this.#filmsComponent, this.#filmsContainer);
    render(this.#filmListComponent, this.#filmsComponent.element);
    render(this.#filmListContainer, this.#filmListComponent.element);

    for (let i = 0; i < this.#films.length; i++) {
      this.#renderFilm(this.#films[i]);
    }

    render(new ShowMoreButtonView(), this.#filmListComponent.element);
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
}

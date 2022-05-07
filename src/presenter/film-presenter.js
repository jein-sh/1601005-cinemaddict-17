import FilmsView from '../view/films-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardView from '../view/film-card-view';
import PopupView from '../view/popup-view.js';

import {render} from '../render.js';

export default class FilmPresenter {
  filmsComponent = new FilmsView();
  filmListComponent = new FilmListView();
  filmListContainer = new FilmListContainerView();

  init = (filmsContainer, filmCardsModel) => {
    this.filmsContainer = filmsContainer;
    this.filmCardsModel = filmCardsModel;
    this.films = [...this.filmCardsModel.getFilms()];
    this.comments = [...this.filmCardsModel.getComments()];

    render(this.filmsComponent, this.filmsContainer);
    render(this.filmListComponent, this.filmsComponent.getElement());
    render(this.filmListContainer, this.filmListComponent.getElement());

    for (let i = 0; i < this.films.length; i++) {
      render(new FilmCardView(this.films[i]), this.filmListContainer.getElement());
      render(new PopupView(this.films[i], this.comments), this.filmsComponent.getElement());
    }

    render(new ShowMoreButtonView(), this.filmsComponent.getElement());
  };
}

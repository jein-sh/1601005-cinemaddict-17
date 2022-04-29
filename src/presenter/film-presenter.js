import FilmsView from '../view/films-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardView from '../view/film-card-view';

import {render} from '../render.js';

export default class FilmPresenter {
  filmsComponent = new FilmsView();
  filmListComponent = new FilmListView();
  filmListContainer = new FilmListContainerView();

  init = (filmsContainer) => {
    this.filmsContainer = filmsContainer;

    render(this.filmsComponent, this.filmsContainer);
    render(this.filmListComponent, this.filmsComponent.getElement());
    render(this.filmListContainer, this.filmListComponent.getElement());

    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), this.filmListContainer.getElement());
    }

    render(new ShowMoreButtonView(), this.filmsComponent.getElement());
  };
}

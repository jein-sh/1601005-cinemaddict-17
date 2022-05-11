import ProfileView from './view/profile.view';
import FilterView from './view/filter-view';
import SortView from './view/sort-view';
import FilmStatisticsView from './view/film-statistics-view';
import FilmPresenter from './presenter/film-presenter.js';
import FilmCardsModel from './model/films-model.js';
import {render} from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const filmPresenter = new FilmPresenter();
const filmsModel = new FilmCardsModel();

render(new ProfileView(), siteHeaderElement);
render(new FilterView(), siteMainElement);
render(new SortView(), siteMainElement);
filmPresenter.init(siteMainElement, filmsModel);
render(new FilmStatisticsView(), siteFooterElement);

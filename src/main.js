import ProfileView from './view/profile.view';
import FilterView from './view/filter-view';
import FilmStatisticsView from './view/film-statistics-view';
import MainPresenter from './presenter/main-presenter.js';
import FilmCardsModel from './model/films-model.js';
import {render} from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const filmsModel = new FilmCardsModel();
const mainPresenter = new MainPresenter(siteMainElement, filmsModel);


render(new ProfileView(), siteHeaderElement);
render(new FilterView(), siteMainElement);
mainPresenter.init();
render(new FilmStatisticsView(), siteFooterElement);

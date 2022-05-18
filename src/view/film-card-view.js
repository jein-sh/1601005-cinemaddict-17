import AbstractView from '../framework/view/abstract-view.js';
import {yearDate, timeInHours} from '../untils.js';

const createFilmCardTemplate = (film) => {

  const {filmInfo: {title, poster, totalRating, runtime, release: {date}, genres, description}, userDetails: {watchlist, alreadyWatched, favorite}} = film;

  const releaseData = yearDate(date);

  const mainGenre = genres[0];
  const time = timeInHours(runtime);


  const activeClassName = (control) => control
    ? ''
    : 'film-card__controls-item--active';


  return (
    `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseData}</span>
        <span class="film-card__duration">${time}</span>
        <span class="film-card__genre">${mainGenre}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <span class="film-card__comments">5 comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${activeClassName(watchlist)}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${activeClassName(alreadyWatched)}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${activeClassName(favorite)}" type="button">Mark as favorite</button>
    </div>
    </article>`
  );
};

export default class FilmCardView extends AbstractView{

  #film =null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  setFilmCardClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#filmCardClickHandler);
  };

  #filmCardClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };
}

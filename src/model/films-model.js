import { generateComment } from '../mock/comment.js';
import {generateFilm} from '../mock/film-card.js';

export default class FilmCardsModel {
  #films = Array.from({length: 15}, generateFilm);
  #comments =Array.from({length: 100}, generateComment);

  get films() {
    return this.#films;
  }

  get comments() {
    return this.#comments;
  }
}

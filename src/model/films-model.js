import { generateComment } from '../mock/comment.js';
import {generateFilm} from '../mock/film-card.js';

export default class FilmCardsModel {
  films = Array.from({length: 15}, generateFilm);
  comments =Array.from({length: 100}, generateComment);

  getFilms = () => this.films;
  getComments = () => this.comments;
}
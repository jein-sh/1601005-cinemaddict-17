import AbstractView from '../framework/view/abstract-view.js';
import { humanizeCommentDate } from '../untils.js';

const createCommentsListTemplate = (comments) => {

  let commentsList = '';

  comments.forEach((comment) => {
    const commentDate = humanizeCommentDate(comment.dateComment);

    commentsList +=
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${commentDate}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
  });

  return commentsList;
};


const createPopupCommentsTemplate = (comments) => {

  const commentsList = createCommentsListTemplate(comments);

  return (
    `<section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
      <ul class="film-details__comments-list">${commentsList}</ul>
    </section>`
  );
};

export default class PopupCommentsView extends AbstractView {
  #comments = null;

  constructor(comments) {
    super();
    this.#comments = comments;
  }

  get template() {
    return createPopupCommentsTemplate(this.#comments);
  }
}

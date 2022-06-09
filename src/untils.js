import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));

  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
}

const getRandomArray = (elements, maxLength = elements.length) => {
  const lengthArray = getRandomInteger(1, maxLength);
  const array = [];

  for (let i=0; i < lengthArray; i++) {
    const element = elements[getRandomInteger(0, maxLength - 1)];

    if (!array.includes(element)) {
      array.push(element);
    }
  }
  return array;
};

const humanizeDate = (date) => dayjs(date).format('D MMMM YYYY');

const yearDate = (date) => dayjs(date).format('YYYY');

const humanizeCommentDate = (date) => dayjs().to(date);

const timeInHours = (time) => dayjs.duration(time, 'm').format('H[h] mm[m]');

const sortFilmDate = (filmA, filmB) => {

  const {filmInfo: {release: {date: dateFilmA}}} = filmA;
  const {filmInfo: {release: {date: dateFilmB}}} = filmB;

  return dayjs(dateFilmB).diff(dayjs(dateFilmA));
};

const sortFilmRating = (filmA, filmB) => {
  const {filmInfo: {totalRating: ratingFilmA}} = filmA;
  const {filmInfo: {totalRating: ratingFilmB}} = filmB;

  return ratingFilmB - ratingFilmA;
};

export {getRandomArray, getRandomInteger, getRandomPositiveFloat, humanizeDate, humanizeCommentDate, yearDate, timeInHours, sortFilmDate, sortFilmRating};

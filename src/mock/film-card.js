import { getRandomInteger, getRandomPositiveFloat, getRandomArray } from '../untils';
import {nanoid} from 'nanoid';

const generateTitle = () => {
  const titles = [
    'Made for Each Other',
    'Santa Claus Conquers the Martians',
    'The Great Flamarion',
    'The Man with the Golden Arm',
    'Popeye the Sailor Meets Sindbad the Sailor',
    'Sagebrush Trail',
    'The Dance of Life',
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generatePoster = () => {
  const posters = [
    'images/posters/made-for-each-other.png',
    'images/posters/popeye-meets-sinbad.png',
    'images/posters/sagebrush-trail.jpg',
    'images/posters/santa-claus-conquers-the-martians.jpg',
    'images/posters/the-dance-of-life.jpg',
    'images/posters/the-great-flamarion.jpg',
    'images/posters/the-man-with-the-golden-arm.jpg',
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

const generateGenres = () => {
  const genres = [
    'comedy',
    'drama',
    'mystery',
    'cartoon',
    'western',
    'musical',
  ];

  return getRandomArray(genres, 3);
};

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
  ];

  return getRandomArray(descriptions);
};

const generateFilm = () => ({
  id: nanoid(),
  filmInfo: {
    title: generateTitle(),
    alternativeTitle: generateTitle(),
    totalRating: getRandomPositiveFloat(0, 10, 1),
    poster: generatePoster(),
    ageRating: 0,
    director: 'Tom Ford',
    writers: [
      'Anne Wigton, Heinz Herald, Richard Weil',
    ],
    actors: [
      'Erich von Stroheim, Mary Beth Hughes, Dan Duryea',
    ],
    release: {
      date: getRandomInteger(0, Date.now()),
      releaseCountry: 'Finland',
    },
    runtime: 77,
    genres: generateGenres(),
    description: generateDescription(),
  },
  userDetails: {
    watchlist: Boolean(getRandomInteger(0, 1)),
    alreadyWatched: Boolean(getRandomInteger(0, 1)),
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: Boolean(getRandomInteger(0, 1)),
  }
});

export {generateFilm};

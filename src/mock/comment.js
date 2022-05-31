import { getRandomInteger } from '../untils';

const generateCommentEmotion = () => {
  const emotions = [
    'smile',
    'sleeping',
    'puke',
    'angry',
  ];

  const randomIndex = getRandomInteger(0, emotions.length - 1);

  return emotions[randomIndex];
};

const generateComment = () => ({
  id: '42',
  author: 'Ilya OReilly',
  text: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
  dateComment: getRandomInteger( 1577836800000 , Date.now()),
  emotion: generateCommentEmotion(),
});

export {generateComment};

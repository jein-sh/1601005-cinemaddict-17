import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
// dayjs.extend(relativeTime);

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

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

const humanizeCommentDate = (date) => dayjs(date).format('YYYY/MM/DD HH:mm');

//   const dateCommentToNow =
//   ....
//   ? dayjs(date).format('YYYY/MM/DD HH:mm')
//   : dayjs().to(dayjs(date))


const timeInHours = (timeInMinutes) => {
  const hours = Math.trunc(timeInMinutes/60);
  const minutes = timeInMinutes % 60;
  return `${hours}h ${minutes}m`;
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export {getRandomArray, getRandomInteger, humanizeDate, humanizeCommentDate, yearDate, timeInHours, updateItem};

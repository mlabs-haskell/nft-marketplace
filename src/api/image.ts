import axios from 'axios';
import { makeMockHash } from 'seabug-sdk/src/mocks';

export const getImage = async () => {
  // const response = await axios.get('images');
  // return response;

  // mock construction
  const mock = [];

  for (let i = 0; i < 1000; i += 1) {
    let path = '';
    if (i % 2 === 1) {
      path = 'https://picsum.photos/200/200';
    } else if (i % 3 === 1) {
      path = 'https://picsum.photos/200/300';
    } else {
      path = 'https://picsum.photos/200/250';
    }

    mock.push({
      sha256hash: makeMockHash('aa00000000', i),
      path,
      createdAt: new Date(),
      id: i + new Date().getTime(),
      title:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos',
    });
  }

  return mock;
};

export const addImage = async (payload: { image: string; title: string }) => {
  const response = await axios.post('images', payload);
  return response;
};

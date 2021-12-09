import axios from 'axios';
import { makeMockHash } from 'seabug-sdk/src/mocks';

export const getImage = async () => {
  // const response = await axios.get('images');
  // return response;

  // mock construction

  const getRandomHeight = () => Math.round(250 + Math.random() * 500);

  return [...Array(1000).keys()].map((i) => ({
    sha256hash: makeMockHash('aa00000000', i),
    path: `https://picsum.photos/id/${i}/500/${getRandomHeight()}`,
    createdAt: new Date(),
    id: i + new Date().getTime(),
    title: `NFT ${i}: Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos`,
  }));
};

export const addImage = async (payload: { image: string; title: string }) => {
  const response = await axios.post('images', payload);
  return response;
};

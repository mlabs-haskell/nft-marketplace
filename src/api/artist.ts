import axios from 'axios';

export const getArtist = () => {
  const mock = {
    data: [
      {
        name: 'By Hennkok 1',
        createdAt: '2021-11-25T13:16:49.023987Z',
        pubKeyHash: 'abc',
        id: '1',
        imagePath: 'https://picsum.photos/500/500',
      },
      {
        name: 'By Hennkok 2',
        createdAt: '2021-11-25T13:16:49.023987Z',
        pubKeyHash: 'abc',
        id: '1',
        imagePath: 'https://picsum.photos/500/500',
      },
      {
        name: 'By Hennkok 3',
        createdAt: '2021-11-25T13:16:49.023987Z',
        pubKeyHash: 'abc',
        id: '1',
        imagePath: 'https://picsum.photos/500/500',
      },
      {
        name: 'By Hennkok 4',
        createdAt: '2021-11-25T13:16:49.023987Z',
        pubKeyHash: 'abc',
        id: '1',
        imagePath: 'https://picsum.photos/500/500',
      },
      {
        name: 'By Hennkok 5',
        createdAt: '2021-11-25T13:16:49.023987Z',
        pubKeyHash: 'abc',
        id: '1',
        imagePath: 'https://picsum.photos/500/500',
      },
      {
        name: 'By Hennkok 6',
        createdAt: '2021-11-25T13:16:49.023987Z',
        pubKeyHash: 'abc',
        id: '1',
        imagePath: 'https://picsum.photos/500/500',
      },
      {
        name: 'By Hennkok 7',
        createdAt: '2021-11-25T13:16:49.023987Z',
        pubKeyHash: 'abc',
        id: '1',
        imagePath: 'https://picsum.photos/500/500',
      },
      {
        name: 'By Hennkok 8',
        createdAt: '2021-11-25T13:16:49.023987Z',
        pubKeyHash: 'abc',
        id: '1',
        imagePath: 'https://picsum.photos/500/500',
      },
      {
        name: 'By Hennkok 9',
        createdAt: '2021-11-25T13:16:49.023987Z',
        pubKeyHash: 'abc',
        id: '1',
        imagePath: 'https://picsum.photos/500/500',
      },
      {
        name: 'By Hennkok 10',
        createdAt: '2021-11-25T13:16:49.023987Z',
        pubKeyHash: 'abc',
        id: '1',
        imagePath: 'https://picsum.photos/500/500',
      },
    ],
  };

  return mock;
};

export const getArtistbyId = async (id: string) => {
  const response = await axios.get(`artists/${id}`);
  return response;
};

import axios from 'axios';

export const getArtist = () => {
  const mock = {
    data: [
      {
        title: 'Meelo',
        name: 'By Hennkok',
        imagePath: 'https://picsum.photos/500/500',
      },
      {
        title: 'Meelo',
        name: 'By Hennkok',
        imagePath: 'https://picsum.photos/500/500',
      },
      {
        title: 'Meelo',
        name: 'By Hennkok',
        imagePath: 'https://picsum.photos/500/500',
      },
      {
        title: 'Meelo',
        name: 'By Hennkok',
        imagePath: 'https://picsum.photos/500/500',
      },
      {
        title: 'Meelo',
        name: 'By Hennkok',
        imagePath: 'https://picsum.photos/500/500',
      },
      {
        title: 'Meelo',
        name: 'By Hennkok',
        imagePath: 'https://picsum.photos/500/500',
      },
      {
        title: 'Meelo',
        name: 'By Hennkok',
        imagePath: 'https://picsum.photos/500/500',
      },
      {
        title: 'Meelo',
        name: 'By Hennkok',
        imagePath: 'https://picsum.photos/500/500',
      },
      {
        title: 'Meelo',
        name: 'By Hennkok',
        imagePath: 'https://picsum.photos/500/500',
      },
      {
        title: 'Meelo',
        name: 'By Hennkok',
        imagePath: 'https://picsum.photos/500/500',
      },
      {
        title: 'Meelo',
        name: 'By Hennkok',
        imagePath: 'https://picsum.photos/500/500',
      },
      {
        title: 'Meelo',
        name: 'By Hennkok',
        imagePath: 'https://picsum.photos/500/500',
      },
      {
        title: 'Meelo',
        name: 'By Hennkok',
        imagePath: 'https://picsum.photos/500/500',
      },
      {
        title: 'Meelo',
        name: 'By Hennkok',
        imagePath: 'https://picsum.photos/500/500',
      },
      {
        title: 'Meelo',
        name: 'By Hennkok',
        imagePath: 'https://picsum.photos/500/500',
      },
      {
        title: 'Meelo',
        name: 'By Hennkok',
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

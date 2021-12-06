import axios from 'axios';

export const getImage = async (skip = 0, limit = 0) => {
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

    const baseHash = 'aa00000000';

    mock.push({
      sha256hash:
        baseHash.substring(0, baseHash.length - i.toString().length) +
        i.toString(),
      path,
      createdAt: new Date(),
      id: i + new Date().getTime(),
      title:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos',
    });
  }

  if (skip || limit) {
    const limitMock = [];
    for (let p = skip; p <= limit + skip; p += 1) {
      if (p >= mock.length) {
        return limitMock;
      }
      limitMock.push(mock[p]);
    }
    return limitMock;
  }

  return mock;
};

export const addImage = async (payload: { image: string; title: string }) => {
  const response = await axios.post('images', payload);
  return response;
};

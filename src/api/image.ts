import axios from 'axios';
import { ImagesType } from 'types/images';

export const getImages = async () => {
  const { data } = await axios.get<ImagesType.Image[]>('images');
  return data;
};

export const addImage = async (payload: { image: string; title: string }) => {
  const response = await axios.post<ImagesType.AddImageResponse>(
    'images',
    payload
  );
  return response;
};

import axios from 'axios';
import { AddImageResponse, ImageResponse } from 'types/images';

export const getImages = async () => {
  const { data } = await axios.get<ImageResponse>('images');
  return data;
};

export const addImage = async (payload: { image: string; title: string }) => {
  const response = await axios.post<AddImageResponse>('images', payload);
  return response;
};

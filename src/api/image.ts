import axios from 'axios';
import { AddImageResponse, AxiosImageResponse } from 'types/images';

export const getImages = async (range?: string) => {
  const { data, headers }: AxiosImageResponse = await axios.get('images', {
    headers: range ? { range } : {},
  });

  return { images: data, nextRange: headers['next-range'] };
};

export const addImage = async (payload: { image: string; title: string }) => {
  const response = await axios.post<AddImageResponse>('images', payload);
  return response;
};

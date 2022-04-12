import { Artist, AxiosArtistResponse } from 'types/artists';
import axios from 'axios';

// TODO: allow pagination to be controlled via arguments
export const getArtists = async (range?: string) => {
  const { data, headers }: AxiosArtistResponse = await axios.get(`artists`, {
    headers: range ? { range } : {},
  });

  return { artists: data, nextRange: headers['next-range'] };
};

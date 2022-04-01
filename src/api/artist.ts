import { Artist } from 'types/artists';
import axios from 'axios';

export const getArtists = async () => {
  const { data } = await axios.get<Artist[]>('artists');
  return data;
};

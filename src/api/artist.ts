import { ArtistsType } from 'types/artists';
import axios from 'axios';

export const getArtists = async () => {
  const { data } = await axios.get<ArtistsType.Artist[]>('artists');
  return data;
};

import { ArtistsType } from 'types/artists';

const baseHash = 'ff00000000';

const makeMockArtists = (count: number): ArtistsType.Artist[] =>
  [...Array(count).keys()].map((idNum) => {
    const id = idNum.toString();
    return {
      name: `Hennkok ${id}`,
      createdAt: new Date(),
      pubKeyHash: baseHash.substring(0, baseHash.length - id.length) + id,
      id,
      imagePath: `https://picsum.photos/id/${idNum * 11}/500/500`,
    };
  });

export const getArtist = (): Promise<ArtistsType.Artist[]> =>
  Promise.resolve(makeMockArtists(22));

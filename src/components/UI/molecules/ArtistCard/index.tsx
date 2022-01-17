/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useState, useMemo } from 'react';
import classNames from 'classnames';
import { useNftContext } from 'context/NftContext';
import { InformationNft } from 'seabug-sdk/src/common';
import { Link } from 'react-router-dom';
import { ArtistsType } from 'types/artists';
import { ImageType } from 'types/image';
import Box from '../../atoms/Box';
import styles from './index.module.scss';

interface Props extends ArtistsType.Artist {
  className?: string;
}

const ArtistCard = ({ name, className, id, pubKeyHash }: Props) => {
  const isLight = true;
  const { nfts, images } = useNftContext();

  const getNfts = (key: string) =>
    nfts.list.filter((items) => items.author.pubKeyHash === key);

  const getImages = (example: InformationNft[]) => {
    const random = Math.floor(Math.random() * example.length);

    return images.list.filter(
      (items) => items.sha256hash === example[random]?.id?.contentHash
    );
  };

  const artistNfts = useMemo(() => getNfts(pubKeyHash), [pubKeyHash]);
  const artistImages = useMemo(() => getImages(artistNfts), [artistNfts]);

  return (
    <Link to={`artist/${id}`}>
      <Box
        boxClass={classNames(styles.container, className)}
        style={{
          backgroundImage: `url(${artistImages[0]?.path})`,
        }}
      >
        <h4
          className={styles.title}
          style={{ color: isLight ? `white` : 'black' }}
        >
          {name}
        </h4>
      </Box>
    </Link>
  );
};

export default ArtistCard;

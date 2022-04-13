import { useMemo } from 'react';
import classNames from 'classnames';
import { useNftContext } from 'context/NftContext';
import { Link } from 'react-router-dom';
import { Artist } from 'types/artists';
import { NftListing } from 'cardano-transaction-lib-seabug';
import Box from '../../atoms/Box';
import styles from './index.module.scss';

interface Props extends Artist {
  className?: string;
}

const ArtistCard = ({ name, className, id, pubKeyHash }: Props) => {
  const isLight = true;
  const { nfts, images } = useNftContext();

  const getImages = (artistNfts: NftListing[] | undefined) => {
    if (!artistNfts) return [];

    const random = Math.floor(Math.random() * artistNfts.length);
    return images.list.filter(
      (items) => items.sha256hash === artistNfts[random]?.metadata.ipfsHash
    );
  };
  const artistNfts = nfts.getByPubKeyHash(pubKeyHash);
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

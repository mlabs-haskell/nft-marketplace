import { useMemo } from 'react';
import classNames from 'classnames';
import { useNftContext } from 'context/NftContext';
import { Link } from 'react-router-dom';
import { Artist } from 'types/artists';
import { Nft } from 'types/nfts';
import { getAppConfig } from 'utils/appConfig';
import Box from '../../atoms/Box';
import styles from './index.module.scss';

interface ArtistProps {
  artist: Artist;
  className?: string;
}

const ArtistCard = ({ artist, className }: ArtistProps) => {
  const ipfsBaseUrl = getAppConfig().ipfs.baseUrl;
  const isLight = true;
  const { nfts } = useNftContext();

  const artistNfts = nfts.getByPubKeyHash(artist.pubKeyHash) ?? [];
  const nft = artistNfts[Math.floor(Math.random() * artistNfts.length)];

  return (
    <Link to={`artist/${artist.id}`}>
      <Box
        boxClass={classNames(styles.container, className)}
        style={{
          backgroundImage: `url(${ipfsBaseUrl}${nft?.ipfsHash})`,
        }}
      >
        <h4
          className={styles.title}
          style={{ color: isLight ? `white` : 'black' }}
        >
          {artist.name}
        </h4>
      </Box>
    </Link>
  );
};

export default ArtistCard;

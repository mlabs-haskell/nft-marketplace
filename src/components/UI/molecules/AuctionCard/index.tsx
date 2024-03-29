import { Link } from 'react-router-dom';
import { priceToADA } from 'utils/priceToADA';
import dots from 'assets/svg/dots.svg';
import { useEffect, useState } from 'react';
import { useNftContext } from 'context/NftContext';
import { formatTimeLiveAuction } from 'components/Util/formatTime';
import { Image } from 'types/images';
import { getAppConfig } from 'utils/appConfig';
import { Nft } from 'types/nfts';
import Box from '../../atoms/Box';
import styles from './index.module.scss';

interface Props {
  nft?: Nft;
  image?: Image;
}

const AuctionCard = ({ nft, image }: Props) => {
  const [refresh, setRefresh] = useState(false);
  const { common } = useNftContext();
  const imagePath = getAppConfig().ipfs.baseUrl;

  // TODO: Implement or remove
  const calcRemainingTime = (): number | undefined => {
    return undefined;
  };

  const [timeRemaining, setTimeRemaining] = useState(calcRemainingTime());

  useEffect(() => {
    setInterval(() => {
      setTimeRemaining(calcRemainingTime());
    }, 1000);
  }, []);

  const price = nft ? priceToADA(nft.metadata.ownerPrice) : '';

  const handleRefresh = (e: any) => {
    setRefresh(false);
    e.stopPropagation();
    common.fetchAll();
  };

  return (
    <Box boxClass={styles.container}>
      <div className={styles.header}>
        <div className={styles['header-text']}>
          <p className={styles.title}>{image?.title ?? ''}</p>
          <div className={styles['span-container']}>
            {/* <span className={styles.span}>
              <img src="https://picsum.photos/id/33/32/32" alt="avatar" className={styles.avatar} />
            </span> */}
            <span
              className={styles.span}
              role="presentation"
              onClick={() => setRefresh(true)}
            >
              <img src={dots} className={styles.dots} alt="more" />
              {refresh ? (
                <Box boxClass={styles.option}>
                  <ul onClick={(e) => handleRefresh(e)} role="presentation">
                    <li>Refresh</li>
                  </ul>
                </Box>
              ) : (
                ''
              )}
            </span>
          </div>
        </div>
      </div>
      <Link to={`/itempage/${nft?.ipfsHash ?? ''}`}>
        <div className={styles.image}>
          <img src={`${imagePath}${nft?.ipfsHash}`} alt="nft-item" />
          {timeRemaining && (
            <div className={styles['time-wrapper']}>
              <span className={styles.time}>
                {formatTimeLiveAuction(timeRemaining)}
              </span>
            </div>
          )}
        </div>
      </Link>
      <div className={styles.footer}>
        <div className={styles.amount}>
          <h3>{price}</h3>
        </div>
        <div className={styles.bid}>
          <p />
          {/* <div className={styles['likes-wrapper']}>
            <p className={styles['bid-value']}>{likes}</p>
            <img src={liked ? filled : heart} alt="heart" onClick={() => setLiked(!liked)}></img>
          </div> */}
        </div>
      </div>
      {refresh && (
        <div
          className={styles.layer}
          onClick={() => setRefresh(false)}
          role="button"
          tabIndex={0}
        />
      )}
    </Box>
  );
};

export default AuctionCard;

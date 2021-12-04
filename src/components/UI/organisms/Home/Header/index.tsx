import { ArtistsType } from 'types/artists';
import CaptionCard from '../../../molecules/CaptionCard';
import Slider from '../../../molecules/Slider';
import styles from './index.module.scss';

interface Props {
  artists: ArtistsType.Artist[];
}

const Header = (props: Props) => {
  const { artists } = props;
  console.log('artists', artists);

  // const separateArtists = () => {
  //   if (!artists?.length) return

  //   const size = 7;
  //   let result = [];
  //   for (let i = 0; i < Math.ceil(artists.length / size); i++) {
  //     console.log(artists.slice((i * size), (i * size) + size))
  //     result[i] = artists.slice((i * size), (i * size) + size);
  //   }

  //   return result
  // }

  // separateArtists();

  return (
    <div className={styles.contatiner}>
      <Slider show={1}>
        <div className={styles.slide}>
          <div className={styles['big-card-wrapper']}>
            <CaptionCard name="By Hennkok" className={styles.card} />
          </div>
          <div className={styles['small-cards-wrapper']}>
            <CaptionCard name="By Hennkok" className={styles.card} />
            <CaptionCard name="By Hennkok" className={styles.card} />
            <CaptionCard name="By Hennkok" className={styles.card} />
            <CaptionCard name="By Hennkok" className={styles.card} />
            <CaptionCard name="By Hennkok" className={styles.card} />
            <CaptionCard name="By Hennkok" className={styles.card} />
          </div>
        </div>
        <div className={styles.slide}>
          <div className={styles['big-card-wrapper']}>
            <CaptionCard name="By Hennkok" className={styles.card} />
          </div>
          <div className={styles['small-cards-wrapper']}>
            <CaptionCard name="By Hennkok" className={styles.card} />
            <CaptionCard name="By Hennkok" className={styles.card} />
            <CaptionCard name="By Hennkok" className={styles.card} />
            <CaptionCard name="By Hennkok" className={styles.card} />
            <CaptionCard name="By Hennkok" className={styles.card} />
            <CaptionCard name="By Hennkok" className={styles.card} />
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Header;

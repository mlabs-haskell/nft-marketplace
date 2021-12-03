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
            <CaptionCard
              title="Meelo"
              name="By Hennkok"
              className={styles.card}
              imagePath="https://picsum.photos/500/500"
            />
          </div>
          <div className={styles['small-cards-wrapper']}>
            <CaptionCard
              title="Meelo"
              name="By Hennkok"
              className={styles.card}
              imagePath="https://picsum.photos/300/300"
            />
            <CaptionCard
              title="Meelo"
              name="By Hennkok"
              className={styles.card}
              imagePath="https://picsum.photos/300/300"
            />
            <CaptionCard
              title="Meelo"
              name="By Hennkok"
              className={styles.card}
              imagePath="https://picsum.photos/300/300"
            />
            <CaptionCard
              title="Meelo"
              name="By Hennkok"
              className={styles.card}
              imagePath="https://picsum.photos/300/300"
            />
            <CaptionCard
              title="Meelo"
              name="By Hennkok"
              className={styles.card}
              imagePath="https://picsum.photos/300/300"
            />
            <CaptionCard
              title="Meelo"
              name="By Hennkok"
              className={styles.card}
              imagePath="https://picsum.photos/300/300"
            />
          </div>
        </div>
        <div className={styles.slide}>
          <div className={styles['big-card-wrapper']}>
            <CaptionCard
              title="Meelo"
              name="By Hennkok"
              className={styles.card}
              imagePath="https://picsum.photos/500/500"
            />
          </div>
          <div className={styles['small-cards-wrapper']}>
            <CaptionCard
              title="Meelo"
              name="By Hennkok"
              className={styles.card}
              imagePath="https://picsum.photos/300/300"
            />
            <CaptionCard
              title="Meelo"
              name="By Hennkok"
              className={styles.card}
              imagePath="https://picsum.photos/300/300"
            />
            <CaptionCard
              title="Meelo"
              name="By Hennkok"
              className={styles.card}
              imagePath="https://picsum.photos/300/300"
            />
            <CaptionCard
              title="Meelo"
              name="By Hennkok"
              className={styles.card}
              imagePath="https://picsum.photos/300/300"
            />
            <CaptionCard
              title="Meelo"
              name="By Hennkok"
              className={styles.card}
              imagePath="https://picsum.photos/300/300"
            />
            <CaptionCard
              title="Meelo"
              name="By Hennkok"
              className={styles.card}
              imagePath="https://picsum.photos/300/300"
            />
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Header;

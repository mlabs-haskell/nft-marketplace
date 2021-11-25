/* eslint-disable */
import CaptionCard from '../../../molecules/CaptionCard';
import Slider from '../../../molecules/Slider';
import styles from './index.module.scss';

const Header = () => {
  return (
    <div className={styles.contatiner}>
      <Slider show={1}>
        <div className={styles.slide}>
          <div className={styles["big-card-wrapper"]}>
            <CaptionCard
              title="Meelo"
              name="By Hennkok"
              className={styles.card}
              imagePath="https://picsum.photos/500/500"
            />
          </div>
          <div className={styles["small-cards-wrapper"]}>
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
          <div className={styles["big-card-wrapper"]}>
            <CaptionCard
              title="Meelo"
              name="By Hennkok"
              className={styles.card}
              imagePath="https://picsum.photos/500/500"
            />
          </div>
          <div className={styles["small-cards-wrapper"]}>
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

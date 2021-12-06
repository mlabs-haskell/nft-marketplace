import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';
import { ArtistsType } from 'types/artists';
import CaptionCard from '../../../molecules/CaptionCard';
import styles from './index.module.scss';
import { separateArrayByArrays } from '../../../../../utils/separateArrayByArrays';

interface Props {
  artists: ArtistsType.Artist[];
}

const Header = (props: Props) => {
  const { artists } = props;

  const renderBigSlide = () => {
    if (!artists?.length) return null;
    return (
      <SwiperSlide>
        <div className={styles['big-card-wrapper']}>
          <CaptionCard {...artists[0]} className={styles['card-big']} />
        </div>
      </SwiperSlide>
    );
  };

  const renderSmallSlides = () => {
    if (!artists?.length) return null;

    const withoutFirst = artists.filter((item, counter) => counter !== 0);
    const separatedArray = separateArrayByArrays(withoutFirst, 2);

    return separatedArray.map((subArray) => (
      <SwiperSlide key={uuidv4()}>
        <div className={styles['small-cards-wrapper']}>
          {subArray?.map((item) => (
            <CaptionCard {...item} className={styles.card} key={uuidv4()} />
          ))}
        </div>
      </SwiperSlide>
    ));
  };

  return (
    <div className={styles.contatiner}>
      <Swiper slidesPerView="auto" spaceBetween={20}>
        {renderBigSlide()}
        {renderSmallSlides()}
      </Swiper>
    </div>
  );
};

export default Header;

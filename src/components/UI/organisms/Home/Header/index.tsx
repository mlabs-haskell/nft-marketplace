import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { v4 as uuidv4 } from 'uuid';
import { ArtistsType } from 'types/artists';
import ArtistCard from '../../../molecules/ArtistCard';
import styles from './index.module.scss';
import { separateArrayByArrays } from '../../../../../utils/separateArrayByArrays';
import right from '../../../../../assets/svg/arrow-right.svg';

SwiperCore.use([Navigation]);

interface Props {
  artists: ArtistsType.Artist[];
}

interface ISwiperInstance extends Swiper {
  ref: HTMLDivElement | null;
}

const SwiperInstance: React.FC<ISwiperInstance> = Swiper;

const Header = (props: Props) => {
  const { artists } = props;
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef: any = useRef(null);

  const renderBigSlide = () => {
    if (!artists?.length) return null;
    return (
      <SwiperSlide className={styles['swiper-slide']}>
        <div className={styles['big-card-wrapper']}>
          <ArtistCard {...artists[0]} className={styles['card-big']} />
        </div>
      </SwiperSlide>
    );
  };

  const renderSmallSlides = () => {
    if (!artists?.length) return null;

    const withoutFirst = artists.filter((item, counter) => counter !== 0);
    const separatedArray = separateArrayByArrays(withoutFirst, 2);

    return separatedArray.map((subArray) => (
      <SwiperSlide
        key={uuidv4()}
        className={styles['swiper-slide']}
        transition-property={false}
      >
        <div className={styles['small-cards-wrapper']}>
          {subArray?.map((item) => (
            <ArtistCard {...item} className={styles.card} key={uuidv4()} />
          ))}
        </div>
      </SwiperSlide>
    ));
  };

  const nextSlide = () => {
    const current: any = swiperRef.current;
    current && current?.swiper?.slideNext();
  };
  const prevSlide = () => {
    const current: any = swiperRef.current;
    current && current?.swiper?.slidePrev();
  };

  return (
    <div className={styles.contatiner}>
      <SwiperInstance
        ref={swiperRef}
        className={styles['swiper-container-1']}
        onInit={(swiper: any) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        slidesPerView="auto"
        spaceBetween={20}
      >
        {renderBigSlide()}
        {renderSmallSlides()}
      </SwiperInstance>
      <div className={styles['arrow-buttons-wrapper']}>
        <button
          className={styles['left-arrow']}
          type="button"
          onClick={prevSlide}
        >
          <img src={right} alt="arrow-left" />
        </button>
        <button
          className={styles['right-arrow']}
          type="button"
          onClick={nextSlide}
        >
          <img src={right} alt="arrow-right" />
        </button>
      </div>
    </div>
  );
};

export default Header;

import classNames from 'classnames';
import { useEffect, useState } from 'react';
import right from '../../../../assets/svg/arrow-right.svg'
import styles from './index.module.scss';

interface SliderProps {
  children: any,
  sliderClass?: string,
}

const Slider = ({ children, sliderClass }: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);

  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  // Set the length to match current children from props
  useEffect(() => {
    setLength(children.length);
  }, [children]);

  return (
    <div className={classNames([styles['slider-container'], sliderClass])}>
      <div className={styles['slider-wrapper']}>
        {currentIndex > 0 && (
          <button onClick={prev} className={styles["left-arrow"]}>
            <img src={right} alt="arrow-left" />
          </button>
        )}
        <div className={styles['slider-content-wrapper']}>
          <div
            className={classNames([styles['slider-content']])}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {children}
          </div>
        </div>
        {currentIndex < length - 1 && (
          <button onClick={next} className={styles["right-arrow"]}>
            <img src={right} alt="arrow-right" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Slider;

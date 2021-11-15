import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

const Slider = ({ children, show }) => {
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
    <div className={styles['slider-container']}>
      <div className={styles['slider-wrapper']}>
        {currentIndex > 0 && (
          <button onClick={prev} className={styles["left-arrow"]}>
            &lt;
          </button>
        )}
        <div className={styles['slider-content-wrapper']}>
          <div
            className={styles['slider-content']}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {children}
          </div>
        </div>
        {currentIndex < length - 1 && (
          <button onClick={next} className={styles["right-arrow"]}>
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default Slider;

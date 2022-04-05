/* eslint-disable */
import { useEffect, useState } from 'react';
import Box from 'components/UI/atoms/Box';
import { useNftContext } from 'context/NftContext';
import { Link } from 'react-router-dom';
import searchIcon from '../../../../assets/svg/search.svg';
import arrow from '../../../../assets/svg/arrow-down.svg';
import styles from './index.module.scss';

interface Props {
  placeholder: string;
}

const SearchInput = ({ placeholder }: Props) => {
  const { search } = useNftContext();
  const [value, setValue] = useState('');
  const [display, setDisplay] = useState(false);

  const handleClose = () => {
    setValue('');
    setDisplay(false);
    search.setText('');
  };

  useEffect(() => {
    setValue(search.text)
  }, [search])

  const handleChange = (e: any) => {
    e.preventDefault();
    setValue(e.target.value);
    setDisplay(true);
    search.setText(e.target.value);
  };

  const handleArtistSelection = (e: any) => {
    setValue(e.target.innerText);
    setDisplay(false);
  };

  const matchingArtists = search.getMatchingArtists();

  return (
    <div className={styles['search-container']}>
      <div className={styles.input}>
        <div className={styles.left}>
          <img src={searchIcon} alt="search" />
          <input
            placeholder={placeholder}
            onChange={(e) => handleChange(e)}
            value={value}
          />
        </div>
        {value && (
          <span onClick={handleClose} role="presentation">
            x
          </span>
        )}
      </div>
      {display ? (
        <Box boxClass={styles.option}>
          <ul
            onClick={(e: React.SyntheticEvent) => handleArtistSelection(e)}
            role="presentation"
          >
            {matchingArtists.length === 0 ? (
              <li>No matches</li>
            ) : (
              matchingArtists?.map((item) => (
                <div key={item.id} className="d-flex align-items-center">
                  <div className={styles['artist-image']}>
                    <img src={item.imagePath} alt="artist" />
                  </div>
                  <Link to={`/artist/${item.id}`}>
                    <li>{item.name}</li>
                  </Link>
                </div>
              ))
            )}
          </ul>
        </Box>
      ) : (
        ''
      )}
    </div>
  );
};

export default SearchInput;

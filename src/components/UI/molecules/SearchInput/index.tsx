import { useState } from 'react';
import Box from 'components/UI/atoms/Box';
import { useNftContext } from 'context/NftContext';
import { ArtistsType } from 'types/artists';
import { Link } from 'react-router-dom';
import search from '../../../../assets/svg/search.svg';
import arrow from '../../../../assets/svg/arrow-down.svg';
import styles from './index.module.scss';

interface Props {
  placeholder: string;
}

const SearchInput = ({ placeholder }: Props) => {
  const [value, setValue] = useState('');
  const [display, setDisplay] = useState(false);
  const [searchArtist, setSearchArtist] = useState<ArtistsType.Artist[]>([]);
  const { artists, setFilteredArtists } = useNftContext();

  const filterArtists = (
    searchWord: string,
    artistsList: ArtistsType.Artist[]
  ) =>
    artistsList.filter((item) => {
      const regex = new RegExp(searchWord, 'gi');
      return item.name.match(regex);
    });

  const handleClose = () => {
    setValue('');
    setDisplay(false);
    setFilteredArtists(artists);
  };
  const handleChange = (e: any) => {
    e.preventDefault();
    setValue(e.target.value);
    if (e.target.value) {
      const matchSearch = filterArtists(e.target.value, artists);
      setSearchArtist(matchSearch);
      setFilteredArtists(matchSearch);
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  };
  const handleArtistSelection = (e: any) => {
    setValue(e.target.innerText);
    setDisplay(false);
  };

  return (
    <div className={styles['search-container']}>
      <div className={styles.input}>
        <div className={styles.left}>
          <img src={search} alt="search" />
          <input
            placeholder={placeholder}
            onChange={(e) => handleChange(e)}
            value={value}
          />
        </div>
        {value ? (
          <span onClick={handleClose} role="presentation">
            x
          </span>
        ) : (
          <img src={arrow} alt="arrow-down" />
        )}
      </div>
      {display ? (
        <Box boxClass={styles.option}>
          <ul onClick={(e) => handleArtistSelection(e)} role="presentation">
            {searchArtist.length === 0 ? (
              <li>No matches</li>
            ) : (
              searchArtist?.map((item) => (
                <Link to={`/artist/${item.id}`} key={item.id}>
                  <li>{item.name}</li>
                </Link>
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

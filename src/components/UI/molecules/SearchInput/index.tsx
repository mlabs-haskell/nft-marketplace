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
  const [empty, setEmpty] = useState(true);
  const [value, setValue] = useState('');
  const [display, setDisplay] = useState(false);
  const [searchArtist, setSearchArtist] = useState<ArtistsType.Artist[]>([]);
  const { artists, fetchFilteredArtists } = useNftContext();

  const handleFilter = (searchWord: string, val: ArtistsType.Artist[]) =>
    val.filter((item) => {
      const regex = new RegExp(searchWord, 'gi');
      return item.name.match(regex);
    });

  const handleClose = () => {
    setValue('');
    setEmpty(true);
    setDisplay(false);
    fetchFilteredArtists(artists);
  };
  const handleChange = (e: any) => {
    e.preventDefault();
    setValue(e.target.value);
    if (e.target.value === '') {
      setEmpty(true);
      setDisplay(false);
    } else {
      setEmpty(false);
      const matchSearch = handleFilter(e.target.value, artists);
      setSearchArtist(matchSearch);
      fetchFilteredArtists(matchSearch);
      setDisplay(true);
    }
  };
  const displayArtists = (e: any) => {
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
        {empty ? (
          <img src={arrow} alt="arrow-down" />
        ) : (
          <span onClick={handleClose} role="presentation">
            x
          </span>
        )}
      </div>
      {display ? (
        <Box boxClass={styles.option}>
          <ul>
            {searchArtist.length === 0 ? (
              <li>No matches</li>
            ) : (
              searchArtist?.map((item) => (
                <li role="presentation" key={item.id} onClick={displayArtists}>
                  <Link to={`/artist/${item.id}`}>{item.name}</Link>
                </li>
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

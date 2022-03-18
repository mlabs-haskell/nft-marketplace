import Button from 'components/UI/atoms/Button';
import { FilterState } from 'context/UIContext';
import styles from './index.module.scss';

interface Props {
  collections?: () => void;
  sales?: () => void;
  all?: () => void;
  filterState?: FilterState;
}

interface FilterList {
  id: number;
  label: string;
  filterItem: FilterState;
  handleClick?: () => void;
}

const ExploreHeader = ({ collections, sales, all, filterState }: Props) => {
  const filterList: FilterList[] = [
    {
      id: 1,
      label: 'All',
      filterItem: 'ALL',
      handleClick: all,
    },
    {
      id: 2,
      label: 'My Sales',
      filterItem: 'SALES',
      handleClick: sales,
    },
    {
      id: 3,
      label: 'My Collenction',
      filterItem: 'COLLECTION',
      handleClick: collections,
    },
  ];

  return (
    <div className={styles.header}>
      <h2>Explore</h2>
      <div className={styles.button}>
        {filterList.map((filter) => (
          <Button
            key={filter.id}
            label={filter.label}
            color={filterState === filter.filterItem ? 'primary' : 'secondary'}
            onClick={filter.handleClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreHeader;

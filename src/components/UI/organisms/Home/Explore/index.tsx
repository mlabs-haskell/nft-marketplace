import Button from '../../../atoms/Button';
import AuctionCard from '../../../molecules/AuctionCard';
import styles from './index.module.scss';

const Explore = () => (
  <div className={styles.contatiner}>
    <div className={styles.header}>
      <h2>Explore</h2>
      <div className={styles.button}>
        <Button label="My Sales" color="secondary" />
        <Button label="My Collection" color="primary" />
      </div>
    </div>
    <div className={styles['card-container']}>
      <AuctionCard
        amount="0.005 ETH "
        title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
        image="https://picsum.photos/200/200"
        isExplore
        quantity="1/1"
      />
      <AuctionCard
        amount="0.005 ETH "
        title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
        image="https://picsum.photos/200/300"
        isExplore
        quantity="1/1"
      />
      <AuctionCard
        amount="0.005 ETH "
        title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
        image="https://picsum.photos/200/250"
        isExplore
        quantity="1/1"
      />
      <AuctionCard
        amount="0.005 ETH "
        title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
        image="https://picsum.photos/200/200"
        isExplore
      />
      <AuctionCard
        amount="0.005 ETH "
        title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
        image="https://picsum.photos/200/200"
        isExplore
      />
      <AuctionCard
        amount="0.005 ETH "
        title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
        image="https://picsum.photos/200/300"
        isExplore
      />
      <AuctionCard
        amount="0.005 ETH "
        title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
        image="https://picsum.photos/200/250"
        isExplore
      />
      <AuctionCard
        amount="0.005 ETH "
        title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
        image="https://picsum.photos/200/200"
        isExplore
      />
      <AuctionCard
        amount="0.005 ETH "
        title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
        image="https://picsum.photos/200/300"
        isExplore
      />
    </div>
    <div className={styles.btn}>
      <Button label="Load More" color="primary" size="large" />
    </div>
  </div>
);

export default Explore;

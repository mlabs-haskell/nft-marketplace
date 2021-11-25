import Slider from '../../../molecules/Slider';
import image1 from '../../../../../assets/svg/image1.svg';
import image2 from '../../../../../assets/svg/image2.svg';
import styles from './index.module.scss';
import AuctionCard from '../../../molecules/AuctionCard';

function Auction() {
  return (
    <div>
      <h2 className={styles.header}>Live auctions</h2>
      <Slider show={5}>
        <AuctionCard
          bid="Bid 5,000 DAI"
          amount="18 ETH"
          title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
          quantity="1/1"
          time="22:14:15"
          image={image1}
        />
        <AuctionCard
          bid="Bid 5,000 DAI"
          amount="18 ETH"
          title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
          quantity="1/1"
          time="22:14:15"
          image={image2}
        />
        <AuctionCard
          bid="Bid 5,000 DAI"
          amount="18 ETH"
          title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
          quantity="1/1"
          time="22:14:15"
          image={image1}
        />
        <AuctionCard
          bid="Bid 5,000 DAI"
          amount="18 ETH"
          title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
          quantity="1/1"
          time="22:14:15"
          image={image2}
        />
        <AuctionCard
          bid="Bid 5,000 DAI"
          amount="18 ETH"
          title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
          quantity="1/1"
          time="22:14:15"
          image={image1}
        />
        <AuctionCard
          bid="Bid 5,000 DAI"
          amount="18 ETH"
          title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
          quantity="1/1"
          time="22:14:15"
          image={image2}
        />
        <AuctionCard
          bid="Bid 5,000 DAI"
          amount="18 ETH"
          title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
          quantity="1/1"
          time="22:14:15"
          image={image1}
        />
        <AuctionCard
          bid="Bid 5,000 DAI"
          amount="18 ETH"
          title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
          quantity="1/1"
          time="22:14:15"
          image={image1}
        />
        <AuctionCard
          bid="Bid 5,000 DAI"
          amount="18 ETH"
          title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
          quantity="1/1"
          time="22:14:15"
          image={image1}
        />
        <AuctionCard
          bid="Bid 5,000 DAI"
          amount="18 ETH"
          title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
          quantity="1/1"
          time="22:14:15"
          image={image1}
        />
      </Slider>
    </div>
  );
}

export default Auction;

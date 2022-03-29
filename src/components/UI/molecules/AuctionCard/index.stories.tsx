import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InformationNft } from 'seabug-sdk/src/common';
import { ImageType } from 'types/image';
import { ImagesType } from 'types/images';
import AuctionCard from '.';

export default {
  title: 'Atoms/AuctionCard',
  component: AuctionCard,
  argTypes: {},
} as ComponentMeta<typeof AuctionCard>;

const Template: ComponentStory<typeof AuctionCard> = (args) => (
  <AuctionCard {...args} />
);

const nft: InformationNft = {
  id: { contentHash: 'aa00000000' },
  share: [1, 10],
  author: { pubKeyHash: 'ff00000000' },
  owner: { pubKeyHash: 'ff00000000' },
  price: 25000000n,
  auctionState: {
    highestBid: undefined,
    deadline: new Date(Date.now() + 1000 * 60 * 10),
    minBid: 10000000n,
  },
};

const image: ImagesType.Image = {
  sha256hash: 'aa00000000',
  path: `https://picsum.photos/id/${50}/500/500}`,
  createdAt: new Date(),
  id: 1234,
  ipfsHash: 'abg',
  title: `An awesome NFT`,
  description:
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos',
};

export const Default = Template.bind({});
Default.args = {
  nft,
  image,
};

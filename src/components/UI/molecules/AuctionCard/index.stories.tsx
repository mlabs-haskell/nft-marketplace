import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Image } from 'types/images';
import { Nft } from 'types/nfts';
import AuctionCard from '.';

export default {
  title: 'Atoms/AuctionCard',
  component: AuctionCard,
  argTypes: {},
} as ComponentMeta<typeof AuctionCard>;

const Template: ComponentStory<typeof AuctionCard> = (args) => (
  <AuctionCard {...args} />
);

// TODO: Add sample data for NftListing
const nft: Nft = {
  ipfsHash: 'abc123',
  input: {
    transactionId: '',
    inputIndex: 0,
  },
  output: {
    address: '',
    value: {
      currencySymbol: '',
      tokenName: '',
      amount: 0n,
    },
    data_hash: '',
  },
  metadata: {
    policyId: '',
    mintPolicy: '',
    collectionNftCS: '',
    collectionNftTN: '',
    lockingScript: '',
    authorPkh: '',
    authorShare: 0n,
    marketplaceScript: '',
    marketplaceShare: 0n,
    ownerPkh: '',
    ownerPrice: 0n,
  },
};

const image: Image = {
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

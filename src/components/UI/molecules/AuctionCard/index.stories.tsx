import { ComponentStory, ComponentMeta } from '@storybook/react';
import AuctionCard from '.';
import { InformationNft } from 'seabug-sdk/src/common';
import { ImageType } from 'types/image';
import { NftListing } from 'cardano-transaction-lib-seabug';

export default {
  title: 'Atoms/AuctionCard',
  component: AuctionCard,
  argTypes: {},
} as ComponentMeta<typeof AuctionCard>;

const Template: ComponentStory<typeof AuctionCard> = (args) => (
  <AuctionCard {...args} />
);

// TODO: Add sample data for NftListing
const nft: NftListing = {
  input: {
    transaction_id: '',
    input_index: 0
  },
  output: {
    address: '',
    value: {
      currencySymbol: '',
      tokenName: '',
      amount: 0n
    },
    data_hash: '',
  },
  metadata: {
    seabugMetadata: {
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
      ownerPrice: 0n
    },
    ipfsHash: 'abc123',
  }

}

const image: ImageType.NftImage = {
  sha256hash: 'aa00000000',
  path: `https://picsum.photos/id/${50}/500/500}`,
  createdAt: new Date(),
  id: 1234,
  title: `An awesome NFT`,
  description:
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos',
};

export const Default = Template.bind({});
Default.args = {
  nft,
  image,
};

import {
  Input,
  NftListing,
  Output,
  SeabugMetadata,
} from 'cardano-transaction-lib-seabug';
import { ipfsUrlFromHash, ipfsUrlToHash } from 'utils/ipfs';

export interface Nft {
  ipfsHash: string;
  input: Input;
  output: Output;
  metadata: SeabugMetadata;
}

export const nftFromNftListing = (nftListing: NftListing): Nft => ({
  ipfsHash: ipfsUrlToHash(nftListing.metadata.ipfsHash), // ipfsHash in metadata includes full 'ipfs://' URL
  input: nftListing.input,
  output: nftListing.output,
  metadata: nftListing.metadata.seabugMetadata,
});

export const nftToNftListing = (nft: Nft): NftListing => ({
  input: nft.input,
  output: nft.output,
  metadata: {
    ipfsHash: ipfsUrlFromHash(nft.ipfsHash),
    seabugMetadata: nft.metadata,
  },
});

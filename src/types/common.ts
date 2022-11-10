import { Image } from "./images"
import { Nft } from "./nfts"

export type Maybe<T> = T | undefined

export type NftImage = { nft: Nft, image: Image }
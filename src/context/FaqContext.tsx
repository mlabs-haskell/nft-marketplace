export interface FaqContent {
  title: string;
  text: string;
  section: string;
}

export const faqContent: FaqContent[] = [
  {
    title: 'What is seabug?',
    text:
      `Good question. seabug is the distant cousin of that landlubber Logan, the Chief Business Lobster at IOG. As fate would have it, he is a crustacean heretofore unknown among community members. The ne'er-do-well was sailing close to the wind amid the treacherous ocean throughout the Shelly era. Following the Alonzo hard fork, however, the spoils of Cardano became far too compelling for seabug to ignore.` +
      '<br> <br>' +
      ` Sure enough, the allure of riches underpins the oath made by seabug – to harbor travelers of the high seas as they barter over treasures they have either created or collected. seabug's market is a safe place, a Geneva of the open ocean. So just come on in: name your price and make a bid. ` +
      '<br> <br>' +
      ` "Not all treasure is silver and gold.”`,
    section: 'about',
  },
  {
    title: 'How do I get started?',
    text:
      `First things first, you’ll need to download the Nami wallet to make transactions and participate in auctions. You can find Nami download links here: https://namiwallet.io/ Be sure to follow the official web page's directions, taking particular care to record and securely store your seed phrase. You will be unable to recover your wallet without this passphrase, and anyone with access to your seed phrase also has access to your funds.` +
      '<br> <br>' +
      ` Next, transfer $ADA to your wallet, and you are set to begin. Click on a favorite NFT, and you'll be directed to its ITEM page. On seabug, sellers can list items at a fixed price or offer them in an auction. A piece's ITEM page displays its sale type, and you can place a bid or make a purchase by navigating the checkout options available.` +
      '<br> <br>' +
      ` After purchase, return to the home page and scroll down to the EXPLORE section. To resell an item, click on the “My Collection” button to filter seabug for your NFTs. Click on the NFT you wish to sell, and you'll be directed to its ITEM page. Choose the sale type and enter the relevant information in the pop-ups, and seabug will place your NFT on auction or offer it for sale.`,
    section: 'setup',
  },
  {
    title: 'How do sales work on seabug?',
    text:
      `NFTs on seabug are securely held and transferred by our smart contracts. Items are represented at the script address of a given UTXO, and the purchaser’s wallet public key has the sole ability to transfer ownership of the item therein. As such, sales on seabug involve transferring digital assets between script addresses. Overall, this is similar in spirit to how NFTs work on Ethereum.` +
      '<br> <br>' +
      ` Unfortunately, most of Cardano's infrastructure was not been designed with this approach to ownership in mind. NFTs on other major Cardano platforms usually involve previously-minted native tokens sent in a transaction to the purchaser's wallet address. While convenient, this approach involves some compromises around royalty robustness. However, this means that wallet support for NFTs on seabug will likely be sparse at launch. Initially, users will need to rely on the seabug platform to view and interact with their NFT purchases. Future developments will address this issue.`,
    section: 'sales',
  },
  {
    title: 'How do I find my NFTs on seabug?',
    text: `Navigate to the home page by clicking on the seabug logo at the top left, and verify that your Nami wallet is connected. Next, scroll down to the explore section and click on "My Collection." This filters all of the NFTs on seabug for those owned by your Nami wallet. Clicking on "My Sales" filters your items for those on sale or auction.`,
    section: 'search',
  },
  {
    title: 'Where can I see my transaction hash?',
    text: `Open your Nami wallet extension and click on the clock icon beneath the "Receive" button. Doing so will display your wallet's transaction history. The highest transaction is the most recent, and clicking on it will expand down to reveal its transaction ID. Click on this hyperlink, and you will be directed to Cardanoscan, where you can verify the details of your transaction.`,
    section: 'confirmation',
  },
  {
    title: 'Should I contact seabug sellers off-site?',
    text: `Like with any e-commerce site, seabug strongly advises against conducting transactions off-site. Our platform guarantees transactions execute as designed. Unfortunately, scammers are common in the crypto space, which is also true with NFTs. It can be challenging if not impossible to guarantee a third party is who they claim to be, and it is also possible to pass off duplicate NFTs as the original. As such, we recommend that users and sellers only rely on the seabug platform to purchase items offered on our site.`,
    section: 'off-site',
  },
];

# Seabug NFT Marketplace SDK

A TypeScript SDK for interacting with the Seabug NFT marketplace PAB endpoints.

## Usage Example

```javascript
import makeSdk from 'seabug-sdk'; // actual module name may change

// Plutus Application Backend URL
const pabBaseUrl = "http://localhost:8080";

// Pub key hash of user's wallet
const walletId = "872cb83b5ee40eb23bfdab1772660c822a48d491";

makeSdk(pabBaseUrl, walletId)
  .then(sdk => {
    // Use SDK to interact with NFT Marketplace PAB endpoints
    return sdk.makeTransaction.mint({ 
      content: someImageFile,
      title: "Some Image",
      share: [1, 10], // 10% share
      price: 10000000n // 10 Ada as Lovelace
    });
  })
  .then(({ transaction, nftId}) => {
    // Sign and submit transaction using wallet API, etc.
  })
  .catch(err => {
    // The promise can reject when attempting to make the SDK. This means
    // there was a problem activating the contract instance using the 
    // provided baseUrl and walletId. Handle appropriately.
    console.log(err);
  });
```
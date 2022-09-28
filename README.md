# NFT-Marketplace

## Requirements

- Locally installed Node.js (https://nodejs.org/en/download)
- Nami browser extension (https://namiwallet.io)
- Running CTL backend services (https://github.com/Plutonomicon/cardano-transaction-lib)
- Running NFT marketplace server (https://github.com/mlabs-haskell/nft-marketplace-server)

## Getting Started

### Configuring Nami Wallet

1. Install the Nami wallet extension from https://namiwallet.io and complete the setup process.
2. In the settings, change the network from `Mainnet` to `Preview`.
3. Click the `Receive` button in the wallet and copy the address.
4. Go to https://faucet.preview.world.dev.cardano.org/basic-faucet and request `tAda` to your address.
5. Wait until the test Ada shows up in your wallet and then add collateral of `5 tAda`.

### Build Using Public CTL Dependency

1. Clone this repo and cd into the `nft-marketplace` directory.
2. Run `npm install` to install dependencies.
3. Update the `.env` file (instructions below).
4. Run `npm start` to launch the app.

### Build Using Locally Packaged CTL Dependency

1. Clone the https://github.com/Plutonomicon/cardano-transaction-lib repo, switch to the `seabug-deployment` branch and follow the instructions in `/seabug-deployment/npm-packages/seabug-example`.
2. Clone this repo and cd into the `nft-marketplace` directory.
3. Run `npm install` to install dependencies.
4. Run `npm link cardano-transaction-lib-seabug`. This will create a link in your
   `node_modules` directory to the `cardano-transaction-lib-seabug` that you registered in step 1.
5. Update the `.env` file (instructions below).
6. Run `npm start` to launch the app.

**Important:** each time your run `npm install` or `npm ci`, you will need to run
`npm link cardano-transaction-lib-seabug` again.

## Environment Variables

There are several environment variables that must be set prior to launching the app. These can be configured in the `.env` file within the project root directory.

### `REACT_APP_API_BASE_URL`
The `nft-marketplace-server` base URL. Example: `https://localhost:8008`

### `REACT_APP_CTL_SERVER_HOST`
The CTL server host. Example: `localhost`

### `REACT_APP_CTL_SERVER_PORT`
The CTL server port. Example: `8008`

### `REACT_APP_CTL_SERVER_SECURE_CONN`
Whether or not to use HTTPS for the CTL server connection. Example: `false`

### `REACT_APP_CTL_OGMIOS_HOST`
The Ogmios host. Example: `localhost`

### `REACT_APP_CTL_OGMIOS_PORT`
The Ogmios port. Example: `1337`

### `REACT_APP_CTL_OGMIOS_SECURE_CONN`
Whether or not to use HTTPS for the Ogmios connection. Example: `false`

### `REACT_APP_CTL_DATUM_CACHE_HOST`
The Ogmios Datum Cache host. Example: `localhost`

### `REACT_APP_CTL_DATUM_CACHE_PORT`
The Ogmos Datum Cache port. Example: `9999`

### `REACT_APP_CTL_DATUM_CACHE_SECURE_CONN`
Whether or not to use HTTPS for the Ogmios Datum Cache connection. Example: `false`

### `REACT_APP_CTL_NETWORK_ID`
The Cardano network ID/tag, see [CIP19](https://cips.cardano.org/cips/cip19/#networktag). Set to 0 for testnets (pre-prod, preview), and 1 for mainnet.

### `REACT_APP_CTL_PROJECT_ID`
The Blockfrost project ID (which can be obtained by signing up at https://blockfrost.io/). Example: `previewxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### `REACT_APP_IPFS_BASE_URL`
The base URL for IPFS requests. Example: `https://cloudflare-ipfs.com/ipfs/`

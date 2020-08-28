<h1 align="center">Welcome to Harmony pet 👋</h1>
<p>
  <img src="https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000" />
</p>

## Description

- Structures :
  Each pet is equivalent to 1 smart contract
  Feature to detemine the shape of pet : Amount token + Number of days to raise pet
  In which:

  - The amount of tokens determines the size
  - The number of raising day determines the pet's effects

- Interact with pet :
  - Feed :
    Buy food in proportion to the amount you want to deposit into the smart contract
  - Withdraw:
    Withdraw tokens from smart contract (pet) and transfer to the math wallet

## Setup ( Testnet version )

- Custom mathWallet:

  - [Install mathwallet](https://docs.harmony.one/home/wallets/mathwallet)
  - Custom wallet testnet:
    ![](/readmeImages/networks.png)
    Select Custom:
    ![](/readmeImages/customNetwork.png)
  - Fill in blank:
    Name : Harmony testnet (everything you want)
    Node address: https://api.s0.b.hmny.io

- Blockchain (smart contracts):

  - Load packages :

  ```sh
  cd deploy_contract
  yarn install
  ```

  - Setup .env file:

  ```sh
  TESTNET_PRIVATE_KEY=
  TESTNET_MNEMONIC=

  TESTNET_0_URL=
  TESTNET_1_URL=

  GAS_LIMIT=3321900
  GAS_PRICE=1000000000
  ```

  - Deploy contract:

  ```sh
  yarn truffle migrate --network testnet
  ```

  Contract abi will be located in **_client/src/contracts_**

- Frontend ( Reactjs ):
  - Load packages:
  ```sh
  cd client
  yarn install
  ```
  - Setup .env file:
  ```sh
  NODE_PATH=src/
  ```
  - Run client server:
  ```js
  yarn start
  ```

## Usage

Create a Harmony instance connecting to testnet

```js
import { ChainID, ChainType, fromWei, hexToNumber, Units } from '@harmony-js/utils';

const hmy = new Harmony('https://api.s0.b.hmny.io', {
  chainType: ChainType.Harmony,
  chainId: ChainID.HmyTestnet
});
```

Sign in with mathWallet

```js
let isMathWallet = window.harmony && window.harmony.isMathWallet;
if (isMathWallet) {
  let mathwallet = window.harmony;
  mathwallet.getAccount().then(async (account) => {});
}
```

Init factory harmony contract:

```js
import Factory from 'contracts/PetWalletFactory.json';
let factoryAddress = Factory.networks[2].address;
let factory = hmy.contracts.createContract(Factory.abi, factoryAddress);
```

Config gas && gaslinit:

```js
const GAS_LIMIT = 6721900;
const GAS_PRICE = 1000000000;
const options = {
  gasPrice: GAS_PRICE,
  gasLimit: GAS_LIMIT
};
```

Call function:

```js
let petArray = await factory.methods
  .getAllPetAddressOf(hmy.crypto.getAddress(account.address).checksum)
  .call(options);
```

Create transaction with mathWallet:

```js
return new Promise(async (resolve, reject) => {
  try {
    // Add signer to contract instance
    factory.wallet.defaultSigner = hmy.crypto.getAddress(account.address).checksum;
    factory.wallet.signTransaction = async (tx) => {
      try {
        tx.from = hmy.crypto.getAddress(account.address).checksum;
        const signTx = await window.harmony.signTransaction(tx);
        return signTx;
      } catch (e) {
        console.error(e);
        reject(e);
      }
    };
    // Send transaction
    const res = await factory.methods
      .create(petId, targetFund, duration, purpose)
      .send(options)
      .then(() => {
        window.location.href = `/mypets/${pets.length}`;
      })
      .catch((e) => {
        console.log('Create pet action error', e);
      });
    resolve(res);
  } catch (e) {
    console.error(e);
    reject(e);
  }
});
```

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_

const { Harmony } = require('@harmony-js/core');
const { ChainID, ChainType } = require('@harmony-js/utils');

const EXPLORER_URL = 'https://explorer.pops.one/#';

const GAS_LIMIT = 103802;
const GAS_PRICE = 1000000000;

const hmy = new Harmony('https://api.s0.b.hmny.io', {
  chainType: ChainType.Harmony,
  chainId: ChainID.HmyTestnet,
});

const contractJson = require('../../../deploy_contract/build/contracts/PetWalletFactory.json');
const contractAddr = '0x3D4720bd5FD867c059d4FeA2E9ee03c1d4cdf056';

const petFactory = hmy.contracts.createContract(contractJson.abi, contractAddr);

const a = petFactory.wallet.createAccount();

const options = {
  gasPrice: GAS_PRICE,
  gasLimit: GAS_LIMIT,
};

const instance = petFactory.methods;

// export const getList = async () => {
//   let total = await instance.totalSupply().call(options);

//   const cards = [];

//   for (let i = 0; i < total; i++) {
//     let res = await instance.getPlayer(i).call(options);
//     cards.push(res);
//   }

//   return cards;
// };
exports.getAllPetAddressOf = async function (address) {
  try {
    let a = await hmy.crypto.getAddress(address).bech32;
    console.log(a);
    let data = await instance.getAllPetAddressOf(address).call(options);
    let response = {
      success: true,
      result: data,
    };
    console.log(response);
    return response;
  } catch (error) {
    let response = {
      success: false,
      result: error.message,
    };
    console.log(response);
    return response;
  }
};

// export const getPlayerById = async id => {
//   const res = await instance.getPlayer(id).call(options);

//   return res;
// };

// export const getTotalPlayers = async () => {
//   const res = await instance.totalSupply().call(options);

//   return res;
// };

// export const buyPlayerById = (params: {
//   id: string,
//   price: string,
//   signer: string,
// }): Promise<{ status: string, transaction: { id: string } }> => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       soccerPlayers.wallet.defaultSigner = params.signer;

//       soccerPlayers.wallet.signTransaction = async tx => {
//         try {
//           tx.from = params.signer;
//           // @ts-ignore
//           const signTx = await window.harmony.signTransaction(tx);

//           // const [sentTx, txHash] = await signTx.sendTransaction();

//           // await sentTx.confirm(txHash);

//           // resolve(txHash);
//           return signTx;
//         } catch (e) {
//           console.error(e);
//           reject(e);
//         }

//         return null;
//       };

//       const res = await soccerPlayers.methods
//         .purchase(params.id)
//         .send({ ...options, value: params.price });

//       resolve(res);
//     } catch (e) {
//       console.error(e);

//       reject(e);
//     }
//   });
// };

// export const getBech32Address = address => hmy.crypto.getAddress(address).bech32;
this.getAllPetAddressOf('one12j4ycvnta3l68ep28lpe73n20wx470yfzq9uf3');

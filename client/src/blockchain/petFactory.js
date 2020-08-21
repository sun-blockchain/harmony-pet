const { Harmony } = require('@harmony-js/core');
const { ChainID, ChainType } = require('@harmony-js/utils');
const AccountController = require('./account');

const EXPLORER_URL = 'https://explorer.pops.one/#';

const GAS_LIMIT = 103802;
const GAS_PRICE = 1000000000;

const hmy = new Harmony('https://api.s0.b.hmny.io', {
  chainType: ChainType.Harmony,
  chainId: ChainID.HmyTestnet,
});

const contractJson = require('../../../deploy_contract/build/contracts/PetWalletFactory.json');
const contractAddr = '0xd28dFB9B4eEbe1078B640220969f3C7c0c51aa59';

const petFactory = hmy.contracts.createContract(contractJson.abi, contractAddr);

const options = {
  gasPrice: GAS_PRICE,
  gasLimit: GAS_LIMIT,
};

const instance = petFactory.methods;

exports.getAllPetAddressOf = async function (oneAddress) {
  try {
    let address = await AccountController.getEthereumAddress(oneAddress);
    console.log(address);
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

exports.createPet = async function (petId, deadline, targetFund, purpose, signer) {
  try {
    petFactory.wallet.defaultSigner = signer;
    petFactory.wallet.signTransaction = async tx => {
      try {
        tx.from = signer;
        // @ts-ignore
        const signTx = await window.harmony.signTransaction(tx);

        // const [sentTx, txHash] = await signTx.sendTransaction();

        // await sentTx.confirm(txHash);

        // resolve(txHash);
        return signTx;
      } catch (e) {
        console.error(e);
        reject(e);
      }

      return null;
    };

    const res = await petFactory.methods
      .create(petId, deadline, targetFund, purpose)
      .send({ ...options });

    resolve(res);
  } catch (error) {
    console.log(error);
    reject(error);
  }
};

this.getAllPetAddressOf('one12j4ycvnta3l68ep28lpe73n20wx470yfzq9uf3');
// this.createPet(1, 1, 1, 'abc', 'one12j4ycvnta3l68ep28lpe73n20wx470yfzq9uf3');

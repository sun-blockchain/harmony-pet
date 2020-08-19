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

exports.getAllPetAddressOf = async function (oneAddress) {
  try {
    let address = await hmy.crypto.getAddress(oneAddress).checksum;
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

this.getAllPetAddressOf('one12j4ycvnta3l68ep28lpe73n20wx470yfzq9uf3');

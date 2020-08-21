const axios = require('axios');
const { Harmony } = require('@harmony-js/core');
const { ChainID, ChainType } = require('@harmony-js/utils');

const hmy = new Harmony('https://api.s0.b.hmny.io', {
  chainType: ChainType.Harmony,
  chainId: ChainID.HmyTestnet,
});

exports.getBalance = async function (address) {
  try {
    let params = [address, 'latest'];
    let data = await axios({
      methods: 'POST',
      url: 'https://api.s0.b.hmny.io/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { params: params, method: 'hmy_getBalance', jsonrpc: '2.0', id: '1' },
    });
    let response = {
      success: true,
      result: data.data.result,
    };
    console.log(response);
    return response;
  } catch (error) {
    let response = {
      success: false,
      result: error.message,
    };
    console.log(respons);
    return response;
  }
};

exports.getEthereumAddress = async function (oneAddress) {
  let address = await hmy.crypto.getAddress(oneAddress).checksum;
  return address;
};

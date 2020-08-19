const axios = require('axios');

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

this.getBalance('one12j4ycvnta3l68ep28lpe73n20wx470yfzq9uf3');

// import Factory from 'contracts/PetWalletFactory.json';
// import petWallet from 'contracts/PetWallet.json';

export const SIGN_IN_WALLET = 'SIGN_IN_WALLET';
export const signInWallet = () => async (dispatch) => {
  let isMathWallet = window.harmony && window.harmony.isMathWallet;
  if (isMathWallet) {
    let mathwallet = window.harmony;
    mathwallet.getAccount().then((account) => {
      dispatch({
        type: SIGN_IN_WALLET,
        account,
        mathwallet
      });
      syncLocalStorage(account, 'mathWallet');
    });
  }
};

export const SIGN_OUT = 'SIGN_OUT';
export const signOut = () => (dispatch) => {
  let isMathWallet = window.harmony && window.harmony.isMathWallet;
  if (isMathWallet) {
    let mathwallet = window.harmony;
    mathwallet.forgetIdentity().then(() => {
      dispatch({
        type: SIGN_OUT,
        account: null
      });
      syncLocalStorage(null, null);
    });
  }
};

let syncLocalStorage = (address, sessionType) => {
  localStorage.setItem(
    'harmony_session',
    JSON.stringify({
      address: address,
      sessionType: sessionType
    })
  );
};

export const INSTANTIATE_CONTRACT = 'INSTANTIATE_CONTRACT';
export const instantiateContracts = () => async (dispatch, getState) => {
  // const state = getState();
  // let web3 = state.tomo.web3;
  // const networkId = process.env.REACT_APP_TOMO_ID;
  // let factoryAddress = Factory.networks[networkId].address;
  // let factory = new web3.eth.Contract(Factory.abi, factoryAddress, {
  //   transactionConfirmationBlocks: 1
  // });
  // dispatch({
  //   type: INSTANTIATE_CONTRACT,
  //   factory
  // });
};

export const GET_ALL_PETS = 'GET_ALL_PETS';
export const getAllPets = () => async (dispatch, getState) => {
  // const state = getState();
  // let web3 = state.tomo.web3;
  // const factory = state.tomo.factory;
  // const account = state.tomo.account;
  // let petArray = await factory.methods.getAllPetAddressOf(account).call({ from: account });
  // const pets = [];
  // for (let i = 0; i < petArray.length; i++) {
  //   let pet = {
  //     instance: null,
  //     id: 0,
  //     amount: 0,
  //     time: 0,
  //     targetFund: 0,
  //     duration: 0,
  //     purpose: ''
  //   };
  //   pet.instance = new web3.eth.Contract(petWallet.abi, petArray[i], {
  //     transactionConfirmationBlocks: 1
  //   });
  //   let petInfo = await pet.instance.methods.getInformation().call();
  //   pet.id = petInfo[0];
  //   pet.amount = petInfo[1];
  //   pet.time = petInfo[2];
  //   pet.targetFund = petInfo[3];
  //   pet.duration = petInfo[4];
  //   pet.purpose = petInfo[5];
  //   pet.address = petArray[i];
  //   pets.push(pet);
  // }
  // dispatch({
  //   type: GET_ALL_PETS,
  //   pets
  // });
};
export const GET_ALL_PETS_ADDRESS = 'GET_ALL_PETS_ADDRESS';
export const getAllPetsAddress = () => async (dispatch, getState) => {
  const state = getState();
  const factory = state.tomo.factory;
  const account = state.tomo.account;
  let petsAddress = await factory.methods.getAllPetAddressOf(account).call({ from: account });
  dispatch({
    type: GET_ALL_PETS_ADDRESS,
    petsAddress
  });
};

export const CREATE_NEW_PET = 'CREATE_NEW_PET';
export const createNewPet = (petId, targetFund, duration, purpose) => async (
  dispatch,
  getState
) => {
  const state = getState();
  const factory = state.tomo.factory;
  const account = state.tomo.account;
  const pets = state.tomo.pets;
  await factory.methods
    .create(petId, targetFund, duration, purpose)
    .send({ from: account })
    .then(() => {
      window.location.href = `/mypets/${pets.length}`;
    })
    .catch((e) => {
      console.log('Create pet action error', e);
    });
};

export const UPDATE_BALANCE = 'UPDATE_BALANCE';
export const updateBalance = (balance) => async (dispatch, getState) => {
  dispatch({
    type: UPDATE_BALANCE,
    balance
  });
};

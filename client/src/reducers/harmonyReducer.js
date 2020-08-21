import * as actions from '../actions';

const initialState = {
  web3: null,
  account: null,
  mathWallet: null,
  balance: 0,
  pets: null,
  petsAddress: null,
  factory: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGN_IN_WALLET:
      return {
        ...state,
        account: action.account,
        mathWallet: action.mathWallet
      };
    case actions.SIGN_OUT:
      return {
        ...state,
        account: action.account
      };
    case actions.INSTANTIATE_CONTRACT:
      return {
        ...state,
        factory: action.factory
      };
    case actions.GET_ALL_PETS:
      return {
        ...state,
        pets: action.pets,
        petsAddress: action.petsAddress
      };
    case actions.UPDATE_BALANCE:
      return {
        ...state,
        balance: action.balance
      };
    default:
      return state;
  }
};

export default reducer;

import * as actions from '../actions';

const initialState = {
  web3: null,
  account: null,
  balance: 0,
  pets: null,
  petsAddress: null,
  factory: null
};

const tomoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.WEB3_CONNECT:
      return {
        ...state,
        web3: action.web3,
        account: action.account,
        balance: action.balance
      };
    case actions.INSTANTIATE_CONTRACT:
      return {
        ...state,
        factory: action.factory
      };
    case actions.GET_ALL_PETS:
      return {
        ...state,
        pets: action.pets
      };
    case actions.GET_ALL_PETS_ADDRESS:
      return {
        ...state,
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

export default tomoReducer;

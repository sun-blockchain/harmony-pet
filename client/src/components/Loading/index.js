import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import * as actions from 'actions';
const Loading = () => {
  const dispatch = useDispatch();
  return (
    <div className='container-custom'>
      <img alt='' src={require('assets/img/lg.blue-longcat-spinner.gif')} className='gif-load' />
      <br />
      <Button color='success' onClick={() => dispatch(actions.signInWallet())}>
        Sign in
      </Button>
    </div>
  );
};

export default Loading;

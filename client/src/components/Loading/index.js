import React from 'react';
const Loading = () => {
  return (
    <div className='container-custom'>
      <img alt='' src={require('assets/img/lg.blue-longcat-spinner.gif')} className='gif-load' />
    </div>
  );
};

export default Loading;

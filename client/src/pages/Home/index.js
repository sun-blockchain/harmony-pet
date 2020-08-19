import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Loading from 'components/Loading';
import PetDeck from 'components/Deck';
class Home extends Component {
  render() {
    return (
      <div className='home'>
        {this.props.harmony.account && this.props.pets ? <PetDeck /> : <Loading />}
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    harmony: state.harmony,
    pets: state.harmony.pets
  };
};

export default compose(connect(mapStatetoProps))(Home);

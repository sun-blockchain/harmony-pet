import React, { Component } from 'react';
import { Row, Col, Spinner } from 'reactstrap';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { compose } from 'redux';
import { connect } from 'react-redux';
import store from 'store';
import * as actions from 'actions';
import * as createjs from 'createjs-module';
import StepProgressBar from './StepProgressBar';
import petWallet from 'contracts/PetWallet.json';
import Pet from 'constants/Pet';
import { PetAction } from 'constants/PetAction';
import Food from 'components/Food';
import Withdraw from 'components/Withdraw';
import './index.css';
import { petFood } from 'constants/PetFood';
import { withDraw } from 'constants/Petwithdraw';
import { Link } from 'react-router-dom';
import { Harmony } from '@harmony-js/core';
import { ChainID, ChainType } from '@harmony-js/utils';
import { toast } from 'react-toastify';
const hmy = new Harmony('https://api.s0.t.hmny.io', {
  chainType: ChainType.Harmony,
  chainId: ChainID.HmyMainnet
});
const GAS_LIMIT = 6721900;
const GAS_PRICE = 1000000000;
const options = {
  gasPrice: GAS_PRICE,
  gasLimit: GAS_LIMIT
};

class PetDetail extends Component {
  constructor() {
    super();

    this.state = {
      growthTime: 0,
      providentFund: 0,
      targetFund: 0,
      duration: 0,
      petInstance: null,
      type: 0,
      progress: 0,
      action: PetAction.DEFAULT,
      scale: 1,
      xCoordinate: window.innerWidth / 2,
      yCoordinate: (window.innerHeight * 2) / 3,
      feed: true,
      feedButtonColor: 'success',
      withDrawButtonColor: 'secondary',
      loading: false
    };
    this.canvas = React.createRef();
    this.tick = this.tick.bind(this);
    this.feedPet = this.feedPet.bind(this);
    this.withDraw = this.withDraw.bind(this);
    this.action = this.action.bind(this);
  }

  async componentDidMount() {
    await store.dispatch(actions.loadWallet());
    let petAddress;
    if (this.props.match.params.index) {
      petAddress = this.props.petsAddress[this.props.match.params.index];
    } else {
      petAddress = this.props.match.params.address;
    }
    let PetInstance = hmy.contracts.createContract(petWallet.abi, petAddress);
    this.stage = new createjs.Stage('canvas');
    var divcanvas = document.getElementById('box-canvas');

    this.stage.canvas.height = (divcanvas.clientHeight * 2) / 3 - 50;
    this.stage.canvas.width = divcanvas.clientWidth;
    this.setState({
      petInstance: PetInstance,
      xCoordinate: divcanvas.clientWidth / 2,
      yCoordinate: (divcanvas.clientHeight * 2) / 3 - 100
    });
    this.getPetInfo();
  }

  async getPetInfo() {
    let petInfo = Object.values(
      await this.state.petInstance.methods.getInformation().call(options)
    );
    let [type, providentFund, growthTime, targetFund, duration] = [
      parseInt(petInfo[0]),
      parseInt(petInfo[1]),
      parseInt(petInfo[2]),
      parseInt(petInfo[3]),
      parseInt(petInfo[4]),
      petInfo[5]
    ];
    this.setState({ type, providentFund, growthTime, targetFund, duration });
    this.getProgress();
    this.getSize();
    this.action();
  }

  getProgress() {
    let progress = (this.state.growthTime / this.state.duration) * 100;
    let progressArray = Pet[this.state.type].progress;
    for (let element of progressArray) {
      if (progress < element.milestone) {
        this.setState({
          progress: element.index - 1
        });
        return;
      }
      this.setState({
        progress: progressArray.length - 1
      });
    }
  }

  getSize() {
    let size = (this.state.providentFund / this.state.targetFund) * 100;
    let sizeArray = Pet[this.state.type].size;
    for (let element of sizeArray) {
      if (size >= element.milestone) {
        this.setState({
          scale: element.scale
        });
      }
    }
  }

  feedPet = async (value) => {
    let PetInstance = this.state.petInstance;
    if (parseFloat(this.props.balance) > parseFloat(value)) {
      this.setState({
        loading: true
      });
      try {
        PetInstance.wallet.defaultSigner = hmy.crypto.getAddress(
          this.props.account.address
        ).checksum;
        PetInstance.wallet.signTransaction = async (tx) => {
          try {
            tx.from = hmy.crypto.getAddress(this.props.account.address).checksum;
            const signTx = await window.harmony.signTransaction(tx);
            return signTx;
          } catch (e) {
            console.log(e);
            this.setState({
              loading: false
            });
          }
        };
        await PetInstance.methods
          .savingMoney(value)
          .send({ ...options, value: value * 10 ** 18 })
          .then((e) => {
            this.setState({
              action: PetAction.FEED,
              loading: false
            });
            this.getPetInfo();
            this.action();
            toast.success('🦄 Feed Success!', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
          });
      } catch (e) {
        console.error(e);
      }
    } else {
      toast.error('Not enough money!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };

  withDraw = async (value) => {
    let amount = Math.ceil((this.state.providentFund * value) / 100);
    let PetInstance = this.state.petInstance;
    if (parseInt(this.state.providentFund) > 0) {
      this.setState({
        loading: true
      });
      try {
        PetInstance.wallet.defaultSigner = hmy.crypto.getAddress(
          this.props.account.address
        ).checksum;
        PetInstance.wallet.signTransaction = async (tx) => {
          try {
            tx.from = hmy.crypto.getAddress(this.props.account.address).checksum;
            const signTx = await window.harmony.signTransaction(tx);
            return signTx;
          } catch (e) {
            console.log(e);
            this.setState({
              loading: false
            });
          }
        };
        await PetInstance.methods
          .withdrawMoney(amount)
          .send({ ...options })
          .then(() => {
            this.setState({
              action: PetAction.WITHDRAW,
              loading: false
            });
            this.getPetInfo();
            this.action();
            toast.success('🦄 Withdraw Success!', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
          });
      } catch (e) {
        console.error(e);
      }
    } else {
      toast.error('Amount pet not enough!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };
  action() {
    let divcanvas = document.getElementById('box-canvas');
    if (!divcanvas) return;
    this.stage.removeAllChildren();
    const img = new Image();
    img.src = Pet[this.state.type].background.src;
    let background = new createjs.Bitmap(img);
    background.image.onload = () => {
      background.sourceRect = new createjs.Rectangle(0, 0, img.width, img.height);
      background.scaleX = Pet[this.state.type].background.scaleX;
      background.scaleY = Pet[this.state.type].background.scaleY;
      background.x = divcanvas.clientWidth / 2 - (img.width * background.scaleX) / 2;
      background.y = this.stage.canvas.height - img.height * background.scaleY - 50;
    };

    let petAction = new createjs.SpriteSheet(
      Pet[this.state.type].progress[this.state.progress].item[this.state.action]
    );
    let petSprite = new createjs.Sprite(petAction);
    this.setState({ petSprite: petSprite });
    petSprite.x = this.state.xCoordinate;
    petSprite.y = this.state.yCoordinate;
    petSprite.scaleX = this.state.scale;
    petSprite.scaleY = this.state.scale;
    this.stage.addChild(background);
    this.stage.addChild(petSprite);
    petSprite.gotoAndPlay();
    createjs.Ticker.addEventListener('tick', this.tick);
  }

  tick() {
    let petSprite = this.state.petSprite;
    this.stage.update();
    if (this.state.action === PetAction.FEED) {
      if (petSprite.x < 0) {
        petSprite.x = 0;
        petSprite.scaleX = -1 * this.state.scale;
      } else if (petSprite.x > this.stage.canvas.width) {
        petSprite.x = this.stage.canvas.width;
        petSprite.scaleX = 1 * this.state.scale;
      }
      petSprite.scaleX > 0 ? (petSprite.x -= 10) : (petSprite.x += 10);
      this.setState({ xCoordinate: petSprite.x });
    }

    createjs.Ticker.framerate =
      Pet[this.state.type].progress[this.state.progress].item[this.state.action].framerate;
  }
  handleFeedClick = () => {
    this.setState({
      feed: true,
      feedButtonColor: 'success',
      withDrawButtonColor: 'secondary'
    });
  };
  handleWithdrawClick = () => {
    this.setState({
      feed: false,
      withDrawButtonColor: 'danger',
      feedButtonColor: 'secondary'
    });
  };

  render() {
    return (
      <div className='view'>
        <div className='row justify-content-md-center '>
          <div id='box-canvas'>
            {this.state.loading ? (
              <div className='modal fade show loading'>
                <Spinner color='primary' />
              </div>
            ) : (
              ''
            )}
            <Row>
              <Col>
                <div className='fund_tracking'>
                  <div className='fund-circle-tracking'>
                    <CircularProgressbarWithChildren
                      value={(this.state.providentFund / this.state.targetFund) * 100}
                    >
                      <img
                        alt=''
                        src={Pet[this.state.type].progress[this.state.progress].src}
                        width='40'
                      />
                      <div className='fund-circle-tracking-info'>
                        <strong>
                          {this.state.providentFund} / {this.state.targetFund}
                        </strong>
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>
                </div>
              </Col>
              <Col>
                <div className='growth_tracking'>
                  <StepProgressBar
                    percent={(this.state.growthTime / this.state.duration) * 100}
                    step={Pet[this.state.type].progress.length}
                    type={this.state.type}
                  />
                </div>
              </Col>
            </Row>
            <Row id='size'>
              <canvas id='canvas' />
            </Row>
            <Row>
              {this.state.feed
                ? petFood.map((item) => (
                    <Col
                      xs='4'
                      className='z-index-1000'
                      onClick={() => this.feedPet(item.value)}
                      key={item.value}
                    >
                      <Food item={item} />
                    </Col>
                  ))
                : withDraw.map((item) => (
                    <Col
                      xs='4'
                      className='z-index-1000'
                      onClick={() => this.withDraw(item.value)}
                      key={item.value}
                    >
                      <Withdraw item={item} />
                    </Col>
                  ))}
            </Row>
            <div className='bottom-mobile'>
              <div className='circle-btn-home'>
                <Link to={`/`}>
                  <span className='pushme'>
                    <span className='inner' onClick={this.toggleNewPet}>
                      <img alt='pet' src={require('assets/img/home-page.png')} />{' '}
                    </span>
                  </span>
                </Link>
              </div>
              <div className='box'>
                <div className='icons row'>
                  <div
                    className={(this.state.feed ? 'active-click' : '') + ' move-left'}
                    onClick={this.handleFeedClick}
                  >
                    <img alt='feed' src={require('assets/img/plus-math.png')} />
                  </div>
                  <div
                    className={(!this.state.feed ? 'active-click' : '') + ' move-right'}
                    onClick={this.handleWithdrawClick}
                  >
                    <img alt='withDraw' src={require('assets/img/minus-math.png')} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    harmony: state.harmony,
    petsAddress: state.harmony.petsAddress,
    account: state.harmony.account,
    balance: state.harmony.balance
  };
};

export default compose(connect(mapStateToProps))(PetDetail);

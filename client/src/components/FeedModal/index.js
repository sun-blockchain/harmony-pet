import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Button
} from 'reactstrap';
import Token from 'constants/Token.js';
import './index.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import KyberNetworkProxy from 'constants/KyberNetworkProxy.json';
import ERC20ABI from 'constants/ERC20ABI.json';
import store from 'store';
import * as actions from 'actions';

const KYBER_NETWORK_PROXY_ADDRESS = '0x818e6fecd516ecc3849daf6845e3ec868087b755';

class FeedPetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
      currentToken: '',
      name: 'ETH',
      tokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      value: 1,
      tokenValue: 0,
      rate: 0,
      changeETH: 0,
      changeUSD: 0,
      rateUSD: 0,
      approved: true,
      approving: false
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      value: props.value,
      currentToken: 'https://files.kyber.network/DesignAssets/tokens/eth.svg',
      name: 'ETH'
    });
  }
  handelDropdownToggle = () => {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen
    });
  };
  getAllowance = async (erc20Address) => {
    let srcTokenContract = new this.props.tomo.web3.eth.Contract(ERC20ABI, erc20Address);
    let allowanceAmount = await srcTokenContract.methods
      .allowance(this.props.tomo.account, KYBER_NETWORK_PROXY_ADDRESS)
      .call();
    return allowanceAmount;
  };
  changeToken = async (src, name, address) => {
    this.setState({
      currentToken: src,
      name: name,
      tokenAddress: address
    });
    const allowance = await this.getAllowance(address);
    await this.getRate();
    if (allowance >= this.state.tokenValue * 10 ** 18) {
      this.setState({ approved: true });
    } else {
      this.setState({ approved: false });
    }
  };
  getRate = async () => {
    let ratesRequest = await fetch('https://api.kyber.network/change24h');
    let rateList = await ratesRequest.json();
    let rate = rateList['ETH_' + this.state.name].rate_eth_now;
    let rateUSD = rateList['ETH_' + this.state.name].rate_usd_now;
    let changeETH = rateList['ETH_' + this.state.name].change_eth_24h;
    let changeUSD = rateList['ETH_' + this.state.name].change_usd_24h;
    this.setState({
      rate: rate,
      changeETH: changeETH,
      changeUSD: changeUSD,
      rateUSD: rateUSD
    });
  };
  handleChange = async (event) => {
    let value = event.target.value;
    // const allowance = await this.getAllowance(this.state.tokenAddress);
    // if (allowance >= value * 10 ** 18) {
    //   this.setState({ approved: true });
    // } else {
    //   this.setState({ approved: false });
    // }
    this.setState({
      tokenValue: value,
      value: value * this.state.rate
    });
  };
  handleChangeETH = async (event) => {
    // this.getRate();
    // this.setState({
    //   value: event.target.value,
    //   tokenValue: event.target.value / this.state.rate
    // });
    // const allowance = await this.getAllowance(this.state.tokenAddress);
    // if (allowance >= this.state.tokenValue * 10 ** 18) {
    //   this.setState({ approved: true });
    // } else {
    //   this.setState({ approved: false });
    // }
  };
  handleSwapTokenClick = (value) => async () => {
    //TODO: swap token
    const src = this.state.tokenAddress;
    const srcAmount = this.props.tomo.web3.utils.toWei(value);
    const minConversionRate = new this.props.tomo.web3.utils.BN('55555');
    const kyberNetworkProxy = new this.props.tomo.web3.eth.Contract(
      KyberNetworkProxy,
      KYBER_NETWORK_PROXY_ADDRESS,
      {
        transactionConfirmationBlocks: 1
      }
    );

    let srcTokenContract = new this.props.tomo.web3.eth.Contract(ERC20ABI, src);

    let allowanceAmount = await this.getAllowance(src);
    if (parseInt(allowanceAmount) >= value * 10 ** 18) {
      let transactionData = kyberNetworkProxy.methods
        .swapTokenToEther(src, srcAmount, minConversionRate)
        .encodeABI();

      await this.props.tomo.web3.eth
        .sendTransaction({
          from: this.props.tomo.account, //obtained from website interface Eg. Metamask, Ledger etc.
          to: KYBER_NETWORK_PROXY_ADDRESS,
          data: transactionData
        })
        .on('receipt', async (reciept) => {
          let balance = await this.props.tomo.web3.eth.getBalance(this.props.tomo.account);
          await store.dispatch(
            actions.updateBalance(
              parseFloat(this.props.tomo.web3.utils.fromWei(balance)).toFixed(2)
            )
          );
        })
        .catch((error) => console.log(error));
    } else {
      let transactionData = await srcTokenContract.methods
        .approve(KYBER_NETWORK_PROXY_ADDRESS, srcAmount)
        .encodeABI();

      await this.props.tomo.web3.eth
        .sendTransaction({
          from: this.props.tomo.account, //obtained from your wallet application
          to: this.state.tokenAddress,
          data: transactionData
        })
        .on('transactionHash', (hash) => {
          this.setState({ approving: true });
        })
        .on('receipt', (reciept) => {
          this.setState({ approved: true });
        });
    }
    this.props.toggle();
  };
  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader></ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <b>From:</b>
              </Col>
              <Col></Col>
              <Col>
                <b>To: </b>
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col xs='3'>
                <Dropdown isOpen={this.state.isDropdownOpen} toggle={this.handelDropdownToggle}>
                  <DropdownToggle className='toggle'>
                    <Row>
                      <Col>
                        <img src={this.state.currentToken} width='28' alt='Token' />
                      </Col>
                      <Col>{this.state.name}</Col>
                    </Row>
                  </DropdownToggle>
                  <DropdownMenu>
                    {Token.map((item) => (
                      <DropdownItem
                        key={item.name}
                        onClick={() => {
                          this.changeToken(item.src, item.name, item.address);
                        }}
                      >
                        <Row>
                          <Col>
                            <img src={item.src} width='28' alt={item.name} />
                          </Col>
                          <Col>{item.name}</Col>
                        </Row>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </Col>
              <Col xs='3'>
                <Row>
                  <Input type='text' value={this.state.tokenValue} onChange={this.handleChange} />
                </Row>
              </Col>
              <Col xs='3'>
                <Dropdown>
                  <DropdownToggle className='toggle'>
                    <Row>
                      <Col>
                        <img
                          src='https://files.kyber.network/DesignAssets/tokens/eth.svg'
                          width='28'
                          alt='Token'
                        />
                      </Col>
                      <Col>ETH</Col>
                    </Row>
                  </DropdownToggle>
                </Dropdown>
              </Col>
              <Col xs='3'>
                <Row>
                  <Input type='text' value={this.state.value} onChange={this.handleChangeETH} />
                </Row>
              </Col>
            </Row>
            <Row>
              <Col></Col>
              <Col>
                <div className='rate'>
                  1 {this.state.name} = {Math.round(this.state.rate * 1000) / 1000} ETH ={' '}
                  {Math.round(this.state.rateUSD * 1000) / 1000} USD
                </div>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Col>
              <p
                style={{
                  color: this.state.changeETH >= 0 ? 'green' : 'red'
                }}
              >
                ETH: {Math.round(this.state.changeETH * 1000) / 1000} %
              </p>
            </Col>
            <Col>
              <p
                style={{
                  color: this.state.changeUSD >= 0 ? 'green' : 'red'
                }}
              >
                USD: {Math.round(this.state.changeUSD * 1000) / 1000} %
              </p>
            </Col>
            {this.state.approved ? (
              <Button color='success' onClick={this.handleSwapTokenClick(this.state.tokenValue)}>
                Swap
              </Button>
            ) : (
              <Button color='warning' onClick={this.handleSwapTokenClick(this.state.tokenValue)}>
                Approve
              </Button>
            )}

            <Button color='danger' onClick={this.props.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tomo: state.tomo
  };
};

export default compose(connect(mapStateToProps))(FeedPetModal);

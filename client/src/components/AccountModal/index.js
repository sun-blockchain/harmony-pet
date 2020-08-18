import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import QRCode from 'qrcode.react';
import './AccountModal.css';

class AccountModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          toggle={this.props.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.toggle}>Account </ModalHeader>
          <ModalBody>
            <div className='qr-code'>
              <QRCode
                renderAs='svg'
                value={this.props.account}
                size={250}
                level={'H'}
                includeMargin={true}
              />
            </div>
            <div className='account-address' title='Copy to clipboard'>
              Address : {this.props.account}
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default AccountModal;

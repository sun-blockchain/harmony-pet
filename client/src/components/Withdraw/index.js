import React from 'react';
import './index.css';
import { Row, Col } from 'reactstrap';
const Withdraw = (props) => {
  return (
    <div>
      <Row>
        <img src={props.item.src} className='withdrawImg' alt='null' />
      </Row>
      <Row>
        <Col>-{props.item.value}%</Col>
      </Row>
    </div>
  );
};
export default Withdraw;

import React from 'react';
import './index.css';
import { Row, Col } from 'reactstrap';
const Food = (props) => {
  return (
    <div>
      <Row>
        <img src={props.item.src} className='foodImg' alt='null' />
      </Row>
      <Row>
        <Col>+{props.item.value}</Col>
      </Row>
    </div>
  );
};
export default Food;

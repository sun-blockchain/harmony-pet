import React from 'react';
import { Card, CardHeader, CardFooter } from 'reactstrap';
import 'components/Card/Card.scss';

class NewCard extends React.Component {
  render() {
    return (
      <div
        className='card-item card-item-new carousel-padding'
        onClick={this.props.onClick}
        style={this.props.styleCard}
      >
        <Card>
          <CardHeader className='card-header'>
            <img alt='...' className='img-center img-fluid item-img-new' src={this.props.src} />
          </CardHeader>
          <CardFooter>
            <p id='pet-info'>Pet Infomation</p>
            <p>
              <span>Fund: </span>
              <span>{this.props.targetFund}</span>
              <span> ONE</span>
            </p>
            <p>
              <span>Duration: </span>
              <span>{this.props.duration}</span>
              <span> days</span>
            </p>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default NewCard;

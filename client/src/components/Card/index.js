import React from 'react';
import { Card, CardTitle, CardBody, CardHeader, Progress } from 'reactstrap';
import 'components/Card/Card.scss';
import { Link } from 'react-router-dom';
import Pet from 'constants/PetInformation';
const PetCard = (props) => {
  return (
    <div className='card-item '>
      <Link to={`/pets/${props.pet.address}`}>
        <Card className='maincard'>
          <CardHeader className='card-header'>
            <img alt='...' className='img-center img-fluid item-img' src={Pet[props.pet.id].src} />
          </CardHeader>
          <CardBody>
            <CardTitle>{props.pet.purpose ? props.pet.purpose : 'Unknown'} </CardTitle>
            <Progress animated color='danger' value={(props.pet.time / props.pet.duration) * 100}>
              Age: {Math.floor(props.pet.time / 86400)} / {props.pet.duration / 86400} days
            </Progress>
            <br />
            <Progress
              animated
              color='success'
              value={(props.pet.amount / props.pet.targetFund) * 100}
            >
              Size: {props.pet.amount} / {props.pet.targetFund} ONE
            </Progress>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default PetCard;

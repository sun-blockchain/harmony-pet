import React, { Component } from 'react';
import 'components/CarouselNewPet/CarouselNewPet.css';
import NewCard from 'components/Card/NewCard';
import Slider from 'react-slick';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';

class CarouselNewPet extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      focusOnSelect: true
    };

    const slides = this.props.pets.map((item, index) => {
      return (
        <div key={index} data-type={item.type} className='item-pet'>
          <NewCard
            key={index}
            src={item.src}
            targetFund={item.targetFund}
            duration={item.duration}
          />
        </div>
      );
    });

    return (
      <div className='slide-modal'>
        <Slider {...settings}>{slides}</Slider>
      </div>
    );
  }
}

export default CarouselNewPet;

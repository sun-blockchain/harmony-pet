import React, { Component } from 'react';
import PetCard from 'components/Card';
import 'components/CarouselCard/CarouselCard.css';
import Slider from 'react-slick';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';

class CarouselCard extends Component {
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
        <div key={index}>
          <PetCard key={index} pet={item} index={index} />
        </div>
      );
    });
    return (
      <div>
        <Slider {...settings}>{slides}</Slider>
      </div>
    );
  }
}

export default CarouselCard;

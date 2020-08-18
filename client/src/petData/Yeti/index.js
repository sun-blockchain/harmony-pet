import whiteYeti from './whiteYeti';
import pinkYeti from './pinkYeti';
import goldYeti from './goldYeti';
const Yeti = {
  size: [
    {
      scale: 0.5,
      milestone: 0
    },
    {
      scale: 0.75,
      milestone: 25
    },
    {
      scale: 1,
      milestone: 50
    },
    {
      scale: 1.25,
      milestone: 75
    },
    {
      scale: 1.5,
      milestone: 100
    }
  ],
  progress: [
    {
      index: 0,
      item: whiteYeti,
      milestone: 0,
      src: require('assets/img/whiteYeti.png')
    },
    {
      index: 1,
      item: pinkYeti,
      milestone: 50,
      src: require('assets/img/pinkYeti.png')
    },
    {
      index: 2,
      item: goldYeti,
      milestone: 100,
      src: require('assets/img/goldYeti.png')
    }
  ],
  background: {
    src: require('assets/img/background1.png'),
    scaleX: 0.7,
    scaleY: 0.75
  }
};
export default Yeti;

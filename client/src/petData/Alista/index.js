import alista1 from './alista1';
import alista2 from './alista2';

const Alista = {
  size: [
    {
      scale: 0.5,
      milestone: 0
    },
    {
      scale: 1,
      milestone: 25
    },
    {
      scale: 1.5,
      milestone: 50
    }
  ],
  progress: [
    {
      index: 0,
      item: alista1,
      milestone: 0,
      src: require('assets/img/alista.png')
    },
    {
      index: 1,
      item: alista2,
      milestone: 100,
      src: require('assets/img/alista2.png')
    }
  ],
  background: {
    src: require('assets/img/background4.png'),
    scaleX: 0.5,
    scaleY: 0.5
  }
};
export default Alista;

import dodo1 from './dodo1';
import dodo2 from './dodo2';
import dodo3 from './dodo3';

const Dodo = {
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
    }
  ],
  progress: [
    {
      index: 0,
      item: dodo1,
      milestone: 0,
      src: require('assets/img/dodo1.png')
    },
    {
      index: 1,
      item: dodo2,
      milestone: 50,
      src: require('assets/img/dodo2.png')
    },
    {
      index: 2,
      item: dodo3,
      milestone: 100,
      src: require('assets/img/dodo3.png')
    }
  ],
  background: {
    src: require('assets/img/background.png'),
    scaleX: 0.25,
    scaleY: 0.3
  }
};
export default Dodo;

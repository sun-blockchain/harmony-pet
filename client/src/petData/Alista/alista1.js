const idle = {
  images: [require('assets/sprites/alista/idle.png')],

  framerate: 10,
  frames: [
    [97, 1, 94, 124, 0, 44.9, 110.1], //1
    [1, 1, 94, 125, 0, 44.9, 110.99], //2
    [98, 127, 94, 124, 0, 44.9, 110.1], //3
    [1, 128, 95, 123, 0, 45.38, 109.22] //4
  ],

  animations: {
    'idle(2)': { frames: [0] },
    'idle(4)': { frames: [1] },
    'idle(1)': { frames: [2] },
    'idle(3)': { frames: [3] }
  }
};
const walk = {
  images: [require('assets/sprites/alista/walk.png')],

  framerate: 10,
  frames: [
    [1, 1, 96, 125, 0, 45.86, 110.99], //2
    [207, 1, 100, 123, 0, 47.77, 109.22], //3
    [99, 1, 106, 124, 0, 50.64, 110.1], //4
    [309, 1, 95, 123, 0, 45.38, 109.22] //1
  ],

  animations: {
    'walk(2)': { frames: [0] },
    'walk(4)': { frames: [1] },
    'walk(3)': { frames: [2] },
    'walk(1)': { frames: [3] }
  }
};
const dead = {
  images: [require('assets/sprites/alista/dead.png')],

  framerate: 10,
  frames: [
    [463, 1, 125, 115, 0, 51, 103],
    [332, 1, 129, 115, 0, 56, 103],
    [590, 1, 140, 114, 0, 66.88, 101.22],
    [173, 1, 157, 116, 0, 75, 103],
    [1, 1, 170, 116, 0, 83, 103],
    [732, 1, 100, 112, 0, 53, 102]
  ],

  animations: {
    'dead(8)': { frames: [0] },
    'dead(7)': { frames: [1] },
    'dead(5)': { frames: [2] },
    'dead(4)': { frames: [3] },
    'dead(6)': { frames: [4] },
    'dead(9)': { frames: [5] }
  }
};
const alista1 = {
  idle,
  walk,
  dead
};
export default alista1;

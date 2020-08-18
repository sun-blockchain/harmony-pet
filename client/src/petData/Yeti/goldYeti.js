const walk = {
  images: [require('assets/sprites/goldYeti/walk.png')],

  framerate: 5,
  frames: [
    [1, 1, 104, 111, 0, 52, 111],
    [332, 1, 112, 104, 0, 56, 104],
    [107, 1, 100, 107, 0, 50, 107],
    [209, 1, 121, 104, 0, 60.5, 104]
  ],

  animations: {
    '3': { frames: [0] },
    '4': { frames: [3] },
    '5': { frames: [1] },
    '6': { frames: [2] }
  }
};
const idle = {
  images: [require('assets/sprites/goldYeti/idle.png')],

  framerate: 5,
  frames: [
    [1, 1, 100, 107, 0, 50, 107],
    [103, 1, 100, 107, 0, 50, 107],
    [205, 1, 100, 107, 0, 50, 107]
  ],

  animations: {
    '8': { frames: [1] },
    '9': { frames: [2] },
    '10': { frames: [0] }
  }
};
const dead = {
  images: [require('assets/sprites/goldYeti/dead.png')],

  framerate: 5,
  frames: [
    [1, 1, 100, 107, 0, 100, 107],
    [177, 96, 113, 93, 0, 113, 93],
    [103, 1, 115, 93, 0, 115, 93],
    [1, 110, 174, 64, 0, 174, 64],
    [292, 1, 172, 63, 0, 172, 63],
    [292, 66, 170, 63, 0, 170, 63],
    [292, 131, 170, 63, 0, 170, 63]
  ],

  animations: {
    '113': { frames: [0] },
    '114': { frames: [3] },
    '115': { frames: [2] },
    '116': { frames: [1] },
    '117': { frames: [4] },
    '118': { frames: [5] },
    '119': { frames: [6] }
  }
};

const goldYeti = {
  walk,
  idle,
  dead
};
export default goldYeti;

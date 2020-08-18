export const walk = {
  images: [require('assets/sprites/whiteYeti/walk.png')],

  framerate: 5,
  frames: [
    [1, 1, 104, 111, 0, 51, 104],
    [332, 1, 112, 104, 0, 61, 97],
    [107, 1, 100, 107, 0, 52, 100],
    [209, 1, 121, 104, 0, 62, 99]
  ],

  animations: {
    'walk(1)': { frames: [0] },
    'walk(2)': { frames: [3] },
    'walk(3)': { frames: [1] },
    'walk(4)': { frames: [2] }
  }
};
export const idle = {
  images: [require('assets/sprites/whiteYeti/idle.png')],

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
export const dead = {
  images: [require('assets/sprites/whiteYeti/dead.png')],

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
    '147': { frames: [0] },
    '148': { frames: [3] },
    '149': { frames: [2] },
    '150': { frames: [1] },
    '151': { frames: [4] },
    '152': { frames: [5] },
    '153': { frames: [6] }
  }
};
export const attack = {
  images: [require('assets/sprites/whiteYeti/attack.png')],

  framerate: 20,
  frames: [
    [1, 1, 132, 187, 0, 117, 179],
    [135, 1, 105, 187, 0, 90, 179],
    [242, 1, 210, 108, 0, 196, 100],
    [242, 111, 189, 96, 0, 175, 86],
    [433, 111, 176, 96, 0, 162, 86],
    [454, 1, 175, 96, 0, 162, 86],
    [611, 99, 175, 96, 0, 163, 85]
  ],

  animations: {
    '28': { frames: [0] },
    '29': { frames: [1] },
    '32': { frames: [2] },
    '33': { frames: [3] },
    '34': { frames: [4] },
    '35': { frames: [5] },
    '36': { frames: [6] }
  }
};
const whiteYeti = {
  walk,
  idle,
  dead,
  attack
};
export default whiteYeti;

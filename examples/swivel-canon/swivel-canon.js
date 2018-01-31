"use strict";

let game = new MicroCanvas();

let gfxCanonBase, gfxCanPos0, gfxCanPos1, gfxCanPos2, gfxCanPos3, gfxCanPos4, gfxCanPos5, gfxCanPos6, gfxCanPos7, gfxCanPos8;
let rocketX, rocketY, canonPos, lastChangeFrame, rocketDir, lastFireFrame;

let changeRate = 15; // Number of frames
let fireRate = 30;

game.setup(function() {
  gfxCanonBase = game.loadSprite(`! gfx_canon 9x6
    ....#....
    ...###...
    ..#####..
    ..##.##..
    .##...##.
    #########
  `);

  gfxCanPos0 =  game.loadSprite(`! gfx_muzzle 9x5
    .........
    .........
    .........
    .........
    #####....
  `)

  gfxCanPos1 =  game.loadSprite(`! gfx_muzzle 9x5
    .........
    .........
    ##.......
    ..#......
    ...##....
  `)

  gfxCanPos2 =  game.loadSprite(`! gfx_muzzle 9x5
    #........
    .#.......
    ..#......
    ...#.....
    ....#....
  `)


  gfxCanPos3 =  game.loadSprite(`! gfx_muzzle 9x5
    ..#......
    ..#......
    ...#.....
    ....#....
    ....#....
  `)

  gfxCanPos4 =  game.loadSprite(`! gfx_muzzle 9x5
    ....#....
    ....#....
    ....#....
    ....#....
    ....#....
  `)

  gfxCanPos5 =  game.loadSprite(`! gfx_muzzle 9x5
    ......#..
    ......#..
    .....#...
    ....#....
    ....#....
  `)

  gfxCanPos6 =  game.loadSprite(`! gfx_muzzle 9x5
    ........#
    .......#.
    ......#..
    .....#...
    ....#....
  `)

  gfxCanPos7 =  game.loadSprite(`! gfx_muzzle 9x5
    .........
    .........
    .......##
    ......#..
    ....##...
  `)

  gfxCanPos8 =  game.loadSprite(`! gfx_muzzle 9x5
    .........
    .........
    .........
    .........
    ....#####
  `)

  rocketY = 0;
  canonPos = 4;
  lastChangeFrame = game.frameCount;
  lastFireFrame = game.frameCount;
});

game.loop(function () {
  game.clear();

  game.drawImage(gfxCanonBase, game.width/2 - gfxCanonBase.width/2, game.height - gfxCanonBase.height);

  let canonGfx
  switch(canonPos) {
    case 0:
      canonGfx = gfxCanPos0;
      break;
    case 1:
      canonGfx = gfxCanPos1;
      break;
    case 2:
      canonGfx = gfxCanPos2;
      break;
    case 3:
      canonGfx = gfxCanPos3;
      break;
    case 4:
      canonGfx = gfxCanPos4;
      break;
    case 5:
      canonGfx = gfxCanPos5;
      break;
    case 6:
      canonGfx = gfxCanPos6;
      break;
    case 7:
      canonGfx = gfxCanPos7;
      break;
    case 8:
      canonGfx = gfxCanPos8;
      break;
  }
  game.drawImage(canonGfx, game.width/2 - canonGfx.width/2, game.height - gfxCanonBase.height - canonGfx.height + 1);

  if (game.frameCount - lastFireFrame > fireRate) {
    /// Fire new rocket
    if (game.buttonPressed('space')) {
      switch(canonPos) {
        case 0:
          rocketY = game.height - gfxCanonBase.height;
          rocketX = game.width / 2 - canonGfx.width / 2;
          break;
        case 1:
          rocketY =  game.height - gfxCanonBase.height - 2;
          rocketX = game.width / 2 - canonGfx.width / 2;
          break;
        case 2:
          rocketY =  game.height - gfxCanonBase.height - canonGfx.height;
          rocketX = game.width / 2 - canonGfx.width / 2;
          break;
        case 3:
          rocketY =  game.height - gfxCanonBase.height - canonGfx.height;
          rocketX = game.width / 2 - canonGfx.width / 2 + 2;
          break;
        case 4:
          rocketY =  game.height - gfxCanonBase.height - canonGfx.height;
          rocketX = game.width / 2;
          break;
        case 5:
          rocketY =  game.height - gfxCanonBase.height - canonGfx.height;
          rocketX = game.width / 2 + canonGfx.width / 2 - 2;
          break;
        case 6:
          rocketY =  game.height - gfxCanonBase.height - canonGfx.height;
          rocketX =  game.width / 2 + canonGfx.width / 2;
          break;
        case 7:
          rocketY =  game.height - gfxCanonBase.height - 2;
          rocketX =  game.width / 2 + canonGfx.width / 2;
          break;
        case 8:
          rocketY =  game.height - gfxCanonBase.height;
          rocketX =  game.width / 2 + canonGfx.width / 2;
          break;
      }
      rocketDir = canonPos;
      lastFireFrame = game.frameCount;
    }
  } else {
    // If rocket is still visible, move it towards the top of the screen
    switch(rocketDir) {
      case 0:
        // rocketY = game.height - gfxDefender.height;
        rocketX -= 3;
        break;
      case 1:
        rocketY -= 1;
        rocketX -= 2;
        break;
      case 2:
        rocketY -= 1.5;
        rocketX -= 1.5;
        break;
      case 3:
        rocketY -= 2;
        rocketX -= 1;
        break;
      case 4:
        rocketY -= 3;
        break;
      case 5:
        rocketY -= 2;
        rocketX += 1;
        break;
      case 6:
        rocketY -= 1.5;
        rocketX += 1.5;
        break;
      case 7:
        rocketY -= 1;
        rocketX += 2;
        break;
      case 8:
        rocketX += 3;
        break;
    }
    game.fillRect(Math.round(rocketX), Math.round(rocketY), 1,1);
  }

  if (game.frameCount - lastChangeFrame > changeRate) {
    lastChangeFrame = game.frameCount;
    if (game.buttonPressed('left') && canonPos > 0) {
      canonPos--;
    } else if (game.buttonPressed('right') && canonPos < 8) {
      canonPos++;
    }
  }
});
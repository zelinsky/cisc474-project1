 // A Plyer is an object that has a postion and can move
class Player {
  constructor(x, y, w, h) {
    this._posX = x || 0;
    this._posY = y || 0;
    this._width = w || 0;
    this._height = h || 0;
  }

  get getPos() {
    return {
      x: this._posX,
      y: this._posY
    };
  }

  move(x, y) {
    this._posX += x;
    this._posY += y;
    return this.getPos;
  }

}

// Pacman
class Greg extends Player {
  constructor(x, y) {
    super(x, y, 35, 40);
    this._lives = 3;
    this._poweredUp = false;
  }

}

// Ghosts
class Python extends Player {
  constructor(x, y) {
    super(x, y, 30, 30);
  }

}

/**
 * The Model. Model stores items and notifies
 * observers about changes.
 */
class Model extends EventEmitter {
  constructor() {
    super();
    this._greg = new Greg(200, 200);
    this._pythons = [];
    let x = 200;
    for (let i = 0; i < 4; i++) {
      this._pythons.push(new Python(x, 400));
      x += 150;
    }
  }

  moveGreg(x, y) {
    let newPos = this._greg.move(x, y);
    this.emit("gregMoved", newPos);
  }

  movePythons(x, y) {
    let newPosList = []
    this._pythons.forEach(python => {
      newPosList.push(python.move(x, y));
    });
    this.emit("pythonsMoved", newPosList);
  }

  // TODO:
  // Place sprites back to starting positions (if Greg still has lives left)
  gregEaten() {
    this.emit("loseLife");
    if (--this._greg._lives === 0) { // Decrease life, if 0 lives left, game ends
      this.emit("gameOver", "pythons");
    } else { // Place sprites back to original positions

    }
  }

  // TODO:
  // Send Python back to starting position, available after X seconds.
  pythonEaten(python) {

  }

  checkCollision() {
    this._pythons.forEach(python => {
      if (this._greg._posX < python._posX + python._width &&
        this._greg._posX + this._greg._width > python._posX &&
        this._greg._posY < python._posY + python._height &&
        this._greg._posY + this._greg._height > python._posY) {

          if (this._greg._poweredUp) {
            this.pythonEaten(python);
          } else {
            this.gregEaten();
          }
     }
    });
  }

  // TODO:
  // Check if Greg can eat a pellet at current position
  // Remove the pellet from the game
  // If no pellets left, Greg wins
  eatPellet() {
    let pellet = 0;
    this.emit("eatPellet", pellet);
  }

}

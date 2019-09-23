 // A Plyer is an object that has a postion and can move
class Player {
  constructor(x, y, w, h) {
    this._posX = x;
    this._posY = y;
    this._dir = "right";
    this._lastPress = "";
    this._width = w;
    this._height = h;
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

  setPos(x, y) {
    this._posX = x;
    this._posY = y;
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
    this._maze = new MazeNodes();
    this._greg = new Greg(this._maze.NodeList[0].x - 20, this._maze.NodeList[0].y - 20);
    this._pythons = [];
    this._speed = 3;
    for (let i = 0; i < 4; i++) {
      this._pythons.push(new Python(this._maze.NodeList[48].x - 20, this._maze.NodeList[48].y - 20));
    }
    this.emit("gregMoved", this._greg.move(0, 0));
    this.emit("debugLightChanged", this._maze.nodeCollide(this._greg.getPos.x, this._greg.getPos.y));
  }

  /*moveGreg(x, y) {
    let newPos = this._greg.move(x, y);
    this.emit("gregMoved", newPos);
    this.emit("debugLightChanged", this._maze.nodeCollide(newPos.x, newPos.y));
  }*/

  moveGreg(dir) {  // This function is an atrocity and needs to be fixed
    var actualX = 0;
    var actualY = 0;
    if (!this._maze.nodeCollide(this._greg.getPos.x, this._greg.getPos.y)) {
      this._greg._lastPress = dir; // case for being in the middle of an edge
      //console.log("Set lastPress to " + dir);
    } else {
      if (!this._maze.dirClear(this._greg.getPos.x, this._greg.getPos.y, dir)) {
        if (!this._maze.dirClear(this._greg.getPos.x, this._greg.getPos.y, this._greg._dir)) {
          if (!this._maze.dirClear(this._greg.getPos.x, this._greg.getPos.y, this._greg._lastPress)) {
            //console.log("C1 [Input: " + dir + ", Current: " + this._greg._dir + ", LastPress: " + this._greg._lastPress + "] DECISION: stop");
            this._greg._dir = "stop";   // case for the last key, current dir, and input are blocked
          } else {
            //console.log("C2 [Input: " + dir + ", Current: " + this._greg._dir + ", LastPress: " + this._greg._lastPress + "] DECISION: " + this._greg._lastPress);
            this._greg._dir = this._greg._lastPress;  // case for the current dir and input are blocked but the last key is good
          }
        } else {
          //console.log("C3 [Input: " + dir + ", Current: " + this._greg._dir + ", LastPress: " + this._greg._lastPress + "] DECISION: " + this._greg._dir);
          this._greg._lastPress = dir; // case for if the input is blocked but current is good
        }
      } else {
        //console.log("Input looks clear, going to node " + this._maze.dirClear(this._greg.getPos.x, this._greg.getPos.y, dir).id
        //            + ", Input: " + dir + ", X: " + this._greg.getPos.x + ", Y: " + this._greg.getPos.y);
        //console.log("C4 [Input: " + dir + ", Current: " + this._greg._dir + ", LastPress: " + this._greg._lastPress + "] DECISION: " + dir);
        this._greg._dir = dir;   // case for if the input dir is unblocked
      }
    }
    switch (this._greg._dir) {  // handles updates for above branches
      case "left":
        actualX = -this._speed;
        actualY = 0;
        break;
      case "up":
        actualX = 0;
        actualY = -this._speed;
        break;
      case "right":
        actualX = this._speed;
        actualY = 0;
        break;
      case "down":
        actualX = 0;
        actualY = this._speed;
        break;
      default:
        actualX = 0;
        actualY = 0;
        this._greg._lastPress = "";
    }
    this.emit("gregMoved", this._greg.move(actualX, actualY));
    this.emit("debugLightChanged", this._maze.nodeCollide(this._greg.getPos.x, this._greg.getPos.y));
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

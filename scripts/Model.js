// A Plyer is an object that has a postion and can move
class Player {
  constructor(x, y, w, h) {
    this._posX = x;
    this._posY = y;
    this._dir = "";
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
class Semicolon extends EventEmitter {
  constructor(x, y, id) {
    super();
    this._posX = x;
    this._posY = y;
    this._width = 3;
    this._height = 13;
    this._visible = true;
  }
}

/**
 * The Model. Model stores items and notifies
 * observers about changes.
 */
class Model extends EventEmitter {
  constructor() {
    super();
    this._speed = 10;
    this._maze = new MazeNodes(this._speed);
    this._pelletData = new PelletData();
    this._greg = new Greg(this._maze.NodeList[48].x - this._maze.OFFSET, 
                          this._maze.NodeList[48].y - this._maze.OFFSET);
    //console.log(this._maze.NodeList[48].x - 20);
    //console.log(this._maze.NodeList[48].y - 20);
    this._score = 0;
    this._pythons = [];
    let pythonStart = [0, 6, 119, 126];
    this._semicolonsEaten = 0;
    for (let i = 0; i < 4; i++) {
      this._pythons.push(new Python(this._maze.NodeList[pythonStart[i]].x - this._maze.OFFSET, 
                                    this._maze.NodeList[pythonStart[i]].y - this._maze.OFFSET));
      //console.log(this._maze.NodeList[pythonStart[i]].x - 20);
      //console.log(this._maze.NodeList[pythonStart[i]].y - 20);
    }
    
    this._semicolons = [];
    for (let i = 0; i < this._pelletData._yCoords.length; i++) {
      for (let j = 0; j < this._pelletData._xCoords.length; j++) {
        if (this._pelletData._pelletMap[i][j]) {
          this._semicolons.push(new Semicolon(this._pelletData._xCoords[j] - this._pelletData.X_PELLET_OFFSET, 
                                              this._pelletData._yCoords[i] - this._pelletData.Y_PELLET_OFFSET));
        }
      }
    }
    this._numberOfSemicolons = this._semicolons.length;
    //this.emit("gregMoved", this._greg.move(0, 0));
    //this.emit("debugLightChanged", this._maze.nodeCollide(this._greg.getPos.x, this._greg.getPos.y));
  }
  

  /*moveGreg(x, y) {
    let newPos = this._greg.move(x, y);
    this.emit("gregMoved", newPos);
    this.emit("debugLightChanged", this._maze.nodeCollide(newPos.x, newPos.y));
  }*/

  movePlayer(player, dir) {
    var actualX = 0;
    var actualY = 0;
    if (!this._maze.nodeCollide(player.getPos.x, player.getPos.y)) {
      player._lastPress = dir; // case for being in the middle of an edge
      switch (dir) {
        case ("left"):
          if (player._dir == "right") {
            player._dir = dir;
          }
          break;
        case ("right"):
          if (player._dir == "left") {
            player._dir = dir;
          }
          break;
        case ("up"):
          if (player._dir == "down") {
            player._dir = dir;
          }
          break;
        case ("down"):
          if (player._dir == "up") {
            player._dir = dir;
          }
          break;
        default:
          break;
      }
      player._lastPress = dir; // case for being in the middle of an edge
      //console.log("Set lastPress to " + dir);
    } else {
      if (!this._maze.dirClear(player.getPos.x, player.getPos.y, dir)) {
        if (!this._maze.dirClear(player.getPos.x, player.getPos.y, player._dir)) {
          if (!this._maze.dirClear(player.getPos.x, player.getPos.y, player._lastPress)) {
            //console.log("C1 [Input: " + dir + ", Current: " + player._dir + ", LastPress: " + player._lastPress + "] DECISION: stop");
            player._dir = "stop";   // case for the last key, current dir, and input are blocked
          } else {
            //console.log("C2 [Input: " + dir + ", Current: " + player._dir + ", LastPress: " + player._lastPress + "] DECISION: " + player._lastPress);
            player._dir = player._lastPress;  // case for the current dir and input are blocked but the last key is good
          }
        } else {
          //console.log("C3 [Input: " + dir + ", Current: " + player._dir + ", LastPress: " + player._lastPress + "] DECISION: " + player._dir);
          player._lastPress = dir; // case for if the input is blocked but current is good
        }
      } else {
        //console.log("Input looks clear, going to node " + this._maze.dirClear(player.getPos.x, player.getPos.y, dir).id
        //            + ", Input: " + dir + ", X: " + player.getPos.x + ", Y: " + player.getPos.y);
        //console.log("C4 [Input: " + dir + ", Current: " + player._dir + ", LastPress: " + player._lastPress + "] DECISION: " + dir);
        player._dir = dir;   // case for if the input dir is unblocked
      }
    }
    var node = this._maze.collidingNode(player.getPos.x, player.getPos.y);
    switch (player._dir) {  // handles updates for above branches
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
        player._lastPress = "";
    }

    return {x: actualX, y: actualY, node: node};
  }

  shiftSnap(shiftData, mover) {
    if (shiftData.x == 0) {
      shiftData.x = shiftData.node.x - this._maze.OFFSET - mover._posX;
      //console.log("Shifted greg over in x by " + shift.x + " using nodeX:" + shift.node.x + ", offset:", + this._maze.OFFSET + ", gregX: " + this._greg._posX);
    }
    if (shiftData.y == 0) {
      shiftData.y = shiftData.node.y - this._maze.OFFSET - mover._posY;
      //console.log("Shifted greg over in y by " + shift.y + " using nodeY:" + shift.node.y + ", offset:", + this._maze.OFFSET + ", gregY: " + this._greg._posY);
    }
    return shiftData;
  }

  moveGreg(dir) {
    let shift = this.movePlayer(this._greg, dir);
    var diff = 0;
    if (shift.node) {
      shift = this.shiftSnap(shift, this._greg);
    }
    this.emit("gregMoved", this._greg.move(shift.x, shift.y));
    //this.emit("debugLightChanged", this._maze.nodeCollide(this._greg.getPos.x, this._greg.getPos.y));
  }

  movePythons(dir) {
    var shift;
    let newPosList = []
    this._pythons.forEach(python => {
      shift = this.movePlayer(python, dir);
      if (shift.node) {
        shift = this.shiftSnap(shift, python);
      }
      newPosList.push(python.move(shift.x, shift.y));
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
  pythonEaten(index) {
    /*once the powerup is working this line will be:
     this._score += pythonsEatenSincePoweredUp * 200        */
    this._score += 100; 
    this.emit("updateScore", this._score);
    this._pythons[index]._posX = this._maze.NodeList[48].x -this._maze.OFFSET;
    this._pythons[index]._posY = this._maze.NodeList[48].y -this._maze.OFFSET;
    this.emit("eatPython", index);
  }

  checkCollision() {
    this._pythons.forEach((python,index) => {
      if (this._greg._posX < python._posX + python._width &&
        this._greg._posX + this._greg._width > python._posX &&
        this._greg._posY < python._posY + python._height &&
        this._greg._posY + this._greg._height > python._posY) {
         if (true){ // if (this._greg._poweredUp) {
          this.pythonEaten(index);
        } else {
          this.gregEaten();
        }
      }
    });
    this._semicolons.forEach((semicolon, index) => {
      if (this._greg._posX < semicolon._posX + semicolon._width &&
        this._greg._posX + this._greg._width > semicolon._posX &&
        this._greg._posY < semicolon._posY + semicolon._height &&
        this._greg._posY + this._greg._height > semicolon._posY && semicolon._visible)
        {
          this._score += 10;
          this.emit("updateScore", this._score);
          this._semicolonsEaten++;
          if (this._semicolonsEaten == this._numberOfSemicolons){
            this.emit("gameOver", "greg");
          }
          semicolon._visible = false;
          this.emit("eatSemicolon", index);
        } 
  });
  }


  

}

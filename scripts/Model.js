// A Plyer is an object that has a postion and can move
class Player {
  constructor(x, y, w, h, s) {
    this._posX = x;
    this._posY = y;
    this._dir = "";
    this._lastPress = "";
    this._width = w;
    this._height = h;
    this._speed = s;
    this._powerTimer = null;
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
  constructor(x, y, s) {
    super(x, y, 28, 28, s);
    this._lives = 3;
    this._poweredUp = false;
  }
}

// Ghosts
class Python extends Player {
  constructor(x, y, s) {
    super(x, y, 22, 22, s);
  }
}

class Semicolon extends EventEmitter {
  constructor(x, y, pu) {
    super();
    this._visible = true;
    if (pu === 2) {
      this._posX = x-4;
      this._posY = y-2;
      this._width = 14;
      this._height = 19;
      this._powerUp = true;
    } else {
      this._posX = x;
      this._posY = y;
      this._width = 3;
      this._height = 13;
      this._powerUp = false;
    }
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
    let screenWidth = $(window).width();
    let imageWidth = 867;
    let xOff = Math.floor((screenWidth / 2) - (imageWidth / 2));
    this._maze = new MazeNodes(this._speed, xOff);
    this._pelletData = new PelletData(xOff);
    this._greg = new Greg(this._maze.NodeList[48].x - this._maze.OFFSET,
      this._maze.NodeList[48].y - this._maze.OFFSET, this._speed);
    this._score = 0;
    this._pythons = [];
    this._pythonStartPos = [0, 6, 119, 126];
    this._semicolonsEaten = 0;
    for (let i = 0; i < 4; i++) {
      this._pythons.push(new Python(this._maze.NodeList[this._pythonStartPos[i]].x - this._maze.OFFSET,
        this._maze.NodeList[this._pythonStartPos[i]].y - this._maze.OFFSET, this._speed-1));
    }
    
    this._semicolons = [];
    for (let i = 0; i < this._pelletData._yCoords.length; i++) {
      for (let j = 0; j < this._pelletData._xCoords.length; j++) {
        if (this._pelletData._pelletMap[i][j]) {
          this._semicolons.push(new Semicolon(this._pelletData._xCoords[j] - this._pelletData.X_PELLET_OFFSET,
            this._pelletData._yCoords[i] - this._pelletData.Y_PELLET_OFFSET,
            this._pelletData._pelletMap[i][j]));
        }
      }
    }
    this._numberOfSemicolons = this._semicolons.length;
  }

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
            player._dir = "stop";   // case for the last key, current dir, and input are blocked
          } else {
            player._dir = player._lastPress;  // case for the current dir and input are blocked but the last key is good
          }
        } else {
          player._lastPress = dir; // case for if the input is blocked but current is good
        }
      } else {
        player._dir = dir;   // case for if the input dir is unblocked
      }
    }
    var node = this._maze.collidingNode(player.getPos.x, player.getPos.y);
    switch (player._dir) {  // handles updates for above branches
      case "left":
        actualX = -player._speed;
        actualY = 0;
        break;
      case "up":
        actualX = 0;
        actualY = -player._speed;
        break;
      case "right":
        actualX = player._speed;
        actualY = 0;
        break;
      case "down":
        actualX = 0;
        actualY = player._speed;
        break;
      default:
        actualX = 0;
        actualY = 0;
        player._lastPress = "";
    }

    return { x: actualX, y: actualY, node: node };
  }

  shiftSnap(shiftData, mover) {
    if (shiftData.x == 0) {
      shiftData.x = shiftData.node.x - this._maze.OFFSET - mover._posX;
    }
    if (shiftData.y == 0) {
      shiftData.y = shiftData.node.y - this._maze.OFFSET - mover._posY;
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
  }

  movePythonsAI(dirList) {
    var shift;
    let newPosList = []
    this._pythons.forEach((python, index) => {
      
      if (this._maze.nodeCollide(python._posX, python._posY)){
        let node = this._maze.collidingNode(python._posX, python._posY); 
        let adjacent_nodes = node.adjacency;
        let min = -42; 
        if (!this._greg._poweredUp){
          min = Number.MAX_VALUE; 
        } 
        else{ 
          min = Number.MIN_VALUE; 
        }
        let adj = null; 
        for (let i = 0; i < adjacent_nodes.length; i++){
          let curr = this._maze.NodeList[adjacent_nodes[i]]; 
          let dist = Math.sqrt(Math.pow((curr.x - this._greg._posX), 2) + Math.pow((curr.y - this._greg._posY), 2) ); 
          if (!this._greg._poweredUp && dist < min){
            adj = curr; 
            min = dist; 
          }
          if (this._greg._poweredUp && dist > min){
            adj = curr; 
            min = dist; 
          }
        } // get first adjacent node in list (could be random) 
        if (index % 2 == 0 || python._dir == "stop"){
          adj = this._maze.NodeList[adjacent_nodes[Math.floor(Math.random()*adjacent_nodes.length)]];
        } 
      
        if (Math.abs(python._posX - adj.x) <= Math.abs(adj.y - python._posY)){
           if (python._posY < adj.y){
             python._dir = "down"; 
           }
           else{
             python._dir = "up"; 
           }
        }
        else{
          if (python._posX < adj.x){
            python._dir = "right"; 
          }
          else{ 
            python._dir = "left";
          }
        }
        
      }
      
      shift = this.movePlayer(python, python._dir);
      if (shift.node) {
        shift = this.shiftSnap(shift, python);
      }
      
      newPosList.push(python.move(shift.x, shift.y));
    });
    this.emit("pythonsMoved", newPosList);
  }
  movePythonsMulti(dirList) {
    var shift;
    let newPosList = []
    this._pythons.forEach((python, index) => {
      
      
      
      shift = this.movePlayer(python, dirList[index]);
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
    this._greg._posX = this._maze.NodeList[48].x - this._maze.OFFSET;
    this._greg._posY = this._maze.NodeList[48].y - this._maze.OFFSET;
    for (let i = 0; i < 4; i++) {
      this._pythons[i]._posX = this._maze.NodeList[this._pythonStartPos[i]].x - this._maze.OFFSET;
      this._pythons[i]._posY = this._maze.NodeList[this._pythonStartPos[i]].y - this._maze.OFFSET;
    }
    this.emit("loseLife");
    if (--this._greg._lives === 0) { // Decrease life, if 0 lives left, game ends
      this.emit("gameOver", "pythons");
    } else { // Place sprite back to original position

    }
  }

  pythonEaten(index) {
    /*once the powerup is working this line will be:
     this._score += pythonsEatenSincePoweredUp * 200        */
    this._score += 100;
    this.emit("updateScore", this._score);
    this._pythons[index]._posX = this._maze.NodeList[48].x - this._maze.OFFSET;
    this._pythons[index]._posY = this._maze.NodeList[48].y - this._maze.OFFSET;
    this.emit("eatPython", index);
  }

  semicolonEaten(semicolon, index) {
    this._semicolonsEaten++;
    if (this._semicolonsEaten == this._numberOfSemicolons) {
      this.emit("gameOver", "greg");
    }
    semicolon._visible = false;
    this.emit("eatSemicolon", index);
    if (!semicolon._powerUp) {
      this._score += 10;
    } else {
      this.emit("changePower", true);
      this._score += 50;
      this._greg._poweredUp = true;
      this._pythons.forEach(python => {
        python._speed = 5;
      });
      if (this._powerTimer) {
        clearTimeout(this._powerTimer);
      }
      this._powerTimer = setTimeout(() => {
        this._greg._poweredUp = false;
        this.emit("changePower", false);
        this._pythons.forEach(python => {
          python._speed = this._speed -1;
        });
      }, 6000);
    }
    this.emit("updateScore", this._score);
  }

  checkCollision() {
    this._pythons.forEach((python, index) => {
      if (this._greg._posX < python._posX + python._width &&
        this._greg._posX + this._greg._width > python._posX &&
        this._greg._posY < python._posY + python._height &&
        this._greg._posY + this._greg._height > python._posY) {
        if (this._greg._poweredUp) {
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
        this._greg._posY + this._greg._height > semicolon._posY && semicolon._visible) {
        this.semicolonEaten(semicolon, index);
      }
    });
  }
}

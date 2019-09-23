/**
 * The Model. Model stores items and notifies
 * observers about changes.
 */
class Player extends EventEmitter {
  constructor(x, y) {
    super();
    this._posX = x || 0;
    this._posY = y || 0;
    this._width = 10;
    this._height = 10;
    this._dir = "right";
    this._lastPress = "none";
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


class Greg extends Player {
  constructor(x, y) {
    super(x, y);
  }

}

class Python extends Player {
  constructor(x, y) {
    super(x, y);
  }

}

class Model extends EventEmitter {
  constructor() {
    super();
    this._maze = new MazeNodes();
    this._greg = new Greg(this._maze.NodeList[0].x - 20, this._maze.NodeList[0].y - 20);
    this._pythons = [];
    this._speed = 8;
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

  moveGreg(x, y, dir) {
    var actualX = 0;
    var actualY = 0;
    if (this._maze.nodeCollide(this._greg.getPos.x, this._greg.getPos.y)) {
      if (this._maze.dirBlocked(this._greg.getPos.x, this._greg.getPos.y, dir)) {
        this._dir = "stop";
        actualX = 0;
        actualY = 0;
      } else {
        this._dir = dir;
        actualX = x;
        actualY = y;
      }
    } else {
      switch (this._dir) {
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
      }
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

}

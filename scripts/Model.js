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
    this._greg = new Greg(this._maze.NodeList[0][0]-20, this._maze.NodeList[0][1]-20);
    this._pythons = [];
    for (let i = 0; i < 4; i++) {
      this._pythons.push(new Python(this._maze.NodeList[48][0]-20, this._maze.NodeList[48][1]-20));
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

}

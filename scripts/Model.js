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

}

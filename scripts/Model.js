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
    this._greg = new Greg(this._maze.NodeList[48].x - this._maze.OFFSET, this._maze.NodeList[48].y - this._maze.OFFSET);
    //console.log(this._maze.NodeList[48].x - 20);
    //console.log(this._maze.NodeList[48].y - 20);
    this._score = 0;
    this._pythons = [];
    let pythonStart = [0, 6, 119, 126];
    this._semicolonsEaten = 0;
    for (let i = 0; i < 4; i++) {
      this._pythons.push(new Python(this._maze.NodeList[pythonStart[i]].x - this._maze.OFFSET, this._maze.NodeList[pythonStart[i]].y - this._maze.OFFSET));
      //console.log(this._maze.NodeList[pythonStart[i]].x - 20);
      //console.log(this._maze.NodeList[pythonStart[i]].y - 20);
    }
    
    this._semicolons = [];

    for (let i = 0; i < this._pelletData._yCoords.length; i++) {
      for (let j = 0; j < this._pelletData._xCoords.length; j++) {
        if (this._pelletData._pelletMap[i][j]) {
          this._semicolons.push(new Semicolon(this._pelletData._xCoords[j] - this._pelletData.X_PELLET_OFFSET, this._pelletData._yCoords[i] - this._pelletData.Y_PELLET_OFFSET));
        }
      }
    }
 
    /*
    for (let x = this._maze.NodeList[0].x ; x <= this._maze.NodeList[6].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[0].y - 7));
    }
    for (let x = this._maze.NodeList[7].x ; x <= this._maze.NodeList[15].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[7].y - 7));
    }
    for (let x = this._maze.NodeList[16].x ; x <= this._maze.NodeList[18].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[16].y - 7));
    }
    for (let x = this._maze.NodeList[26].x ; x <= this._maze.NodeList[27].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[26].y - 7));
    }
    for (let x = this._maze.NodeList[19].x ; x <= this._maze.NodeList[20].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[19].y - 7));
    }
    for (let x = this._maze.NodeList[21].x ; x <= this._maze.NodeList[22].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[21].y - 7));
    }
    for (let x = this._maze.NodeList[28].x ; x <= this._maze.NodeList[29].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[28].y - 7));
    }
    for (let x = this._maze.NodeList[23].x ; x <= this._maze.NodeList[25].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[23].y - 7));
    }
    for (let x = this._maze.NodeList[30].x ; x <= this._maze.NodeList[34].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[30].y - 7));
    }
    for (let x = this._maze.NodeList[35].x ; x <= this._maze.NodeList[36].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[35].y - 7));
    }
    for (let x = this._maze.NodeList[37].x ; x <= this._maze.NodeList[38].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[37].y - 7));
    }
    for (let x = this._maze.NodeList[39].x ; x <= this._maze.NodeList[43].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[39].y - 7));
    }
    for (let x = this._maze.NodeList[44].x ; x <= this._maze.NodeList[45].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[44].y - 7));
    }
    for (let x = this._maze.NodeList[46].x ; x <= this._maze.NodeList[47].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[46].y - 7));
    }
    for (let x = this._maze.NodeList[49].x ; x <= this._maze.NodeList[50].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[49].y - 7));
    }
    for (let x = this._maze.NodeList[51].x ; x <= this._maze.NodeList[52].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[51].y - 7));
    }
    for (let x = this._maze.NodeList[53].x ; x <= this._maze.NodeList[56].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[53].y - 7));
    }
    for (let x = this._maze.NodeList[57].x ; x <= this._maze.NodeList[61].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[57].y - 7));
    }
    for (let x = this._maze.NodeList[62].x ; x <= this._maze.NodeList[66].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[62].y - 7));
    }
    for (let x = this._maze.NodeList[67].x ; x <= this._maze.NodeList[68].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[67].y - 7));
    }
    for (let x = this._maze.NodeList[69].x ; x <= this._maze.NodeList[73].x +10; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[69].y - 7));
    }
    for (let x = this._maze.NodeList[74].x ; x <= this._maze.NodeList[78].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[74].y - 7));
    }
    for (let x = this._maze.NodeList[79].x ; x <= this._maze.NodeList[80].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[79].y - 7));
    }
    for (let x = this._maze.NodeList[81].x ; x <= this._maze.NodeList[84].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[81].y - 7));
    }
    for (let x = this._maze.NodeList[85].x ; x <= this._maze.NodeList[90].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[85].y - 7));
    }
    for (let x = this._maze.NodeList[91].x ; x <= this._maze.NodeList[94].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[91].y - 7));
    }
    for (let x = this._maze.NodeList[95].x ; x <= this._maze.NodeList[96].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[95].y - 7));
    }
    
    for (let x = this._maze.NodeList[97].x ; x <= this._maze.NodeList[99].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[97].y - 7));
    }

    for (let x = this._maze.NodeList[100].x ; x <= this._maze.NodeList[102].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[100].y - 7));
    }
    for (let x = this._maze.NodeList[103].x ; x <= this._maze.NodeList[104].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[103].y - 7));
    }
    for (let x = this._maze.NodeList[105].x ; x <= this._maze.NodeList[111].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[105].y - 7));
    }
    for (let x = this._maze.NodeList[112].x ; x <= this._maze.NodeList[118].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[112].y - 7));
    }
    for (let x = this._maze.NodeList[119].x ; x <= this._maze.NodeList[120].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[119].y - 7));
    }
    for (let x = this._maze.NodeList[121].x ; x <= this._maze.NodeList[124].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[121].y - 7));
    }
    for (let x = this._maze.NodeList[125].x ; x <= this._maze.NodeList[126].x; x += 15 ){
      this._semicolons.push(new Semicolon(x, this._maze.NodeList[125].y - 7));
    }
    for (let y = this._maze.NodeList[0].y + 23 ; y < this._maze.NodeList[7].y; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[0].x, y -7));
    }
    for (let y = this._maze.NodeList[7].y + 23 ; y < this._maze.NodeList[16].y; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[7].x, y -7));
    }
    for (let y = this._maze.NodeList[1].y + 23 ; y < this._maze.NodeList[8].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[1].x, y -7));
    }
    for (let y = this._maze.NodeList[2].y + 23 ; y < this._maze.NodeList[10].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[2].x, y -7));
    }
    for (let y = this._maze.NodeList[3].y + 23 ; y < this._maze.NodeList[11].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[3].x, y -7));
    }
    for (let y = this._maze.NodeList[4].y + 23 ; y < this._maze.NodeList[12].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[4].x, y -7));
    }
    for (let y = this._maze.NodeList[5].y + 23 ; y < this._maze.NodeList[14].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[5].x, y -7));
    }
    for (let y = this._maze.NodeList[11].y + 20 ; y < this._maze.NodeList[31].y - 5; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[11].x, y -7));
    }
    for (let y = this._maze.NodeList[6].y + 23 ; y < this._maze.NodeList[15].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[6].x, y -7));
    }
    for (let y = this._maze.NodeList[this._maze.OFFSET].y + 23 ; y < this._maze.NodeList[44].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[this._maze.OFFSET].x, y -7));
    }
    for (let y = this._maze.NodeList[18].y ; y < this._maze.NodeList[26].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[18].x, y -7));
    }
    for (let y = this._maze.NodeList[20].y + 20 ; y < this._maze.NodeList[31].y - 15; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[20].x, y -7));
    }
    for (let y = this._maze.NodeList[21].y + 20 ; y < this._maze.NodeList[33].y - 15; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[21].x, y -7));
    }
    for (let y = this._maze.NodeList[9].y + 23 ; y < this._maze.NodeList[27].y ; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[9].x, y -7));
    }
    for (let y = this._maze.NodeList[27].y + 23 ; y < this._maze.NodeList[39].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[27].x, y -7));
    }
    for (let y = this._maze.NodeList[44].y + 23 ; y < this._maze.NodeList[58].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[44].x, y -7));
    }
    for (let y = this._maze.NodeList[57].y + 23 ; y < this._maze.NodeList[67].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[57].x, y -7));
    }
    for (let y = this._maze.NodeList[63].y + 23 ; y < this._maze.NodeList[76].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[63].x, y -7));
    }
    for (let y = this._maze.NodeList[64].y + 23 ; y < this._maze.NodeList[78].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[64].x, y -7));
    }
    for (let y = this._maze.NodeList[66].y + 23 ; y < this._maze.NodeList[80].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[66].x, y -7));
    }
    for (let y = this._maze.NodeList[68].y + 20 ; y < this._maze.NodeList[81].y ; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[68].x, y -7));
    }
    for (let y = this._maze.NodeList[70].y + 20 ; y < this._maze.NodeList[83].y ; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[70].x, y -7));
    }
    for (let y = this._maze.NodeList[30].y + 20 ; y < this._maze.NodeList[40].y - 15; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[30].x, y -7));
    }
    for (let y = this._maze.NodeList[34].y + 20 ; y < this._maze.NodeList[42].y - 15 ; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[34].x, y -7));
    }
    for (let y = this._maze.NodeList[28].y + 20 ; y < this._maze.NodeList[37].y - 15 ; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[28].x, y -7));
    }
    for (let y = this._maze.NodeList[51].y + 20 ; y < this._maze.NodeList[63].y - 15 ; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[51].x, y -7));
    }
    for (let y = this._maze.NodeList[52].y + 20 ; y < this._maze.NodeList[64].y - 15 ; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[52].x, y -7));
    }
    for (let y = this._maze.NodeList[38].y + 20 ; y < this._maze.NodeList[46].y - 15 ; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[38].x, y -7));
    }

    for (let y = this._maze.NodeList[72].y + 20 ; y < this._maze.NodeList[86].y ; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[72].x, y -7));
    }
    for (let y = this._maze.NodeList[75].y + 20 ; y < this._maze.NodeList[89].y ; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[75].x, y -7));
    }
    for (let y = this._maze.NodeList[77].y + 20 ; y < this._maze.NodeList[92].y ; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[77].x, y -7));
    }
    for (let y = this._maze.NodeList[79].y + 20 ; y < this._maze.NodeList[94].y ; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[79].x, y -7));
    }
    for (let y = this._maze.NodeList[94].y + this._maze.OFFSET ; y < this._maze.NodeList[103].y ; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[94].x, y -7));
    }
    for (let y = this._maze.NodeList[81].y + this._maze.OFFSET ; y < this._maze.NodeList[96].y ; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[81].x, y -7));
    }

    for (let y = this._maze.NodeList[81].y + 23 ; y < this._maze.NodeList[96].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[81].x, y -7));
    }
    for (let y = this._maze.NodeList[95].y + 20 ; y < this._maze.NodeList[105].y ; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[95].x, y -7));
    }
    for (let y = this._maze.NodeList[105].y + 20 ; y < this._maze.NodeList[119].y - 10 ; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[105].x, y -7));
    }
    for (let y = this._maze.NodeList[35].y + 23 ; y < this._maze.NodeList[45].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[35].x, y -7));
    }
    for (let y = this._maze.NodeList[45].y + 23 ; y < this._maze.NodeList[49].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[45].x, y -7));
    }
    for (let y = this._maze.NodeList[49].y + 23 ; y < this._maze.NodeList[59].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[49].x, y -7));
    }
    for (let y = this._maze.NodeList[59].y + 23 ; y < this._maze.NodeList[69].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[59].x, y -7));
    }
    for (let y = this._maze.NodeList[82].y + 23 ; y < this._maze.NodeList[107].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[82].x, y -7));
    }
    for (let y = this._maze.NodeList[106].y + 20 ; y < this._maze.NodeList[120].y - 5 ; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[106].x, y -7));
    }
    for (let y = this._maze.NodeList[108].y + 20 ; y < this._maze.NodeList[121].y - 5; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[108].x, y -7));
    }
    for (let y = this._maze.NodeList[110].y + 20 ; y < this._maze.NodeList[122].y - 5 ; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[110].x, y -7));
    }
    for (let y = this._maze.NodeList[113].y + 20 ; y < this._maze.NodeList[123].y - 5; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[113].x, y -7));
    }
    for (let y = this._maze.NodeList[115].y + 20 ; y < this._maze.NodeList[124].y - 5; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[115].x, y -7));
    }
    for (let y = this._maze.NodeList[1this._maze.OFFSET].y + 20 ; y < this._maze.NodeList[125].y - 5; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[1this._maze.OFFSET].x, y -7));
    }
    for (let y = this._maze.NodeList[118].y + 20 ; y < this._maze.NodeList[126].y - 5; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[118].x, y -7));
    }
    for (let y = this._maze.NodeList[98].y + 20 ; y < this._maze.NodeList[109].y - 10; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[98].x, y -7));
    }
    for (let y = this._maze.NodeList[101].y + 20 ; y < this._maze.NodeList[114].y - 10; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[101].x, y -7));
    }
    for (let y = this._maze.NodeList[104].y + 20 ; y < this._maze.NodeList[118].y - 10 ; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[104].x, y -7));
    }

    for (let y = this._maze.NodeList[39].y + 23 ; y < this._maze.NodeList[50].y ; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[39].x, y -7));
    }
    for (let y = this._maze.NodeList[50].y + 23 ; y < this._maze.NodeList[60].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[50].x, y -7));
    }
    for (let y = this._maze.NodeList[60].y + 23 ; y < this._maze.NodeList[71].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[60].x, y -7));
    }
    for (let y = this._maze.NodeList[87].y + 23 ; y < this._maze.NodeList[111].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[87].x, y -7));
    }
    for (let y = this._maze.NodeList[88].y + 23 ; y < this._maze.NodeList[112].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[88].x, y -7));
    }
    for (let y = this._maze.NodeList[46].y + 23 ; y < this._maze.NodeList[52].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[46].x, y -7));
    }
    for (let y = this._maze.NodeList[24].y + 23 ; y < this._maze.NodeList[47].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[24].x, y -7));
    }
    for (let y = this._maze.NodeList[47].y + 23 ; y < this._maze.NodeList[65].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[47].x, y -7));
    }
    for (let y = this._maze.NodeList[40].y + 23 ; y < this._maze.NodeList[53].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[40].x, y -7));
    }
    for (let y = this._maze.NodeList[42].y + 23 ; y < this._maze.NodeList[56].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[42].x, y -7));
    }
    for (let y = this._maze.NodeList[13].y + 23 ; y < this._maze.NodeList[28].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[13].x, y -7));
    }
    for (let y = this._maze.NodeList[43].y + 23 ; y < this._maze.NodeList[51].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[43].x, y -7));
    }
    for (let y = this._maze.NodeList[93].y + 23 ; y < this._maze.NodeList[116].y - 15; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[93].x, y -7));
    }
    for (let y = this._maze.NodeList[54].y + 24 ; y < this._maze.NodeList[73].y - 15; y += 24 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[54].x, y -7));
    }
    for (let y = this._maze.NodeList[55].y + 24 ; y < this._maze.NodeList[74].y - 15; y += 24 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[55].x, y -7));
    }
    for (let y = this._maze.NodeList[55].y + 24 ; y < this._maze.NodeList[74].y - 15; y += 24 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[55].x, y -7));
    }
    for (let y = this._maze.NodeList[10].y + 20 ; y < this._maze.NodeList[19].y + 5; y += 20 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[10].x, y -7));
    }
    for (let y = this._maze.NodeList[12].y + 23 ; y < this._maze.NodeList[22].y; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[12].x, y -7));
    }
    for (let y = this._maze.NodeList[15].y + 23 ; y < this._maze.NodeList[25].y; y += 23 ){
      this._semicolons.push(new Semicolon(this._maze.NodeList[15].x, y -7));
    } */
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

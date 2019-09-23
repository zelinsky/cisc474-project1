/**
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */
class Controller {
  constructor(model, view) {
    this._model = model;
    this._view = view;
    this._speed = 8;  
    this.start = document.getElementById("start"); 
    this.start.addEventListener('click', function(evt){
         if (view._gameState == "stop"){
             view.setGregDir("right"); 
             view.setPythonDir("right"); 
         }
    }); 
    this.stop = document.getElementById("stop"); 
    this.stop.addEventListener('click', function(evt){
        
        if (view._gregUpdate) {
          clearInterval(view._gregUpdate);
          delete view._gregUpdate;
          view._gregDir = "stop";
        }
        if (view._pythonUpdate) {
          clearInterval(view._pythonUpdate);
          delete view._pythonUpdate;
          view._gregDir = "stop";
        }
        
    }); 

    view.on("gregMove", (dir) => this.moveGreg(dir));
    view.on("pythonsMove", (dir) => this.movePythons(dir));
  }
  
  moveGreg(dir) {
    switch (dir) {
      case "left":
        this._model.moveGreg(-this._speed, 0);
        break;
      case "up":
        this._model.moveGreg(0, -this._speed);
        break;
      case "right":
        this._model.moveGreg(this._speed, 0);
        break;
      case "down":
        this._model.moveGreg(0, this._speed);
        break;
      default: return;
    }
  }

  movePythons(dir) {
    switch (dir) {
      case "left":
        this._model.movePythons(-this._speed, 0);
        break;
      case "up":
        this._model.movePythons(0, -this._speed);
        break;
      case "right":
        this._model.movePythons(this._speed, 0);
        break;
      case "down":
        this._model.movePythons(0, this._speed);
        break;
      default: return;
    }
  }

}


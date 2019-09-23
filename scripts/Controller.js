/**
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */
class Controller {
  constructor(model, view) {
    this._model = model;
    this._view = view;
    this._speed = 8;  

    view.on("gregMove", (dir) => this.moveGreg(dir));
    view.on("pythonsMove", (dir) => this.movePythons(dir)); 
    this.start = document.getElementById("start"); 
    this.start.addEventListener('click', function(evt){
         if (view._gameState == "stop"){
             view._gameState = "start"; 
             view.setGregDir("right"); 
             view.setPythonDir("right"); 
             
         }
    }); 
    view.renderLives(3); // replace this with model.getLives() or something
    this.stop = document.getElementById("stop"); 
    this.stop.addEventListener('click', function(evt){
        if (view._gameState === "start"){
          view._gameState = "stop"; 
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
        } 
        
    }); 
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


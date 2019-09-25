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
             view._gameState = "start"; 
             view._gameValues.gregDir = "up";
             view._gameValues.pythonDir = "up";
             view.setPythonDir("right"); 
             
         }
    }); 
    view.renderLives(3); // replace this with model.getLives() or something
    this.stop = document.getElementById("stop"); 
    this.stop.addEventListener('click', function(evt){
        if (view._gameState === "start"){
          view._gameState = "stop"; 
          clearInterval(view._gameLoop);
        } 
    }); 

  view.on("gameUpdate", (values) => this.updateModel(values));
  }

  updateModel(values) {
    this._model.moveGreg(values.gregDir);
    this._model.movePythons(values.pythonDir);

    this._model.checkCollision();
  }
  

}


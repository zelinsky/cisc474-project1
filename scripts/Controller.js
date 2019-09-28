/**
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */
class Controller {
  constructor(model, view) {
    this._model = model;
    this._view = view;
  

    $("#play").click(function(evt){
         if (view._gameState == "stop"){
            $("#play").text("Pause");   
            view.gameStart();       
         } else if (view._gameState == "start") {
            $("#play").text("Play")
            view.gamePause();
         }
    });

    
     
  
    view.renderLives(3); // replace this with model.getLives() or something
    view.makeScore(0);
    
  view.on("gameUpdate", (values) => this.updateModel(values));
  }

  updateModel(values) {
    this._model.moveGreg(values.gregDir);
    this._model.movePythons(values.pythonDir);

    this._model.checkCollision();
  }
  

}


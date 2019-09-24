/**
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */
class Controller {
  constructor(model, view) {
    this._model = model;
    this._view = view;
    this._speed = 8;

    view.on("gameUpdate", (values) => this.updateModel(values));
  }

  updateModel(values) {
    this._model.moveGreg(values.gregDir);
    this._model.movePythons(values.pythonDir);

    this._model.checkCollision();
  }

}


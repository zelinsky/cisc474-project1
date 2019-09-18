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
    switch (values.gregDir) {
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

    switch (values.pythonDir) {
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


/**
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */
class Controller {
  constructor(model, view) {
    this._model = model;
    this._view = view;

    view.on("gregMove", (pos) => this.moveGreg(pos));
  }

  moveGreg(pos) {
    switch (pos) {
      case "left":
        this._model.moveGreg(-5, 0);
        break;
      case "up":
        this._model.moveGreg(0, -5);
        break;
      case "right":
        this._model.moveGreg(5, 0);
        break;
      case "down":
        this._model.moveGreg(0, 5);
        break;
      default: return;
    }
  }
  
}


/**
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */
class Controller {
  constructor(model, view) {
    this._model = model;
    this._view = view;

    view.on("leftArrow", () => this.moveLeft("greg"));
  }

  moveLeft(player) {
    if (player === "greg") {
      this._model.moveGreg(-20, 0);
    }

  }

  setText() {
    const text = window.prompt('Set text:', '');
    if (text) {
      this._model.setText(text);
    }
  }
}

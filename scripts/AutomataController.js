/**
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */
class AutomataController {
  constructor(model, view) {
    this._model = model;
    this._view = view;

    view.on('aButtonClicked', () => this.setText());
  }

  setText() {
    const text = window.prompt('Set text:', '');
    if (text) {
      this._model.setText(text);
    }
  }
}

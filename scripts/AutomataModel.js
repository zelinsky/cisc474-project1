/**
 * The Model. Model stores items and notifies
 * observers about changes.
 */
class AutomataModel extends EventEmitter {
  constructor(text) {
    super();
    this._text = text || [];
  }

  getText() {
    return this._text;
  }

  setText(text) {
    this._text = text;
    this.emit('textChanged', text);
  }

}

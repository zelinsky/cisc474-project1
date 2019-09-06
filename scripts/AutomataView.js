/**
 * The View. View presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interaction.
 */
class AutomataView extends EventEmitter {
	constructor(model, elements) {
		super();
		this._model = model;
		this._elements = elements;

		// attach model listeners
		model.on('textChanged', () => this.rebuildText());

		// attach listeners to HTML controls
		elements.aButton.addEventListener('click', () => this.emit('aButtonClicked'));
	}

	show() {
		this.rebuildText();
	}

	rebuildText() {
		const text = this._elements.aText
		text.innerText = this._model.getText();
	}
}

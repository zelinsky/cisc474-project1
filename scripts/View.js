/**
 * The View. View presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interaction.
 */
class View extends EventEmitter {
	constructor(model, elements) {
		super();
		this._model = model;
		this._elements = elements;

		// attach model listeners
		model.on("gregMoved", newPos => this.moveGreg(newPos)).on("pythonsMoved", newPosList => this.movePythons(newPosList));

		$(document).keydown(evt => {
			switch (evt.which) {
				case 37: // left
					this.emit("gregMove", "left");
					break;
				case 38: // up
					this.emit("gregMove", "up");
					break;
				case 39: // right
					this.emit("gregMove", "right")
					break;
				case 40: // down
					this.emit("gregMove", "down");
					break;

				default: return; // exit this handler for other keys
			}
			evt.preventDefault(); // prevent the default action (scroll / move caret)
		});

	}

	moveGreg(pos) {
		$(this._elements.greg).css({left: pos.x, top: pos.y});
	}

	movePythons(posList) {


	}
}

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
					this.emit('leftArrow');
					break;
				case 38: // up
					this.emit("upArrow");
					break;
				case 39: // right
					this.emit("rightArrow")
					break;
				case 40: // down
					this.emit("downArrow");
					break;

				default: return; // exit this handler for other keys
			}
			evt.preventDefault(); // prevent the default action (scroll / move caret)
		});

	}

	moveGreg(pos) {
		$(this._elements.greg).animate({left: pos.x, top: pos.y});
	}

	movePythons(posList) {


	}
}

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
					this.setGregDir("left");
					break;
				case 38: // up
					this.setGregDir("up");
					break;
				case 39: // right
					this.setGregDir("right");
					break;
				case 40: // down
					this.setGregDir("down");
					break;
				case 83: // s
					if (this._gregDir) {
						clearInterval(this._gregDir);
						delete this._gregDir;
					}
					break;
				default: return; // exit this handler for other keys
			}
			evt.preventDefault(); // prevent the default action (scroll / move caret)
		});

		this.setGregDir("right");
	}

	setGregDir(dir) { 
		if (this._gregDir) {
			clearInterval(this._gregDir);
		}
		this._gregDir = setInterval(() => this.emit("gregMove", dir), 100);
	}

	moveGreg(pos) {
		$(this._elements.greg).css({left: pos.x, top: pos.y});
	}

	movePythons(posList) {


	}
}

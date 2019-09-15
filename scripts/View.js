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
		this._updateSpeed = 50; // ms

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
				case 27: // esc
					if (this._gregDir) {
						clearInterval(this._gregDir);
						delete this._gregDir;
					}
					if (this._pythonDir) {
						clearInterval(this._pythonDir);
						delete this._pythonDir;
					}
					break;
				case 65: // a
					this.setPythonDir("left");
					break;
				case 87: // w
					this.setPythonDir("up");
					break;
				case 68: // d
					this.setPythonDir("right");
					break;
				case 83: // s
					this.setPythonDir("down");
					break;
				default: return; // exit this handler for other keys
			}
			evt.preventDefault(); // prevent the default action (scroll / move caret)
		});

		this.setGregDir("right");
		this.setPythonDir("down");
	}

	setGregDir(dir) { 
		if (this._gregDir) {
			clearInterval(this._gregDir);
		}
		this._gregDir = setInterval(() => this.emit("gregMove", dir), this._updateSpeed);
	}

	moveGreg(pos) {
		$(this._elements.greg).css({left: pos.x, top: pos.y});
	}

	setPythonDir(dir) {
		if (this._pythonDir){
			clearInterval(this._pythonDir);
		}
		this._pythonDir = setInterval(() => this.emit("pythonsMove", dir), this._updateSpeed);
	}

	movePythons(posList) {
		for(let i = 0; i < posList.length; i++) {
			$(this._elements.pythons[i]).css({left: posList[i].x, top: posList[i].y});
		}
	}
}

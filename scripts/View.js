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
		this._gregDir = "stop";
		this._pythonDir = "stop";
		this._gameState = "stop";

		// attach model listeners
		model.on("gregMoved", newPos => this.moveGreg(newPos)).on("pythonsMoved", newPosList => this.movePythons(newPosList)).on("debugLightChanged", state => this.debugLight(state));

		$(document).keydown(evt => {
			if (this._gameState == "start") {
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
					case 27: // esc
						if (this._gregUpdate) {
							clearInterval(this._gregUpdate);
							delete this._gregUpdate;
							this._gregDir = "stop";
						}
						if (this._pythonUpdate) {
							clearInterval(this._pythonUpdate);
							delete this._pythonUpdate;
							this._gregDir = "stop";
						}
						break;
					default: return; // exit this handler for other keys
				}
			} else if (this._gameState == "stop"){
				switch(evt.which) {
					case 80: // p
					this._gameState = "start";
					this.setGregDir("right");
					this.setPythonDir("right");
					break;
					default: return;
				}
			}
			evt.preventDefault(); // prevent the default action (scroll / move caret)
		});

	}

	setGregDir(dir) {
		if (this._gregDir != dir) {
			if (this._gregUpdate) {
				clearInterval(this._gregUpdate);
			}
			this._gregUpdate = setInterval(() => this.emit("gregMove", dir), this._updateSpeed);
			this._gregDir = dir;
		}
	}

	moveGreg(pos) {
		$(this._elements.greg).css({ left: pos.x, top: pos.y });
	}

	setPythonDir(dir) {
		if (this._pythonDir != dir) {
			if (this._pythonUpdate) {
				clearInterval(this._pythonUpdate);
			}
			this._pythonUpdate = setInterval(() => this.emit("pythonsMove", dir), this._updateSpeed);
		}
	}

	movePythons(posList) {
		for (let i = 0; i < posList.length; i++) {
			$(this._elements.pythons[i]).css({ left: posList[i].x, top: posList[i].y });
		}
	}

	debugLight(state) {
		if (state) {
			//$(this._elements.debug_light).css({ visibility: "visible" });
			this._elements.debug_light.style.visibility = "visible";
		} else {
			//$(this._elements.debug_light).css({ visibility: "hidden" });
			this._elements.debug_light.style.visibility = "hidden";
		}
	}
}

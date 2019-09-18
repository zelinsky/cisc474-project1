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
		model.on("gregMoved", newPos => this.moveGreg(newPos)).on("pythonsMoved", newPosList => this.movePythons(newPosList));
		model.on("loseLife", () => this.loseLife()).on("gameOver", winner => this.gameOver(winner));

		$(document).keydown(evt => {
			if (this._gameState == "start") {
				switch (evt.which) {
					case 37: // left
						this._gameValues.gregDir = "left";
						break;
					case 38: // up
						this._gameValues.gregDir = "up";
						break;
					case 39: // right
						this._gameValues.gregDir = "right";
						break;
					case 40: // down
						this._gameValues.gregDir = "down";
						break;
					case 65: // a
						this._gameValues.pythonDir = "left";
						break;
					case 87: // w
						this._gameValues.pythonDir = "up";
						break;
					case 68: // d
						this._gameValues.pythonDir = "right";
						break;
					case 83: // s
						this._gameValues.pythonDir = "down";
						break;
					case 27: // esc
							clearInterval(this._gameLoop);
							this._gameState = "stop";
						break;
					default: return; // exit this handler for other keys
				}
			} else if (this._gameState == "stop"){
				switch(evt.which) {
					case 80: // p
					this.gameStart();
					break;
					default: return;
				}
			}
			evt.preventDefault(); // prevent the default action (scroll / move caret)
		});

		this._gameValues = {
			gregDir: "right",
			pythonDir: "right"
		};
	}

	gameStart() {
		this._gameState = "start";
		this._gameLoop = setInterval(() => this.emit("gameUpdate", this._gameValues), this._updateSpeed);
	}

	// TODO:
	// Display winner
	// Press 'r' to play again
	gameOver(winner) {
		if (winner === "greg") {
			console.log("Greg wins!");
		} else if (winner === "pythons") {
			console.log("Pythons win!");
		}
	}

	// TODO:
	// Remove one life from display
	loseLife() {

	}

	moveGreg(pos) {
		$(this._elements.greg).css({ left: pos.x, top: pos.y });
	}

	movePythons(posList) {
		for (let i = 0; i < posList.length; i++) {
			$(this._elements.pythons[i]).css({ left: posList[i].x, top: posList[i].y });
		}
	}
}

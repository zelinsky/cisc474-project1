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
		this._gameState = "stop";
		
		// attach model listeners
		model.on("gregMoved", newPos => this.moveGreg(newPos)).on("pythonsMoved", newPosList => this.movePythons(newPosList));
		model.on("eatSemicolon", semicolonId => this.removeSemicolon(semicolonId)).on("loseLife", () => this.loseLife()).on("gameOver", winner => this.gameOver(winner));
		model.on("eatPython",  pythonID =>this.removePython(pythonID));
		model.on("updateScore",  score =>this.updateScore(score));
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
			} /*else if (this._gameState == "stop") {
				switch(evt.which) {
					case 80: // p
						this.gameStart();
						break;
					default: return;
				}
			} */
			evt.preventDefault(); // prevent the default action (scroll / move caret)
		});

		this._gameValues = {
			gregDir: "up",
			pythonDir: "up"
		};
		this.drawSemicolons(this._model._semicolons);
	}

	gameStart() {
		this._gameState = "start";
		this._gameLoop = setInterval(() => this.emit("gameUpdate", this._gameValues), this._updateSpeed);
	}

	gamePause() {
		this._gameState = "stop";
		clearInterval(this._gameLoop);
	}

	// TODO:
	// Display winner
	// Press 'r' to play again
	gameOver(winner) {
		this.gamePause();
		$("#status").addClass("hidden");
		$("#restart").click(() => {
			location.reload();
		});
		if (winner === "greg") {
			console.log("Greg wins!");
			$("#winnerEndScreen").removeClass("hidden");
		} else if (winner === "pythons") {
			console.log("Pythons winnnnn!");
			$("#endScreen").removeClass("hidden");
		}
		$("#restart").removeClass("hidden");
	}

	// TODO:
	// Remove one life from display
	loseLife() {
	}

	// TODO:
	// Draw pellets
	drawSemicolons(semicolons) {
		semicolons.forEach((semicolon, index) => {
			$("#maze").append(`<div id="sc${index}" class="semicolon" style="left:${semicolon._posX}px;top:${semicolon._posY}px"></div>`);
			if (semicolon._powerUp) {
				$(`#sc${index}`).addClass("powerUp");
			}
		});
	}

	// TODO:
	// Remove semicolon from display
	removeSemicolon(semicolonId) {
		$(`#sc${semicolonId}`).hide();
	}
	
	removePython(pythonId) {
		console.log(pythonId);
		$(`#python${pythonId}`).hide();
		$(`#python${pythonId}`).delay(3000).show(0);
	} 

	moveGreg(pos) {
		$(this._elements.greg).css({ left: pos.x, top: pos.y });
	}

	movePythons(posList) {
		for (let i = 0; i < posList.length; i++) {
			$(this._elements.pythons[i]).css({ left: posList[i].x, top: posList[i].y });
		}
	}
  
	renderLives(numLives){
		let livesContainer = document.getElementById('lives'); 
		let livesText = document.createElement('span'); 
		livesText.innerText = 'Lives'; 
		livesText.setAttribute('class', 'badge badge-secondary'); 
		livesContainer.appendChild(livesText); 
		for (let i = 0; i < numLives; i++) {
			let span = document.createElement('span'); 
			span.setAttribute('class', 'relativeGreg');
			let rect = span.getBoundingClientRect();  
			livesContainer.appendChild(span); 
		} 
	}
	makeScore(score){
		let scoreContainer = document.getElementById('score'); 
		let scoreText = document.createElement('span'); 
		scoreText.innerText = 'Score: ' + score; 
		scoreText.setAttribute('class', "badge badge-primary"); 	
		let livesContainer = document.getElementById('lives');
		livesContainer.appendChild(scoreContainer);
		scoreContainer.appendChild(scoreText); 
	}
	updateScore(score){
		let scoreContainer = document.getElementById('score');
		scoreContainer.firstChild.innerText = 'Score: ' + score; 
	}
}
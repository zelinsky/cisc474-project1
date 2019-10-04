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
		model.on("changePower", up=>this.changePower(up));
		$(document).keydown(evt => {
			if (this._gameState == "start") {
				switch (evt.which) {
					case 37: // left
						this._gameValues.gregDir = "left";
						$(this._elements.greg).removeClass("flipped");
						break;
					case 38: // up
						this._gameValues.gregDir = "up";
						break;
					case 39: // right
						this._gameValues.gregDir = "right";
						$(this._elements.greg).addClass("flipped");
						break;
					case 40: // down
						this._gameValues.gregDir = "down";
						break;
					case 65: // a
						this._gameValues.pythonDir = ["left", "left", "left", "left"];
						break;
					case 87: // w
						this._gameValues.pythonDir = ["up", "up", "up", "up"];
						break;
					case 68: // d
						this._gameValues.pythonDir = ["right", "right", "right", "right"];
						break;
					case 83: // s
						this._gameValues.pythonDir = ["down", "down", "down", "down"];
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
			pythonDir: ["up", "up", "up", "up"]
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
		let w = '';
		let m = '';
		let i = '';
		let s = this._model._score;
		if (winner === "greg") {
			w = "Greg Wins!";
			m = "Statically typed languages rule!";
			i = "../images/greg-old.png";
		} else if (winner === "pythons") {
			w = "Pythons Win!";
			m = "Whitespace rules!";
			i = "../images/python.png";
		}
		$("#info-panel-head").text(w);
		$("#info-panel-body").html(`<p>${m}</p><img src=${i}>`);
		$("#info-panel").append(`<div class="panel-footer text-center"><p>Greg's Score: ${s}</p><button id="restart" class="btn btn-primary">Restart</button></div>`)
		$("#restart").click(() => {
			location.reload();
		});
		$("#status").addClass("hidden");
		document.getElementById('opening').style.visibility = 'visible';
		
	}

	// TODO:
	// Remove one life from display
	loseLife() {
		$(".relativeGreg").last().remove();
	}

	changePower(up) {
		if (up) {
			$(".python").removeClass("python").addClass("scaredPython");
		} else {
			$(".scaredPython").removeClass("scaredPython").addClass("python");
		}
	}

	drawSemicolons(semicolons) {
		semicolons.forEach((semicolon, index) => {
			if (semicolon._powerUp) {
				$("#maze").append(`<div id="sc${index}" class="powerUp" style="left:${semicolon._posX}px;top:${semicolon._posY}px"></div>`);
			} else {
				$("#maze").append(`<div id="sc${index}" class="semicolon" style="left:${semicolon._posX}px;top:${semicolon._posY}px"></div>`);
			}
		});
	}

	removeSemicolon(semicolonId) {
		$(`#sc${semicolonId}`).hide();
	}
	
	removePython(pythonId) {
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
		//livesContainer.appendChild(scoreContainer);
		scoreContainer.appendChild(scoreText); 
	}
	updateScore(score){
		let scoreContainer = document.getElementById('score');
		scoreContainer.firstChild.innerText = 'Score: ' + score; 
	}
}
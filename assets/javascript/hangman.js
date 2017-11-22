

window.onload = function () {

	var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
		'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
		't', 'u', 'v', 'w', 'x', 'y', 'z'];

	var wordList = ["breckenridge", "vail", "mammoth", "northstar"];
	var wordSelector = 0;
	var word = wordList[wordSelector];//Selected word
	var guess;	//Button selected as a guess 

	var correctGuess = [];
	for (var i = 0; i < word.length; i++)
		correctGuess[i] = '_';

	var lives = 9; 			//Remaining amount of guesses user has 
	var badGuess = [];		// Previously guessed letters - not in word
	var counter = 0;



	//Display lives/guesses remaining 
	var showLives = document.getElementById("mylives");
	var BadGuess = document.getElementById("badGuess");
	var CorrectGuess = document.getElementById("word");


	//OnClick Function 
	var check = function () {
		list.onclick = function () {
			var guess = (this.innerHTML);
			this.setAttribute("class", "active");
			if ((badGuess.indexOf(guess) != -1) ||
				(correctGuess.indexOf(guess) != -1)) {
					comments();
					return;
				}
			for (var i = 0; i < word.length; i++) {
				if (word[i] === guess) {
					correctGuess[i] = guess;
					counter += 1;
				}
			}
			var j = (word.indexOf(guess));
			if (j === -1) {
				lives -= 1;
				badGuess.push(guess);
				comments();

			} else {
				comments();
			}
		}
	}

	// Create Alphabet list(ul)
	var buttons = function () {
		myButtons = document.getElementById('buttons');
		letters = document.createElement('ul');

		for (var i = 0; i < alphabet.length; i++) {
			letters.id = 'alphabet';
			list = document.createElement('li');
			list.id = 'letters';
			list.innerHTML = alphabet[i];
			check();
			myButtons.appendChild(letters);
			letters.appendChild(list);
		}
	}
	// Call buttons into play 
	buttons();

	// Show lives 
	var comments = function () {
		showLives.innerHTML = lives;
		if (lives < 1) {
			showLives.innerHTML = "Game Over.";
		}
		for (var i = 0; i < correctGuess.length; i++) {
			if (counter === correctGuess.length) {
				showLives.innerHTML = "You Win!!";
			}

		}
		BadGuess.innerHTML = badGuess;
		CorrectGuess.innerHTML = correctGuess;
	}

	comments();

	// play button
	function play() {
		document.getElementById('play').onclick = function () {
			wordSelector = ++wordSelector % wordList.length;
			word = wordList[wordSelector];
			lives = 9;
			badGuess = [];
			correctGuess = [];
			for (var i = 0; i < word.length; i++)
				correctGuess[i] = '_';
			showLives.innerHTML = lives;
			counter = 0;
			comments();
		}
	}
    play();
}


(function() {
	//Elements of interface
	let ui = {
		lettersContainer: document.querySelector('.letters'),
		image: document.querySelector('.object__image'),
		answer: document.querySelector('.object__name'),
		btnSend: document.querySelector('.button--send'),
		btnReset: document.querySelector('.button--reset')
	}

	let level = 0;
	let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	let objects = [
		{
			name: 'uva',
			imageSrc: 'assets/img/uva.png'
		},
		{
			name: 'abacaxi',
			imageSrc: 'assets/img/abacaxi.png'
		},
		{
			name: 'cachorro',
			imageSrc: 'assets/img/cachorro.png'
		},
		{
			name: 'gato',
			imageSrc: 'assets/img/gato.png'
		}
	];

	var printObject = function() {
		return ui.image.innerHTML = '<img src='+ objects[level].imageSrc +' alt='+ objects[level].name +'>';
	}

	var getLetters = function() {
		return ui.letters = document.querySelectorAll('.letters__card');
	}

	//Returns a random letter from array alphabet. 
	var getRandomLetter = function() {
		return alphabet[Math.floor(Math.random() * (alphabet.length))];
	}

	//Add or remove a class in an element
	var toggleClass = function(element, cssClass) {
		return element.classList.toggle(cssClass);
	}

	//Returns the name of the object in the level.
	var getObjectName = function() {
		return objects[level].name.toUpperCase().split('');
	}

	//Generate the HTML code with the letters in the page
	var generateHTMLcode = function(choosenLetters) {
		let htmlElements = '';

		htmlElements = choosenLetters.map( function(item) {
			return '<span class="letters__card">'+ item +'</span>\n'
		}).join('');

		return ui.lettersContainer.innerHTML = htmlElements;
	}

	//Choose letters that will be displayed.
	var createLetters = function(objectName, quantity) {
		let choosenLetters = [];

		//To-do: verificacao de quantidade > letras do objectName

		for (var i=0; i < quantity - objectName.length; i++) {
			choosenLetters.push(getRandomLetter());
		}

		objectName.forEach(function(letter) {
			choosenLetters.splice(Math.floor(Math.random() * choosenLetters.length), 0, letter);
		});

		return generateHTMLcode(choosenLetters);
	}

	//Print the Value of the selected letter
	var printValue = function(elementSelected, location) {
		let newLetter = elementSelected.innerText;

		//entrada += newLetter;
		return ui.answer.innerText = ui.answer.innerText + newLetter;
	}

	//Select the letter by user
	var selectLetter = function(e) {
		let elementSelected = e.target;
		//To-do: limpar as classes das letras selecionadas
		toggleClass(elementSelected, 'letters__card--selected');

		return printValue(elementSelected, ui.lettersContainer);
	}

	//Initialize the level
	var setupLevel = function() {
		
		clearAnswer();
		printObject();
		createLetters(getObjectName(), 15);
		getLetters();
		
		Array.prototype.forEach.call(ui.letters, function(letter) {
			letter.addEventListener('click', selectLetter);
		});
	}

	//Go to next level
	var nextLevel = function() {
		level ++;
		alert('Acertou!');
		return setupLevel();
	}

	//Clear the answer
	var clearAnswer = function() {
		return ui.answer.innerText = '';
	}

	//restart the level
	var resetLevel = function() {
		//To-do: limpar as classes das letras selecionadas
		return clearAnswer();
	}

	var tryAgain = function() {
		alert('You should try again.');
		return resetLevel();
	}

	// Validate the answer. If it's correct go to next level, otherwise 'tryAgain' 
	var validateAnswer = function() {
		if (ui.answer.innerText)
			return ui.answer.innerText === getObjectName().join('') ? nextLevel() : tryAgain();
		return tryAgain();
	}

	var init = function() {
		setupLevel();

		ui.btnSend.addEventListener('click', validateAnswer);
		ui.btnReset.addEventListener('click', clearAnswer);

	}();
})();

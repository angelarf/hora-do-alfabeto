(function() {
	//Elements of interface
	let ui = {
		letters: '',
		menu: document.querySelector('.main-nav__list'),
		lettersContainer: document.querySelector('.letters'),
		image: document.querySelector('.answer__image'),
		answer: document.querySelector('.answer-js'),
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
		},
		{
			name: 'arvore',
			imageSrc: 'assets/img/arvore.png'
		},
		{
			name: 'carro',
			imageSrc: 'assets/img/carro.png'
		},
		{
			name: 'urso',
			imageSrc: 'assets/img/urso.png'
		},
		{
			name: 'vaca',
			imageSrc: 'assets/img/vaca.png'
		},
		{
			name: 'peixe',
			imageSrc: 'assets/img/peixe.png'
		},
		{
			name: 'casa',
			imageSrc: 'assets/img/casa.png'
		}
	];

	var couldSelect = function() {
		return ui.answer.value.length < objects[level].name.length;
	}

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
	var createLetters = function(objectName, gridLength) {
		let choosenLetters = [];
		let quantity;

		//Choose the ramdom letters.
		if (gridLength > objectName.length) {
			quantity = gridLength - objectName.length;

			for (var i=0; i < quantity; i++) {
				choosenLetters.push(getRandomLetter());
			}

		} else {
			quantity = gridLength;
		}

		//It inserts the letters the of the object's name.
		objectName.forEach(function(letter) {
			choosenLetters.splice(Math.floor(Math.random() * quantity), 0, letter);
		});

		return generateHTMLcode(choosenLetters);
	}

	//Print the Value of the selected letter in the html element.
	var printValue = function(text, htmlElement) {
		return htmlElement.value = htmlElement.value + text;
	}

	// Remove the last occurence of the text in the htmlElement.
	var removeValue = function(text, htmlElement) {
		let index = htmlElement.value.lastIndexOf(text);

		if (index !== -1) {
			letters = htmlElement.value.split('');
			letters.splice(index, 1);
			htmlElement.value = letters.join('');
		}

		return htmlElement.value;
	}

	//Select the letter by user
	var toggleSelectLetter = function(e) {
		let elementSelected = e.target;

		//Se a letra já tiver sido selecionada ---> desseleciona. Caso contrario, seleciona.
		if (elementSelected.classList.contains('letters__card--selected')){
			removeValue(elementSelected.innerText, ui.answer);
		} else if (couldSelect()) {
			printValue(elementSelected.innerText, ui.answer);
		} else {
				return alert('Muitas letras');
		}

		return toggleClass(elementSelected, 'letters__card--selected');
	}

	//Remove the selected classes
	var clearClasses = function(list, nameClass) {
		Array.prototype.forEach.call(list, function(item) {
			item.classList.remove(nameClass);
		});
	}

	var endGame = function() {
		//clearClasses(ui.letters,'letters__card--selected');
		alert('Fim do jogo!');

		if(sessionStorage)
			return sessionStorage.setItem('level', 0);
	}

	//Go to next level
	var nextLevel = function() {
		level++;

		if (level === objects.length) {
			return endGame();
		} else {
			alert('Acertou');
			saveLevel(level);
			return setupLevel();
		}
	}

	//Clear the answer
	var clearAnswer = function() {
		return ui.answer.value = '';
	}

	//restart the level
	var resetLevel = function() {
		clearClasses(ui.letters,'letters__card--selected');
		return clearAnswer();
	}

	// Restart game
	var restartGame = function() {
		saveLevel(0);
		setupLevel();
	}

	var tryAgain = function() {
		alert('You should try again.');
		//return resetLevel();
	}

	// Validate the answer. If it's correct go to next level, otherwise 'tryAgain'
	var validateAnswer = function(e) {
		e.preventDefault();

		if (ui.answer.value)
			return ui.answer.value === getObjectName().join('') ? nextLevel() : tryAgain();
		return tryAgain();
	}

	var saveLevel = function(currentLevel) {
		level = currentLevel;

		// IE bug.
		if(sessionStorage)
			return sessionStorage.setItem('level', level);
	}

	//Get the current level saved in session storage
	var getSavedLevel = function() {
		// IE bug.
		if(sessionStorage) {

			if(sessionStorage.getItem('level', level)) {
				return new Number(sessionStorage.getItem('level', level));
			} else {
				sessionStorage.setItem('level', 0);
			}

		}

		return 0;
	}

	//Initialize the level
	var setupLevel = function() {

		clearAnswer();
		printObject();
		createLetters(getObjectName(), 15);
		getLetters();

		Array.prototype.forEach.call(ui.letters, function(letter) {
			letter.addEventListener('click', toggleSelectLetter);
		});
	}

	var init = function() {
		level = getSavedLevel();
		setupLevel();

		ui.btnSend.addEventListener('click', validateAnswer);
		ui.btnReset.addEventListener('click', resetLevel);
		document.addEventListener('keyup', function (e) {
			if (e.key === 'Enter') validateAnswer(e);
		});
	}();
})();

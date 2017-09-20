var entrada = "";
var resposta =  document.getElementsByClassName("resposta")[0].value;

(function() {
	let ui = {
		letters: document.querySelectorAll('.letters__card'),
		answer: document.querySelector('.object__name')
	}

	var toggleClass = function(element, cssClass) {
		return element.classList.toggle(cssClass);
	}

	var printValue = function(elementSelected, location) {
		let newLetter = elementSelected.innerText;

		entrada += newLetter;
		return ui.answer.innerText = ui.answer.innerText + newLetter;
	}

	var selectLetter = function(e) {
		let elementSelected = e.target;

		toggleClass(elementSelected, 'letters__card--selected');
		console.log(printValue(elementSelected, ui.answer));
	}

	var init = function() {
		ui.letters.forEach(function(letter) {
			letter.addEventListener('click', selectLetter);
		});
	}();
})();

function validaResposta() {
	if (entrada.localeCompare(resposta) == 0){
		alert("ACERTOU!");
	}
}

function reinicia() {
	//console.log(document.querySelector('.object__name'));
	//elementSelected.classList.toggle('letters__card--selected')
	document.querySelector('.object__name').innerText = "";
	entrada = "";
}

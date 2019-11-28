"use strict";

function makeRandomRange(x) {
	var range = new Array(x),
		pointer = x;
	return function getRandom() {
		pointer = (pointer - 1 + x) % x;
		var random = Math.floor(Math.random() * pointer);
		var num = (random in range) ? range[random] : random;
		range[random] = (pointer in range) ? range[pointer] : pointer;
		return range[pointer] = num;
	};
}

class Question {
	constructor(question, answer1, answer2, answer3, rightanswer) {
		this.question = question;
		this.answer1 = answer1;
		this.answer2 = answer2;
		this.answer3 = answer3;
		this.rightanswer = rightanswer;
	}
}

let currentQ = 1;
let correct = 0;
const nextBtn = "<button type='button' class='next animated bounceInLeft'>Dalej</button>";
/*global ProgressBar*/
/*eslint no-undef: "error"*/
let circle = new ProgressBar.Circle("#circle-container", {
	duration: 200,
	strokeWidth: 5,
	trailWidth: 5,
	trailColor: "#1b00a9",
	from: {
		color: "#D6BB2E"
	},
	to: {
		color: "#8c0000"
	},
	step: function (state, circle) {
		circle.path.setAttribute("stroke", state.color);
	}
});

const question1 = new Question("Kto zapewnia ochronę pracowników przed zagrożeniami czynnikami chemiczniymi?", "Pracownik", "Bóg", "Woźny", "Pracodawca");
const question2 = new Question("Co to jest mieszanina?", "Eksperymenty alkoholowe", "Różnorodność kulturowa", "Córka Mieszka i Janiny", "Roztwór składający się z dwóch lub więcej substancji");
const question3 = new Question("W ocenie ryzyka spowodowanego czynnikami chemicznymi nie należy brać pod uwagę:", "Własności czynników chemicznych", "Poziomu, rodzaju i czasu trwania zagrożenia", "Wyników oceny stanu zdrowia pracowników", "Upodobań i zachcianek pracowników");
const question4 = new Question("Ile substancji chemicznych znajduje się na wykazie niebezpiecznych substancji?", "Cztery", "Setki", "Pierwiastek trzeciego stopnia z 635", "Kilka tysięcy");
const question5 = new Question("Gdzie jest największa szansa na wystąpienie zagrożenia spowodowanego czynnikami chemicznymi?", "Męska toaleta na czwartym piętrze", "Warzywniak", "Kantorek wuefistów", "Magazyn farmaceutyczny");
const question6 = new Question("Co nie należy do obowiązków pracodawcy?", "Przeprowadzanie okresowych szkoleń", "Informowanie pracowników o narażeniu na działanie substancji szkodliwych dla zdrowia", "Stosowanie się do przepisów regulujących zasady BHP", "Zapewnianie owoców w pracy");
const question7 = new Question("Czynniki chemiczne najczęściej występują w postaci:", "Ciał stałych", "Cieczy", "Grzybów", "Gazów");
const question8 = new Question("Co jest jednym z obowiązków pracodawcy w razie zagrożenia?", "Ucieczka", "Panika", "Pochwalenie się na social media", "Poinformowanie pracowników o zagrożeniu i podjęcie odpowiednich kroków");
const question9 = new Question("Gdzie szukać przepisów dotyczących ochrony pracowników przed zagrożeniami związanymi z czynnikami chemicznymi?", "'Eksperckie' fora", "Literatura piękna", "Wikipedia", "Centralny instytut ochrony pracy");

const questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9];
const generate = makeRandomRange(9);
const selected = [questions[generate()], questions[generate()], questions[generate()], questions[generate()], questions[generate()]];

function setQuestions(x) {
	let gen = makeRandomRange(4);
	document.getElementById("q" + x).innerHTML = selected[x - 1].question;
	document.getElementById("a" + x + gen()).innerHTML = selected[x - 1].answer1;
	document.getElementById("a" + x + gen()).innerHTML = selected[x - 1].answer2;
	document.getElementById("a" + x + gen()).innerHTML = selected[x - 1].answer3;
	document.getElementById("a" + x + gen()).innerHTML = selected[x - 1].rightanswer;
}

setQuestions(currentQ);

let arrQ = $(".q");
for (let cpt = 0; cpt <= arrQ.length; cpt++) {
	if (cpt >= 1) $(arrQ[cpt]).addClass("disabled");
}

$(".btnQ").on("click", function () {
	if (!$(".q" + currentQ + " .button-space .next").length) {
		$(".q" + currentQ + " .button-space").append(nextBtn);
		$(".next").on("click", changeQ);
	}
});

function changeQ() {
	let id;
	circle.animate((currentQ) / arrQ.length);
	$(".q" + currentQ).addClass("animated fadeOutDown");
	let radios = document.getElementsByName("q" + currentQ);
	for (let i = 0, length = radios.length; i < length; i++) {
		if (radios[i].checked) {
			id = radios[i].id.replace(/i/, "a");
			if (document.getElementById(id).innerHTML == selected[currentQ - 1].rightanswer) {
				correct++;
			}
			break;
		}
	}
	setTimeout(function () {
		$(".q" + currentQ).removeClass("animated fadeOutDown");
		$(".q" + currentQ).addClass("disabled");
		currentQ = currentQ + 1;
		setNewQ();
	}, 1000);
}

function setNewQ() {
	if (currentQ > arrQ.length) {
		const percentage = correct / 5;
		circle.animate(percentage);
		const result = parseFloat(percentage * 100).toFixed(0) + "%";
		let message = "";
		let color = "";
		if (percentage < 0.5) {
			message = "Musisz jeszcze trochę popracować";
			color = "8c0000";
		} else if (percentage < 0.8) {
			message = "Całkiem nieźle!";
			color = "D6BB2E";
		} else {
			message = "Świetny wynik!";
			color = "B8CA56";
		}
		$(".quiz").append("<div class='end animated bounceInDown' style='color: #" + color + ";'>" + result + "<br>" + message + "</div>");
	}
	else {
		setQuestions(currentQ);
		$(".q" + currentQ).removeClass("disabled");
		$(".q" + currentQ).addClass("animated fadeInDown");
	}
}
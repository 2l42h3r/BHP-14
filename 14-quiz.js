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
const question10 = new Question("<img src='https://www.reach-compliance.ch/downloads/GHS01_explos.png' alt='GHS01'><br>Co oznacza ten piktogram?", "Granat", "Wykluwający się kurczak", "Eksplodujący ziemniak", "Materiały wybuchowe");
const question11 = new Question("<img src='https://www.reach-compliance.ch/downloads/GHS04_bottle.png' alt='GHS04'><br>Co oznacza ten piktogram?", "Stoisko z kukurydzą", "Pół wałka do ciasta", "Butelka po winie", "Gazy pod ciśnieniem");
const question12 = new Question("<img src='https://www.reach-compliance.ch/downloads/GHS06_skull.png' alt='GHS06'><br>Co oznacza ten piktogram?", "Piraci!", "Pole minowe", "Ghost Rider", "Ostra toksyczność");
const question13 = new Question("Co powinno się założyć w przypadku zagrożenia środkami toksycznymi?", "Maska gazowa", "Czepek", "Okulary przeciwsłoneczne", "Maska przeciwgazowa");
const question14 = new Question("Co nie wchodzi w skład zestawu kostiumu ochronnego?", "Płaszcz z kapturem", "Rękawice ochronne", "Torba na cały zestaw", "Bawełniany szalik");
const question15 = new Question("Przed czym kostium ochronny OP-1 ma głównie chronić?", "Słońce", "Deszcz", "Hałas", "Skażenia chemiczne i biologiczne");
const question16 = new Question("Która część/części ciała jest/są najbardziej zagrożona w przypadku skażenia substacjami chemicznymi?", "Kończyny", "Czaszka", "Uszy", "Układ oddechowy");
const question17 = new Question("Do niebezpiecznych substancji chemicznych należą:", "Woda, tlen", "Mleko, ogórki", "Surowe ziemniaki", "Kwas siarkowy, mrówkowy, octowy");

const questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13, question14, question15, question16, question17];
const generate = makeRandomRange(17);
const selected = [questions[generate()], questions[generate()], questions[generate()], questions[generate()], questions[generate()]];

function setQuestions(x) {
	let gen = makeRandomRange(4);
	document.getElementById("q" + x).innerHTML = selected[x - 1].question;
	document.getElementById("a" + x + gen()).innerHTML = selected[x - 1].answer1;
	document.getElementById("a" + x + gen()).innerHTML = selected[x - 1].answer2;
	document.getElementById("a" + x + gen()).innerHTML = selected[x - 1].answer3;
	document.getElementById("a" + x + gen()).innerHTML = selected[x - 1].rightanswer;
}

function fixHeights(x) {
	let heights = [$("#a" + x + "0").height(), $("#a" + x + "1").height(), $("#a" + x + "2").height(), $("#a" + x + "3").height()];
	let max = Math.max.apply(null, heights);
	for (let i = 0; i < 4; i++) {
		$("#a" + x + i).height(max);
	}
}

setQuestions(currentQ);
fixHeights(currentQ);

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
		fixHeights(currentQ);
		$(".q" + currentQ).addClass("animated fadeInDown");
	}
}
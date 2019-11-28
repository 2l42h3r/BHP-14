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

const question1 = new Question("pyt1", "odp1", "odp2", "odp3", "pop-odp");
const question2 = new Question("pyt2", "odp1", "odp2", "odp3", "pop-odp");
const question3 = new Question("pyt3", "odp1", "odp2", "odp3", "pop-odp");
const question4 = new Question("pyt4", "odp1", "odp2", "odp3", "pop-odp");
const question5 = new Question("pyt5", "odp1", "odp2", "odp3", "pop-odp");

const questions = [question1, question2, question3, question4, question5];
const generate = makeRandomRange(5);
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
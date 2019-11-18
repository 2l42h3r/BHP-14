let currentQ = 1;
const nextBtn = "<button type='button' class='next animated bounceInLeft'>Dalej</button>";
var circle = new ProgressBar.Circle("#circle-container", {
	duration: 200,
	strokeWidth: 5,
	trailWidth: 5,
	trailColor: "#ddd",
	from: {
		color: "218CCC"
	},
	to: {
		color: "047E3C"
	},
	step: function (state, circle) {
		circle.path.setAttribute("stroke", state.color);
	}
});
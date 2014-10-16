function buildLifeCycle (data, index, margin, width, height, colour) {

	var lifeCycleData = data[index].lifeCycle;

	
	var svg = d3.select(".outer-wrapper .info-box .life-cycle").append("svg")
		.attr("width", width)
		.attr("height", height);

	svg.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", width)
		.attr("height", height)
		.attr("fill", "none")
		.attr("stroke","hotpink");

}
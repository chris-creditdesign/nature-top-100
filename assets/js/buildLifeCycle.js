function buildLifeCycle (data, index, margin, width, height, colour) {

	var parseDate = d3.time.format("%Y").parse;

	var lifeCycleData = data[index].lifeCycle;

	for (var i = 0; i < lifeCycleData.length; i++) {
	  lifeCycleData[i].date = parseDate(lifeCycleData[i].year);
	}  

	var displayArray = lifeCycleData.sort(compareYear);

	var x = d3.time.scale()
		.range([0, width])
		.domain(d3.extent(displayArray, function(d) { return d.date; }));

	var y = d3.scale.linear()
		.range([height, 0])
		.domain(d3.extent(displayArray, function(d) { return d.cites; }));

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.ticks(5)
		.orient("left");

	var line = d3.svg.line()
		.x(function(d) { return x(d.date); })
		.y(function(d) { return y(d.cites); });

	
	var svg = d3.select(".outer-wrapper .info-box .life-cycle").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis);

	svg.append("g")
	    .attr("class", "y axis")
	    .call(yAxis)
	  .append("text")
	    .attr("transform", "translate(" + -(margin.left * 0.8) + "," + (height/2) + "), rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".71em")
	    .style("text-anchor", "middle")
	    .text("Citations");

	svg.append("path")
	    .datum(displayArray)
	    .attr("class", "line")
	    .attr("d", line);


}
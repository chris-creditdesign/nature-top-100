function buildLifeCycle (data, index, margin, width, height, colour) {

	var parseDate = d3.time.format("%Y").parse;

	function prepareData (index) {
		var lifeCycleData = data[index].lifeCycle;

		for (var i = 0; i < lifeCycleData.length; i++) {
		  lifeCycleData[i].date = parseDate(lifeCycleData[i].year);
		}  

		return lifeCycleData.sort(compareYear);
	}

	var displayArray = prepareData(index);

	var x = d3.time.scale()
		.range([0, width])
		.domain(d3.extent(displayArray, function(d) { return d.date; }));

	var y = d3.scale.linear()
		.range([height, 0])
		.domain([0,11063]);
		// .domain(d3.extent(displayArray, function(d) { return d.cites; }));

	var xAxis = d3.svg.axis()
		.scale(x)
		.ticks(5)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.ticks(5)
		.orient("left");

	var line = d3.svg.line()
		.x(function(d) { return x(d.date); })
		.y(function(d) { return y(d.cites); });

	
	var svg = d3.select(".outer-wrapper .info-box .life-cycle-chart").append("svg")
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
	    .attr("transform", "translate(" + -(margin.left * 0.9) + "," + (height/2) + "), rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".5em")
	    .style("text-anchor", "middle")
	    .text("Citations");

	svg.append("path")
	    .datum(displayArray)
	    .attr("class", "line")
	    .attr("d", line);

	function updateLine(data) {
	

		var displayArray = prepareData(data);

		console.log(displayArray.length);

		x.domain(d3.extent(displayArray, function(d) { return d.date; }));
		// y.domain(d3.extent(displayArray, function(d) { return d.cites; }));

		/* Call the Y axis to adjust it to the new scale */
		svg.select(".outer-wrapper .life-cycle-chart .y")
			.transition()
			.duration(150)
			.call(yAxis);

		svg.select(".outer-wrapper .life-cycle-chart .x")
			.transition()
			.duration(150)
			.call(xAxis);


		svg.selectAll(".outer-wrapper .life-cycle-chart path.line")
			.data([displayArray])
			.attr("d", line);
	}

	return {
		updateLine: function (index) {
			updateLine(index);
		}

	};


}
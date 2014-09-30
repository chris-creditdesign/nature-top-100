function buildGraphic (topData, discipline, margin, width, height, colour, duration, delay) {

	var svg = d3.select(".outer-wrapper .chart").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);

	var barsGroup = svg.append('g')
						.attr("class","barsGroup")
						.attr("transform","translate(" + margin.left + "," + margin.top + ")");
	
	/*	Scales */
	var xScale = d3.scale.linear()
		.range([0 , width])
		.domain([d3.min(topData, function(d) { return d.cites;}), d3.max(topData, function(d) { return d.cites;})]);

	var halfXScale = d3.scale.linear()
		.range([0 , (width/2)])
		.domain([d3.min(topData, function(d) { return d.cites;}), d3.max(topData, function(d) { return d.cites;})]);

	var yScale = d3.scale.ordinal()
		.rangeBands([0, height], 0.2, 0)
		.domain(d3.range(topData.length));

	/*	Define X axis */
	var xAxis = d3.svg.axis()
		.scale(halfXScale)
		.tickSize(-height, -height)
		.ticks(4)
		.orient("top");

	/*	Prepare the x axis but do not call .call(xAxis) yet */
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(" + (margin.left + width/2) + "," + margin.top + ")")
	  .append("g")
		.attr("class", "axisLabel")
	  .append("text")
	  	.attr("transform", "translate(" + (width/4) + "," + -(margin.top/2) + ")")
	  	.style("text-anchor", "middle")
	  	.text("Citations");

	function updateBars (data, updateDelay) {

		xScale.domain([d3.min(data, function(d) { return d.cites;}), d3.max(data, function(d) { return d.cites;})]);
		halfXScale.domain([d3.min(data, function(d) { return d.cites;}), d3.max(data, function(d) { return d.cites;})]);
		yScale.domain(d3.range(data.length));

		/* Update */
		barsGroup.selectAll("rect").data(data, function (d) {
				return d.title;
			})
			.transition()
			.duration(duration)
			.delay(updateDelay)
			.attr("x", function (d) {
				return (width/2) - (xScale(d.cites) / 2);
			})
			.attr("width", function(d) {
				return xScale(d.cites);
			})
			.attr("y", function(d, i){
				return yScale(i);
			})
			.attr("height", function () {
				return yScale.rangeBand();
			});

		/* Enter… */
		barsGroup.selectAll("rect").data(data, function (d) {
				return d.title;
			})
			.enter()
			.append("rect")
			.attr("x", function (d) {
				return (width/2);
			})
			.attr("width", 0)
			.attr("y", function(d, i){
				return yScale(i);
			})
			.attr("height", function () {
				return yScale.rangeBand();
			})
			.attr("fill", function(d, i){
				return getColour(d.discipline, colour, discipline);
			})
			.transition()
			.duration(duration)
			.delay(delay)
			.attr("width", function(d) {
				return xScale(d.cites);
			})
			.attr("x", function (d) {
				return (width/2) - (xScale(d.cites) / 2);
			});

		/* Exit */
		barsGroup.selectAll("rect").data(data, function (d) {
				return d.title;
			}).exit()
			.transition()
			.duration(duration)
			.delay(0)
			.attr("x", function (d) {
				return (width/2);
			})
			.attr("width", 0)
			.remove();

		/* Call the Y axis to adjust it to the new scale */
		svg.select(".outer-wrapper .chart .x")
			.transition()
			.duration(duration)
			.call(xAxis);

		tooltip(width,margin, duration);

	}

	return {
		updateBars: function (data, updateDelay) {
			updateBars(data, updateDelay);
		}

	};


}
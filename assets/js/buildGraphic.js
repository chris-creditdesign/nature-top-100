function buildGraphic (topData, discipline, margin, width, height, colour, duration, delay) {

	var svg = d3.select(".outer-wrapper .chart").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);

	var barsGroup = svg.append('g')
						.attr("class","barsGroup")
						.attr("transform","translate(" + margin.left + "," + margin.top + ")");

	var hiddenBarsGroup = svg.append('g')
						.attr("class","hiddenBarsGroup")
						.attr("transform","translate(" + margin.left + "," + margin.top + ")");
	
	
	/*	Scales */
	var xScale = d3.scale.linear()
		.range([0 , width])
		.domain([0, d3.max(topData, function(d) { return d.cites;})]);

	var yScale = d3.scale.ordinal()
		.rangeBands([0, height], 0.2, 0)
		.domain(d3.range(topData.length));

	/*	Define X axis */
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.tickSize(-height, -height)
		.ticks(4)
		.orient("top");

	/*	Prepare the x axis but do not call .call(xAxis) yet */
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	  .append("g")
		.attr("class", "axisLabel")
	  .append("text")
	  	.attr("transform", "translate(" + (width/4) + "," + -(margin.top/2) + ")")
	  	.style("text-anchor", "middle")
	  	.text("Citations");

	function update (grp, data, updateDelay, visible) {
		grp.selectAll("rect").data(data, function (d) {
				return d.title;
			})
			.transition()
			.duration(duration)
			.delay(updateDelay)
			.attr("x", function (d) {
				return 0;
			})
			.attr("width", function(d) {
				return visible ? xScale(d.cites) : width;
			})
			.attr("y", function(d, i){
				return yScale(i);
			})
			.attr("height", function () {
				return yScale.rangeBand();
			});
	}

	function enter (grp, data, visible) {
		grp.selectAll("rect").data(data, function (d) {
				return d.title;
			})
			.enter()
			.append("rect")
			.attr("x", function (d) {
				return 0;
			})
			.attr("width", 0)
			.attr("y", function(d, i){
				return yScale(i);
			})
			.attr("height", function () {
				return yScale.rangeBand();
			})
			.attr("fill", function(d, i){
				return visible ? getColour(d.discipline, colour, discipline): "hotpink";
			})
			.attr("opacity", function () {
				return visible ? 1 : 0;
			})
			.transition()
			.duration(duration)
			.delay(delay)
			.attr("width", function(d) {
				return visible ? xScale(d.cites) : width;
			})
			.attr("x", function (d) {
				return 0;
			});
	}

	function exit (grp, data) {
		grp.selectAll("rect").data(data, function (d) {
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
	}

	function updateBars (data, updateDelay) {

		xScale.domain([0, d3.max(data, function(d) { return d.cites;})]);
		yScale.domain(d3.range(data.length));

		/* Update */
		update(barsGroup, data, updateDelay, true);
		update(hiddenBarsGroup, data, updateDelay, false);

		/* Enter… */
		enter(barsGroup, data, true);
		enter(hiddenBarsGroup, data, false);

		/* Exit */
		exit(barsGroup, data);
		exit(hiddenBarsGroup, data);

		/* Call the Y axis to adjust it to the new scale */
		svg.select(".outer-wrapper .chart .x")
			.transition()
			.duration(duration)
			.call(xAxis);

		// tooltip(width, margin, duration);

	}

	return {
		updateBars: function (data, updateDelay) {
			updateBars(data, updateDelay);
		}

	};


}
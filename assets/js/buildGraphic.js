function buildGraphic (topData, discipline, margin, width, height, colour, duration, delay) {

	var svg = d3.select(".outer-wrapper .chart").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);

	svg.append("rect")
		.attr("width", width)
		.attr("height", height)
		.attr("fill","none")
		.attr("stroke","skyblue")
		.attr("stroke-width", 0.25)
		.attr("x", margin.left)
		.attr("y", margin.top);

	var barsGroup = svg.append('g')
						.attr("transform","translate(" + margin.left + "," + margin.top + ")");
	
	/*	Define Y scale range to go from height to 0
		Do not define the domain yet */
	var xScale = d3.scale.linear()
		.range([0 , width])
		.domain([d3.min(topData, function(d) { return d.cites;}), d3.max(topData, function(d) { return d.cites;})]);

	var yScale = d3.scale.ordinal()
		.domain(d3.range(topData.length))
		.rangeBands([0, height], 0.2, 0);

	function updateBars (data, updateDelay) {

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
	}
		
	return {
		updateBars: function (data, updateDelay) {
			updateBars(data, updateDelay);
		}

	};


}
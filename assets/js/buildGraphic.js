function buildGraphic (topData, margin, width, height, colour, duration) {

	var svg = d3.select(".outer-wrapper .chart").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);

	// svg.append("rect")
	// 	.attr("width", width)
	// 	.attr("height", height)
	// 	.attr("fill","none")
	// 	.attr("stroke-width", 0.5)
	// 	.attr("x", margin.left)
	// 	.attr("y", margin.top);
	
	/*	Define Y scale range to go from height to 0
		Do not define the domain yet */
	var yScale = d3.scale.linear()
		.range([0 , height])
		.domain([d3.min(topData, function(d) { return d.cites;}), d3.max(topData, function(d) { return d.cites;})]);

	var xScale = d3.scale.ordinal()
		.domain(d3.range(topData.length))
		.rangeRoundBands([0,(width + margin.right)], 0.4);

	console.log(d3.min(topData, function(d) { return d.cites;}));

	var bars = svg.selectAll("rect")
		.data(topData, function(d, i) {
			return d.title;
		});

	/* Enter… */
	bars.enter()
		.append("rect")
		.attr("x", function(d, i){
			return xScale(i);
		})
		.attr("width", function() {
			return xScale.rangeBand();
		})
		.attr("y", 0)
		.attr("height", function (d) {
			return yScale(d.cites);
		} )
		.attr("opacity",1)
		.attr("fill", function(d, i){
			return colour[0];
		});


}
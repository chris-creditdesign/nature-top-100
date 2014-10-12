function buildGraphic (topData, discipline, margin, width, height, miniHeight, colour, duration, delay) {

	var svg = d3.select(".outer-wrapper .chart").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.mid + miniHeight + margin.bottom);

	var barsGroup = svg.append('g')
						.attr("class","barsGroup")
						.attr("transform","translate(" + margin.left + "," + margin.top + ")");

	var miniGroup = svg.append('g')
						.attr("class","miniGroup")
						.attr("transform","translate(" + margin.left + "," + (margin.top + height + margin.mid) + ")")
					  .append("rect")
					  	.attr("stroke", "#0000FF")
					  	.attr("stroke-width","0.2px")
					  	.attr("fill","none")
					  	.attr("width",width)
					  	.attr("height", miniHeight);

	var axisRange = d3.range(topData.length);

	axisRange.shift();

	axisRange.push((axisRange[axisRange.length - 1] + 1));

	/*	Scales */
	var yScale = d3.scale.linear()
		.range([height, 0])
		.domain([0, d3.max(topData, function(d) { 
			return d.lifeCycle.Total;
		})]);

	var xScale = d3.scale.ordinal()
		.rangeBands([width, 0], 0.4, 0)
		.domain(d3.range(topData.length));

	var xScaleAxis = d3.scale.ordinal()
		.rangeBands([width, 0], 0.4, 0)
		.domain(axisRange);

	/*	Define y axis */
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.tickSize(-width, -width)
		.ticks(4)
		.orient("left");

	/* Define y axis */
	var xAxis = d3.svg.axis()
		.scale(xScaleAxis)
		.tickSize(3,0)
		.tickValues([1,10,20,30,40,50,60,70,80,90,100])
		.orient("bottom");

	/*	Prepare the y axis but do not call .call(xAxis) yet */
	svg.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	  .append("g")
		.attr("class", "axisLabel")
	  .append("text")
		.attr("transform", "translate(" + -(margin.left * 0.8) + "," + (height/2) + "), rotate(-90)")
		.style("text-anchor", "middle")
		.text("Citations");

	/* Prepare the x axis */
	svg.append("g")
		.attr("class","x axis")
		.attr("transform", "translate(" + margin.left + "," + (margin.top + height) + ")" );

	function update (grp, data, updateDelay) {
		grp.selectAll("rect").data(data, function (d) {
				return d.title;
			})
			.transition()
			.duration(duration)
			.delay(updateDelay)
			.attr("x", function (d, i) {
				return xScale(i);
			})
			.attr("width", function (d) {
				return xScale.rangeBand();
			})
			.attr("y", function (d){
				return 0;
			})
			.attr("height", function (d) {
				return 0;
			});
	}

	function enter (grp, data) {
		grp.selectAll("rect").data(data, function (d) {
				return d.title;
			})
			.enter()
			.append("rect")
			.attr("x", function (d, i) {
				return xScale(i);
			})
			.attr("width", function(d) {
				return xScale.rangeBand();
			})
			.attr("y", function (d){
				return yScale(d.lifeCycle.Total)  ;
			})
			.attr("height", function (d) {
				return height - yScale(d.lifeCycle.Total);
			})
			.attr("fill", function (d, i){
				return getColour(d.discipline, colour, discipline);
			})
			.attr("opacity", function () {
				return 1;
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
				return 0;
			})
			.attr("height", 0)
			.remove();
	}

	function updateBars (data, updateDelay) {

		xScale.domain(d3.range(data.length));
		yScale.domain([0, d3.max(data, function(d) { return d.lifeCycle.Total;})]);

		/* Update */
		update(barsGroup, data, updateDelay);

		/* Enter… */
		enter(barsGroup, data);

		/* Exit */
		exit(barsGroup, data);

		/* Call the Y axis to adjust it to the new scale */
		svg.select(".outer-wrapper .chart .y")
			.transition()
			.duration(duration)
			.call(yAxis);

		svg.select(".outer-wrapper .chart .x")
			.transition()
			.duration(duration)
			.call(xAxis);

		barsGroup.selectAll("rect").on("mouseover", function (d,i) {
			console.log("i is: " + (i + 1));
		});

		// tooltip(width, margin, duration);

	}

	return {
		updateBars: function (data, updateDelay) {
			updateBars(data, updateDelay);
		}

	};


}
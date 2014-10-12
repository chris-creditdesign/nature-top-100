function buildGraphic (topData, discipline, margin, width, height, miniHeight, colour, duration, delay) {

	var selected;

	var svg = d3.select(".outer-wrapper .chart").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.mid + miniHeight + margin.bottom);

	svg.append("defs").append("clipPath")
		.attr("id", "clip")
		.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", width)
		.attr("height" , height);

	var barsGroup = svg.append('g')
						.attr("class","barsGroup")
						.attr("transform","translate(" + margin.left + "," + margin.top + ")")
						.attr("clip-path", "url(#clip)");

	var miniGroup = svg.append('g')
						.attr("class","miniGroup")
						.attr("transform","translate(" + margin.left + "," + (margin.top + height + margin.mid) + ")");

	var brushGroup = svg.append('g')
						.attr("class","brushGroup")
						.attr("transform","translate(" + margin.left + "," + (margin.top + height + margin.mid) + ")");

	/*	Scales */
	var axisRange = d3.range(topData.length);

	axisRange.shift();

	axisRange.push((axisRange[axisRange.length - 1] + 1));

	var yScale = d3.scale.linear()
		.range([height, 0])
		.domain([0, d3.max(topData, function(d) { 
			return d.lifeCycle.Total;
		})]);

	var xScale = d3.scale.ordinal()
		.rangeBands([width, 0], 0.4, 0)
		.domain(d3.range(topData.length));

	var xScaleBrush = d3.scale.ordinal()
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
		.attr("transform", "translate(" + margin.left + "," + (margin.top + height + margin.mid + miniHeight) + ")" )
		.call(xAxis)
	  .append("g")
		.attr("class", "axisLabel")
	  .append("text")
		.attr("transform", "translate(" + (width/2) + "," + (margin.bottom*0.8) + ")")
		.style("text-anchor", "middle") 
		.text("Ranking");

	/* brush */
	var brush = d3.svg.brush()
					.x(xScaleBrush)
					.extent([0, width])
					.on("brush", display);

	brushGroup.append("g")
		.attr("class", "brush")
		.call(brush)
		.selectAll("rect")
		.attr("opacity", 0.5)
		.attr("height", miniHeight);

	function display () {
		
		selected =  xScaleBrush.domain()
								.filter(function(d){
									return (brush.extent()[0] <= xScaleBrush(d)) && (xScaleBrush(d) <= brush.extent()[1]);
								});

		var start;
		var end;

		/* Keep a minimum amount of bars on there to avoid any jank */
		if (selected.length > 2 ) {
			start = selected[0];
			end = selected[selected.length - 1];
		} else {
			start = 0;
			end = topData.length;
		}

		var updatedData = topData.slice(start, end);

		updateBars(updatedData);

	}

	function update (grp, data, main) {
		grp.selectAll("rect").data(data, function (d) {
				return d.title;
			})
			.attr("x", function (d, i) {
				return xScale(i);
			})
			.attr("width", function (d) {
				return xScale.rangeBand();
			})
			.attr("y", function (d){
				return main ? yScale(d.lifeCycle.Total) : 0;
			})
			.attr("height", function (d) {
				return main ? height - yScale(d.lifeCycle.Total) : miniHeight;
			});
	}

	function enter (grp, data, main) {
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
				return main ? yScale(d.lifeCycle.Total) : 0;
			})
			.attr("height", function (d) {
				return main ? height - yScale(d.lifeCycle.Total) : miniHeight;
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
			.remove();
	}
	
	enter(miniGroup, data, false);

	function updateBars (data) {

		xScale.domain(d3.range(data.length));
		yScale.domain([0, d3.max(data, function(d) { return d.lifeCycle.Total;})]);

		/* Update */
		update(barsGroup, data, true);

		/* Enter… */
		enter(barsGroup, data, true);

		/* Exit */
		exit(barsGroup, data);

		/* Call the Y axis to adjust it to the new scale */
		svg.select(".outer-wrapper .chart .y")
			.transition()
			.duration(10)
			.call(yAxis);

		barsGroup.selectAll("rect").on("mouseover", function (d,i) {
			console.log("i is: " + (i + 1));
		});

		// tooltip(width, margin, duration);

	}

	return {
		updateBars: function (data) {
			updateBars(data);
		}

	};


}
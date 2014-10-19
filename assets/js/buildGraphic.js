function buildGraphic (topData, discipline, margin, width, height, miniHeight, colour, duration, delay, displayIndex) {

	var selected;
	var handleWidth = 15;
	var rankIndex = displayIndex;

	function tenOrOne(num) {
		if (((num % 10) === 0) || num === 1) {
			return true;
		} else {
			return false;
		}
	}

	var svg = d3.select(".outer-wrapper .chart").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.mid + miniHeight + margin.bottom);

	var barsGroup = svg.append('g')
						.attr("class","barsGroup")
						.attr("transform","translate(" + margin.left + "," + margin.top + ")");

	var numbersGroup = svg.append('g')
						.attr("class","numbersGroup")
						.attr("transform","translate(" + margin.left + "," + (margin.top + height) + ")");

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
			return d.total;
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
		.tickSize(-width, 0)
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
					.on("brush", display)
					.on("brushend", brushend);

	brushGroup.append("g")
		.attr("class", "brush")
		.call(brush)
		.selectAll("rect")
		.attr("fill","none")
		.attr("height", miniHeight );

	var brushHandleGroup = brushGroup.selectAll(".resize").append("g") 
		.attr("transform", function(d, i) {
			return  i ? "translate(" + -(handleWidth) + ",0)" : "translate(0,0)";   
		});

	brushHandleGroup.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("fill", "#aaa")
		.attr("width", handleWidth)
		.attr("height", miniHeight);

	brushHandleGroup.append("line")
		.attr("x1", (handleWidth * 0.65))
		.attr("y1", (miniHeight * 0.35))
		.attr("x2", (handleWidth * 0.65))
		.attr("y2", (miniHeight * 0.65))
		.attr("stroke", "#555")
		.attr("stroke-width", 2);

	brushHandleGroup.append("line")
		.attr("x1", (handleWidth * 0.35))
		.attr("y1", (miniHeight * 0.35))
		.attr("x2", (handleWidth * 0.35))
		.attr("y2", (miniHeight * 0.65))
		.attr("stroke", "#555")
		.attr("stroke-width", 2);


	function display () {
		
		selected =  xScaleBrush.domain()
								.filter(function(d){
									return (brush.extent()[0] <= xScaleBrush(d)) && (xScaleBrush(d) <= brush.extent()[1]);
								});

		var start = selected[0];
		var	end = selected[selected.length - 1] + 1;

		var updatedData = topData.slice(start, end);

		updateBars(updatedData);

	}

	function brushend() {
		if (brush.extent()[0] === brush.extent()[1]) {
			d3.select(this).call(brush.extent([0,width]));
			display();
		}
	}

	function updateBarsGroup (data) {

		barsGroup.selectAll("rect").data(data, function (d) {
				return d.title;
			})
			.attr("x", function (d, i) {
				return xScale(i);
			})
			.attr("width", function (d) {
				return xScale.rangeBand();
			})
			.attr("y", function (d){
				return yScale(d.total);
			})
			.attr("height", function (d) {
				return height - yScale(d.total);
			});

		barsGroup.selectAll("path").data(data, function (d) {
				return d.title;
			})
			.attr("class", function(d) {
				return "rank" + d.rank;
			})
			.attr("fill","#444")
			.attr("transform", function(d,i) {
				/* Catch an error if trying to translate 0 paths */
				var horizTranslate;
				if (xScale(i) === undefined) {
					horizTranslate = 0;
				} else {
					horizTranslate = (xScale(i) + (xScale.rangeBand()/2));
				}
				return "translate(" + horizTranslate + "," + (yScale(d.total) -7) + "), scale(0.9)"; 
			})
			.attr("opacity", 0);

	}

	function updateMiniBars(data) {
		miniGroup.selectAll("rect").data(data, function (d) {
			return d.title;
		})
		.attr("fill", function (d, i){
			return getColour(d.discipline, colour, discipline);
		});
	}

	function updateNumbers (data) {
		numbersGroup.selectAll("text").data(data, function (d){
			return d.title;
		})
		.attr("x", function (d,i){
			return xScale(i) + (xScale.rangeBand() / 2);
		})
		.text(function (d) {
			return tenOrOne(d.rank) ? d.rank : "";
		});

		numbersGroup.selectAll("line").data(data,function(d) {
			return d.title;
		})
		.attr("x1", function (d, i) {
			return xScale(i) + (xScale.rangeBand() / 2) ;
		})
		.attr("y1", 0)
		.attr("x2", function (d, i) {
			return xScale(i) + (xScale.rangeBand() / 2) ;
		})
		.attr("y2", function(d) {
			return tenOrOne(d.rank) ? 3 : 0;
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
				return main ? yScale(d.total) : 0;
			})
			.attr("height", function (d) {
				return main ? height - yScale(d.total) : miniHeight;
			})
			.attr("fill", function (d, i){
				return getColour(d.discipline, colour, discipline);
			})
			.attr("opacity", function () {
				return 1;
			});

		grp.selectAll("path")
			.data(data)
			.enter().append("path")
			.attr("d", d3.svg.symbol().type("diamond"))
			.attr("class", function(d) {
				return "rank" + d.rank;
			})
			.attr("fill","#444")
			.attr("transform", function(d,i) {
				var verticalTranslate = main ? yScale(d.total) -7 : -7;
				var scale = main ? "0.9" : "0.8";
				return "translate(" + (xScale(i) + (xScale.rangeBand()/2)) + "," + verticalTranslate + "), scale(" + scale + ")"; 
			})
			.attr("opacity", 0);
	}

	function enterNumbers (data) {
		numbersGroup.selectAll("text").data(data, function (d) {
			return d.title;
		})
		.enter()
		.append("text")
		.attr("x", function (d, i) {
			return xScale(i) + (xScale.rangeBand() / 2) ;
		})
		.attr("y", 5)
		.attr("dy", ".8em")
		.style("text-anchor", "middle")
		.text(function (d) {
			return tenOrOne(d.rank) ? d.rank : "";
		});

		numbersGroup.selectAll("line").data(data,function(d) {
			return d.title;
		})
		.enter()
		.append("line")
		.attr("x1", function (d, i) {
			return xScale(i) + (xScale.rangeBand() / 2) ;
		})
		.attr("y1", 0)
		.attr("x2", function (d, i) {
			return xScale(i) + (xScale.rangeBand() / 2) ;
		})
		.attr("y2", function(d) {
			return tenOrOne(d.rank) ? 3 : 0;
		});
	}

	function exitBarsGroup (data) {
		barsGroup.selectAll("rect").data(data, function (d) {
				return d.title;
			}).exit()
			.remove();

		barsGroup.selectAll("path").data(data, function (d) {
				return d.title;
			}).exit()
			.remove();
	}

	function exitMiniBars(data) {
		miniGroup.selectAll("rect").data(data, function (d) {
			return d.title;
		}).exit()
		.attr("fill", "#ececec");
	}


	function exitNumbers (data) {
		numbersGroup.selectAll("text").data(data, function (d) {
			return d.title;
		}).exit()
		.remove();

		numbersGroup.selectAll("line").data(data, function (d) {
			return d.title;
		}).exit()
		.remove();
	}

	function upDatePointer (displayIndex) {

			rankIndex = displayIndex;

			barsGroup.selectAll("path")
				.attr("opacity", 0);

			barsGroup.select("path.rank" + (rankIndex + 1))
				.attr("opacity", 1);

			miniGroup.selectAll("path")
				.attr("opacity", 0);

			miniGroup.select("path.rank" + (rankIndex + 1))
				.attr("opacity", 1);
	}
	
	enter(miniGroup, data, false);

	function updateBars (data) {

		console.log(displayIndex);

		xScale.domain(d3.range(data.length));
		yScale.domain([0, d3.max(data, function(d) { return d.total;})]);

		/* Update */
		updateBarsGroup(data);
		updateMiniBars(data);
		updateNumbers(data);

		/* Enter… */
		enter(barsGroup, data, true);
		enterNumbers(data);

		/* Exit */
		exitBarsGroup(data);
		exitMiniBars(data);
		exitNumbers(data);

		/* Call the Y axis to adjust it to the new scale */
		svg.select(".outer-wrapper .chart .y")
			.transition()
			.duration(10)
			.call(yAxis);

		upDatePointer(rankIndex);

		barsGroup.selectAll("rect").on("mouseover", function (d,i) {
			console.log("rank is: " + d.rank);
		});


		// tooltip(width, margin, format);

	}

	return {
		updateBars: function (data) {
			updateBars(data);
		},

		upDatePointer: function (displayIndex) {
			upDatePointer(displayIndex);
		}

	};


}
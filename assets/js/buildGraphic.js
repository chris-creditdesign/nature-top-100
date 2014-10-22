function tenOrOne(num) {
	if (((num % 10) === 0) || num === 1) {
		return true;
	} else {
		return false;
	}
}

BuildWidget.prototype.buildGraphic = function () {
	this.svg = d3.select(this.target  + " > .chart").append("svg")
		.attr("width", this.params.width + this.params.margin.left + this.params.margin.right)
		.attr("height", this.params.height + this.params.margin.top + this.params.margin.mid + this.params.miniHeight + this.params.margin.bottom);

	this.barsGroup = this.svg.append('g')
						.attr("class","barsGroup")
						.attr("transform","translate(" + this.params.margin.left + "," + this.params.margin.top + ")");

	this.numbersGroup = this.svg.append('g')
						.attr("class","numbersGroup")
						.attr("transform","translate(" + this.params.margin.left + "," + (this.params.margin.top + this.params.height) + ")");

	this.miniGroup = this.svg.append('g')
						.attr("class","miniGroup")
						.attr("transform","translate(" + this.params.margin.left + "," + (this.params.margin.top + this.params.height + this.params.margin.mid) + ")");

	this.brushGroup = this.svg.append('g')
						.attr("class","brushGroup")
						.attr("transform","translate(" + this.params.margin.left + "," + (this.params.margin.top + this.params.height + this.params.margin.mid) + ")");
};

BuildWidget.prototype.buildScales = function () {
	this.axisRange = d3.range(this.data.length);

	this.axisRange.shift();

	this.axisRange.push((this.axisRange[this.axisRange.length - 1] + 1));

	this.yScale = d3.scale.linear()
		.range([this.params.height, 0])
		.domain([0, d3.max(this.data, function(d) { 
			return d.total;
		})]);

	this.xScale = d3.scale.ordinal()
		.rangeBands([this.params.width, 0], 0.4, 0)
		.domain(d3.range(this.data.length));

	this.xScaleBrush = d3.scale.ordinal()
		.rangeBands([this.params.width, 0], 0.4, 0)
		.domain(d3.range(this.data.length));

	this.xScaleAxis = d3.scale.ordinal()
		.rangeBands([this.params.width, 0], 0.4, 0)
		.domain(this.axisRange);

};

BuildWidget.prototype.buildAxes = function () {
	this.yAxis = d3.svg.axis()
		.scale(this.yScale)
		.tickSize(-this.params.width, 0)
		.ticks(4)
		.orient("left");

	this.xAxis = d3.svg.axis()
		.scale(this.xScaleAxis)
		.tickSize(3,0)
		.tickValues([1,10,20,30,40,50,60,70,80,90,100])
		.orient("bottom");

	/*	Prepare the y axis but do not call .call(xAxis) yet */
	this.svg.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + this.params.margin.left + "," + this.params.margin.top + ")")
	  .append("g")
		.attr("class", "axisLabel")
	  .append("text")
		.attr("transform", "translate(" + -(this.params.margin.left * 0.8) + "," + (this.params.height/2) + "), rotate(-90)")
		.style("text-anchor", "middle")
		.text("Total citations");

	/* Prepare the x axis */
	this.svg.append("g")
		.attr("class","x axis")
		.attr("transform", "translate(" + this.params.margin.left + "," + (this.params.margin.top + this.params.height + this.params.margin.mid + this.params.miniHeight) + ")" )
		.call(this.xAxis)
	  .append("g")
		.attr("class", "axisLabel")
	  .append("text")
		.attr("transform", "translate(" + (this.params.width/2) + "," + (this.params.margin.bottom*0.8) + ")")
		.style("text-anchor", "middle") 
		.text("Ranking");
};

BuildWidget.prototype.buildBrush = function () {
	var self = this;

	var display = function () {
		var selected =  self.xScaleBrush.domain()
								.filter(function(d){
									return (brush.extent()[0] <= self.xScaleBrush(d)) && (self.xScaleBrush(d) <= brush.extent()[1]);
								});


		var start = selected[0];
		var end = selected[selected.length - 1] + 1;

		self.updatedData = self.data.slice(start, end);

		self.updateBars();
	};

	var brushend = function () {
		if (brush.extent()[0] === brush.extent()[1]) {
			d3.select(this).call(brush.extent([0, self.params.width]));
			display();
		}
	};

	var brush = d3.svg.brush()
					.x(this.xScaleBrush)
					.extent([0, this.params.width])
					.on("brush", display)
					.on("brushend", brushend);

	this.brushGroup.append("g")
		.attr("class", "brush")
		.call(brush)
		.selectAll("rect")
		.attr("fill","none")
		.attr("height", this.params.miniHeight );

	this.brushHandleGroup = this.brushGroup.selectAll(".resize").append("g") 
		.attr("transform", function(d, i) {
			return  i ? "translate(" + -(self.params.handleWidth) + ",0)" : "translate(0,0)";   
		});

	this.brushHandleGroup.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("fill", "#aaa")
		.attr("width", this.params.handleWidth)
		.attr("height", this.params.miniHeight);

	this.brushHandleGroup.append("line")
		.attr("x1", (this.params.handleWidth * 0.65))
		.attr("y1", (this.params.miniHeight * 0.35))
		.attr("x2", (this.params.handleWidth * 0.65))
		.attr("y2", (this.params.miniHeight * 0.65))
		.attr("stroke", "#555")
		.attr("stroke-width", 2);

	this.brushHandleGroup.append("line")
		.attr("x1", (this.params.handleWidth * 0.35))
		.attr("y1", (this.params.miniHeight * 0.35))
		.attr("x2", (this.params.handleWidth * 0.35))
		.attr("y2", (this.params.miniHeight * 0.65))
		.attr("stroke", "#555")
		.attr("stroke-width", 2);
};

BuildWidget.prototype.updateBars = function () {
		this.xScale.domain(d3.range(this.updatedData.length));
		this.yScale.domain([0, d3.max(this.updatedData, function(d) { return d.total;})]);

		/* Update */
		// updateBarsGroup(data);
		this.updateMainBars();
		this.updateMainPaths();
		this.updateMiniBars();
		this.updateNumbers();

		/* Enter… */
		// enter(this.barsGroup, this.updatedData, true);
		this.enterMainBars();
		this.enterMainPaths();
		this.enterMiniPaths();
		this.enterNumbers();

		/* Exit */
		// exitBarsGroup(data);
		this.exitMainBars();
		this.exitMainPaths();
		this.exitMiniBars();
		this.exitNumbers();

		/* Call the Y axis to adjust it to the new scale */
		this.svg.select(".outer-wrapper .chart .y")
			.transition()
			.duration(10)
			.call(this.yAxis);

		this.upDatePointer();

		// barsGroup.selectAll("rect").on("click", function (d,i) {
		// 	displayIndex = d.rank -1;

		// 	pubsub.publish("newIndexChosen", displayIndex);
		// });


		// tooltip(width, margin, format);
};


BuildWidget.prototype.enterMainBars = function() {
	var self = this;

	this.barsGroup.selectAll("rect")
		.data(this.updatedData, function (d) {
			return d.title;
		})
		.enter()
		.append("rect")
		.attr("x", function (d, i) {
			return self.xScale(i);
		})
		.attr("width", function(d) {
			return self.xScale.rangeBand();
		})
		.attr("y", function (d){
			return self.yScale(d.total);
		})
		.attr("height", function (d) {
			return self.params.height - self.yScale(d.total);
		})
		.attr("fill", function (d, i){
			return getColour(d.discipline, self.params.colour, self.disciplines);
		})
		.attr("opacity", function () {
			return 1;
		});
};

BuildWidget.prototype.enterMiniBars = function () {
	var self = this;

	this.miniGroup.selectAll("rect")
		.data(this.updatedData, function (d) {
			return d.title;
		})
		.enter()
		.append("rect")
		.attr("x", function (d, i) {
			return self.xScale(i);
		})
		.attr("width", function(d) {
			return self.xScale.rangeBand();
		})
		.attr("y", function (d){
			return 0;
		})
		.attr("height", function (d) {
			return self.params.miniHeight;
		})
		.attr("fill", function (d, i){
			return getColour(d.discipline, self.params.colour, self.disciplines);
		})
		.attr("opacity", function () {
			return 1;
		});
};

BuildWidget.prototype.enterMainPaths = function() {
	var self = this;

	this.barsGroup.selectAll("path")
		.data(this.updatedData, function (d) {
			return d.title;
		})
		.enter().append("path")
		.attr("d", d3.svg.symbol().type("diamond"))
		.attr("class", function(d) {
			return "rank" + d.rank;
		})
		.attr("fill","#444")
		.attr("transform", function(d,i) {
			var verticalTranslate = self.yScale(d.total) -7;
			var scale = "0.9";
			return "translate(" + (self.xScale(i) + (self.xScale.rangeBand()/2)) + "," + verticalTranslate + "), scale(" + scale + ")"; 
		})
		.attr("opacity", 0);

};

BuildWidget.prototype.enterMiniPaths = function () {
	var self = this;

	this.miniGroup.selectAll("path")
		.data(this.updatedData, function (d) {
			return d.title;
		})
		.enter().append("path")
		.attr("d", d3.svg.symbol().type("diamond"))
		.attr("class", function(d) {
			return "rank" + d.rank;
		})
		.attr("fill","#444")
		.attr("transform", function(d,i) {
			var verticalTranslate = -7;
			var scale = "0.8";
			return "translate(" + (self.xScale(i) + (self.xScale.rangeBand()/2)) + "," + verticalTranslate + "), scale(" + scale + ")"; 
		})
		.attr("opacity", 0);
};

BuildWidget.prototype.enterNumbers = function () {
	var self = this;

	this.numbersGroup.selectAll("text").data(this.updatedData, function (d) {
			return d.title;
		})
		.enter()
		.append("text")
		.attr("x", function (d, i) {
			return self.xScale(i) + (self.xScale.rangeBand() / 2) ;
		})
		.attr("y", 5)
		.attr("dy", ".8em")
		.style("text-anchor", "middle")
		.text(function (d) {
			return tenOrOne(d.rank) ? d.rank : "";
		});

	this.numbersGroup.selectAll("line").data(this.updatedData, function(d) {
			return d.title;
		})
		.enter()
		.append("line")
		.attr("x1", function (d, i) {
			return self.xScale(i) + (self.xScale.rangeBand() / 2) ;
		})
		.attr("y1", 0)
		.attr("x2", function (d, i) {
			return self.xScale(i) + (self.xScale.rangeBand() / 2) ;
		})
		.attr("y2", function(d) {
			return tenOrOne(d.rank) ? 3 : 0;
		});
};

BuildWidget.prototype.exitMainBars = function () {
	this.barsGroup.selectAll("rect").data(this.updatedData, function (d) {
			return d.title;
		}).exit()
		.remove();
};

BuildWidget.prototype.exitMainPaths = function () {
	this.barsGroup.selectAll("path").data(this.updatedData, function (d) {
			return d.title;
		}).exit()
		.remove();
};

BuildWidget.prototype.exitMiniBars = function () {
	this.miniGroup.selectAll("rect").data(this.updatedData, function (d) {
			return d.title;
		}).exit()
		.attr("fill", "#ececec");
};

BuildWidget.prototype.exitNumbers = function () {
	this.numbersGroup.selectAll("text").data(this.updatedData, function (d) {
			return d.title;
		}).exit()
		.remove();

	this.numbersGroup.selectAll("line").data(this.updatedData, function (d) {
			return d.title;
		}).exit()
		.remove();
};

BuildWidget.prototype.updateMainBars = function () {
	var self = this;

	this.barsGroup.selectAll("rect").data(this.updatedData, function (d) {
			return d.title;
		})
		.attr("x", function (d, i) {
			return self.xScale(i);
		})
		.attr("width", function (d) {
			return self.xScale.rangeBand();
		})
		.attr("y", function (d){
			return self.yScale(d.total);
		})
		.attr("height", function (d) {
			return self.params.height - self.yScale(d.total);
		});
};

BuildWidget.prototype.updateMainPaths = function () {
	var self = this;

	this.barsGroup.selectAll("path").data(this.updatedData, function (d) {
			return d.title;
		})
		.attr("class", function (d) {
			return "rank" + d.rank;
		})
		.attr("fill","#444")
		.attr("transform", function (d,i) {
			/* Catch an error if trying to translate 0 paths */
			var horizTranslate;
			if (self.xScale(i) === undefined) {
				horizTranslate = 0;
			} else {
				horizTranslate = (self.xScale(i) + (self.xScale.rangeBand()/2));
			}
			return "translate(" + horizTranslate + "," + (self.yScale(d.total) -7) + "), scale(0.9)"; 
		})
		.attr("opacity", 0);
};

BuildWidget.prototype.updateMiniBars = function () {
	var self = this;

	this.miniGroup.selectAll("rect").data(this.updatedData, function (d) {
			return d.title;
		})
		.attr("fill", function (d, i){
			return getColour(d.discipline, self.params.colour, self.disciplines);
		});
};

BuildWidget.prototype.updateNumbers = function () {
	var self = this;

	this.numbersGroup.selectAll("text").data(this.updatedData, function (d){
			return d.title;
		})
		.attr("x", function (d,i){
			return self.xScale(i) + (self.xScale.rangeBand() / 2);
		})
		.text(function (d) {
			return tenOrOne(d.rank) ? d.rank : "";
		});

	this.numbersGroup.selectAll("line").data(this.updatedData,function(d) {
			return d.title;
		})
		.attr("x1", function (d, i) {
			return self.xScale(i) + (self.xScale.rangeBand() / 2) ;
		})
		.attr("y1", 0)
		.attr("x2", function (d, i) {
			return self.xScale(i) + (self.xScale.rangeBand() / 2) ;
		})
		.attr("y2", function (d) {
			return tenOrOne(d.rank) ? 3 : 0;
		});
};

BuildWidget.prototype.upDatePointer = function () {

		this.barsGroup.selectAll("path")
			.attr("opacity", 0);

		this.barsGroup.select("path.rank" + (this.displayIndex + 1))
			.attr("opacity", 1);

		this.miniGroup.selectAll("path")
			.attr("opacity", 0);

		this.miniGroup.select("path.rank" + (this.displayIndex+ 1))
			.attr("opacity", 1);
};
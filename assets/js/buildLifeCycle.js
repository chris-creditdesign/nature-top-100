BuildWidget.prototype.prepareLifeCycelData = function () {
	for (var i = 0; i < this.data.length; i++) {
		for (var y = 0; y < this.data[i].lifeCycle.length; y++) {
			this.data[i].lifeCycle[y].date = this.parseDate(this.data[i].lifeCycle[y].year);
		}
	}
};

BuildWidget.prototype.buildLifeCycle = function () {
	this.lifeCycleSvg = d3.select(this.target + " > .info-box > .life-cycle-chart").append("svg")
		.attr("width", this.params.lifeCycleWidth + this.params.lifeCycleMargin.left + this.params.lifeCycleMargin.right)
		.attr("height", this.params.lifeCycleHeight + this.params.lifeCycleMargin.top + this.params.lifeCycleMargin.bottom)
	  .append("g")
		.attr("transform", "translate(" + this.params.lifeCycleMargin.left + "," + this.params.lifeCycleMargin.top + ")");

	this.lifeCycleSvg.append("g")
		.attr("class","white-box")
	  .append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", this.params.lifeCycleWidth)
		.attr("height", this.params.lifeCycleHeight)
		.attr("fill","#FFF");
};

BuildWidget.prototype.buildLifeCycleScales = function () {
	this.xScaleLifeCycle = d3.time.scale()
		.range([0, this.params.lifeCycleWidth])
		.domain(d3.extent(this.data[this.displayIndex].lifeCycle, function(d) { return d.date; }));

	this.yScaleLifeCycle = d3.scale.linear()
		.range([this.params.lifeCycleHeight, 0])
		.domain([0,12000]);

};

BuildWidget.prototype.buildLifeCycleAxes = function () {
	var self = this;

	this.xAxisLifeCycle = d3.svg.axis()
		.scale(this.xScaleLifeCycle)
		.ticks(5)
		.orient("bottom");

	this.yAxisLifeCycle = d3.svg.axis()
		.scale(this.yScaleLifeCycle)
		.ticks(5)
		.tickSize(-this.params.lifeCycleWidth, 0)
		.orient("left");

	this.line = d3.svg.line()
		.x(function(d) { return self.xScaleLifeCycle(d.date); })
		.y(function(d) { return self.yScaleLifeCycle(d.cites); });

	this.lifeCycleSvg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + this.params.lifeCycleHeight + ")")
	    .call(this.xAxisLifeCycle);

	this.lifeCycleSvg.append("g")
	    .attr("class", "y axis")
	    .call(this.yAxisLifeCycle)
	  .append("text")
	    .attr("transform", "translate(" + -(this.params.lifeCycleMargin.left * 0.9) + "," + (this.params.lifeCycleHeight/2) + "), rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".5em")
	    .style("text-anchor", "middle")
	    .text("Citations per year");

	this.lifeCycleSvg.append("path")
		.datum(this.data[this.displayIndex].lifeCycle)
		.attr("class", "line")
		.attr("d", this.line);
};

// Still needs to be tested!
BuildWidget.prototype.updateLifeCycleLine = function () {
	this.xScaleLifeCycle.domain(d3.extent(this.data[this.displayIndex].lifeCycle, function(d) { return d.date; }));

	/* Can this work better */
	// Store a reference to the axis and the line in the  BuildWidget object? Innit? 
	this.lifeCycleSvg.select(".outer-wrapper .life-cycle-chart .x")
		.transition()
		.duration(150)
		.call(this.xAxisLifeCycle);


	this.lifeCycleSvg.selectAll(".outer-wrapper .life-cycle-chart path.line")
		.data([this.data[this.displayIndex].lifeCycle])
		.attr("d", this.line);
};

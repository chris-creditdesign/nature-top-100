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
		.attr("transform", "translate(" + -(this.params.margin.left * 0.75) + "," + (this.params.height/2) + "), rotate(-90)")
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

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

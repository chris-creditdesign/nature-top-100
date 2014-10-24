BuildWidget.prototype.buildScales = function () {
	this.axisRange = d3.range(this.data.length);

	this.axisRange.shift();

	this.axisRange.push((this.axisRange[this.axisRange.length - 1] + 1));

	this.yScale = d3.scale.linear()
		.range([this.params.height, 0])
		.domain([0, d3.max(this.data, function(d) { 
			return d.cites;
		})]);

	this.xScale = d3.scale.ordinal()
		.rangeBands([0, this.params.width], 0.4, 0)
		.domain(d3.range(this.data.length));

	this.xScaleBrush = d3.scale.ordinal()
		.rangeBands([0, this.params.width], 0.4, 0)
		.domain(d3.range(this.data.length));

	this.xScaleAxis = d3.scale.ordinal()
		.rangeBands([0, this.params.width], 0.4, 0)
		.domain(this.axisRange);
};

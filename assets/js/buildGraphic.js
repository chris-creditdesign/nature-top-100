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

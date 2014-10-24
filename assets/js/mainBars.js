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
			return self.yScale(d.cites);
		})
		.attr("height", function (d) {
			return self.params.height - self.yScale(d.cites);
		})
		.attr("fill", function (d, i){
			return getColour(d.discipline, self.params.colour, self.disciplines);
		})
		.attr("opacity", function () {
			return 1;
		});
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
			return self.yScale(d.cites);
		})
		.attr("height", function (d) {
			return self.params.height - self.yScale(d.cites);
		});
};

BuildWidget.prototype.exitMainBars = function () {
	this.barsGroup.selectAll("rect").data(this.updatedData, function (d) {
			return d.title;
		}).exit()
		.remove();
};

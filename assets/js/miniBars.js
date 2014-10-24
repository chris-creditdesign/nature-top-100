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

BuildWidget.prototype.updateMiniBars = function () {
	var self = this;

	this.miniGroup.selectAll("rect").data(this.updatedData, function (d) {
			return d.title;
		})
		.attr("fill", function (d, i){
			return getColour(d.discipline, self.params.colour, self.disciplines);
		});
};

BuildWidget.prototype.exitMiniBars = function () {
	this.miniGroup.selectAll("rect").data(this.updatedData, function (d) {
			return d.title;
		}).exit()
		.attr("fill", "#ececec");
};

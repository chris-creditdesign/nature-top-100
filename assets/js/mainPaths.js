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
			var verticalTranslate = self.yScale(d.cites) -7;
			var scale = "0.9";
			return "translate(" + (self.xScale(i) + (self.xScale.rangeBand()/2)) + "," + verticalTranslate + "), scale(" + scale + ")"; 
		})
		.attr("opacity", 0);
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
			return "translate(" + horizTranslate + "," + (self.yScale(d.cites) -7) + "), scale(0.9)"; 
		})
		.attr("opacity", 0);
};

BuildWidget.prototype.exitMainPaths = function () {
	this.barsGroup.selectAll("path").data(this.updatedData, function (d) {
			return d.title;
		}).exit()
		.remove();
};

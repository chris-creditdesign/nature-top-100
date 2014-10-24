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

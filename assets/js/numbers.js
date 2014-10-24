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

BuildWidget.prototype.upDatePointer = function () {

		this.barsGroup.selectAll("path")
			.attr("opacity", 0);

		this.barsGroup.select("path.rank" + (this.displayIndex + 1))
			.attr("opacity", 1);

		this.miniGroup.selectAll("path")
			.attr("opacity", 0);

		this.miniGroup.select("path.rank" + (this.displayIndex+ 1))
			.attr("opacity", 1);
};

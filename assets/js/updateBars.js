BuildWidget.prototype.updateBars = function () {
		var self = this;

		this.xScale.domain(d3.range(this.updatedData.length));
		this.yScale.domain([0, d3.max(this.updatedData, function(d) { return d.cites;})]);

		/* Update */
		this.updateMainBars();
		this.updateMainPaths();
		this.updateMiniBars();
		this.updateNumbers();

		/* Enter… */
		this.enterMainBars();
		this.enterMainPaths();
		this.enterMiniPaths();
		this.enterNumbers();

		/* Exit */
		this.exitMainBars();
		this.exitMainPaths();
		this.exitMiniBars();
		this.exitNumbers();

		/* Call the Y axis to adjust it to the new scale */
		this.svg.select(".outer-wrapper .chart .y")
			.transition()
			.duration(10)
			.call(this.yAxis);

		this.upDatePointer();

		this.barsGroup.selectAll("rect").on("click", function (d,i) {
			self.displayIndex = d.rank -1;

			self.pubsub.publish("newIndexChosen", self.displayIndex);
		});
};

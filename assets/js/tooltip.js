function tooltip (width,margin,duration) {
	var format = d3.format("0,000");

	d3.select(".outer-wrapper .chart .tool-tip")
		.style("left", margin.left + "px")
		.style("width", (width - 20)+ "px");

	d3.select("svg g.hiddenBarsGroup").selectAll("rect").on("mouseover", function (d,i) {
		var title = d.title;
		var author = d.author;
		var cites = format(d.cites);
		var year = d.year;
		var thisIndex = i;

		var y = parseInt(d3.select(this).attr("y"),10);

		d3.select(".outer-wrapper .chart .tool-tip")
			.html("<p>" + cites + " citations.</p><p>" + title + ".</p><p>" + author + ". " + year + ".</p>")
			.style("top", (margin.top + 12 + y) + "px")
			.classed("hidden", false)
			.transition()
			.duration(duration/2)
			.style("opacity", 1);

		d3.select(this).attr("opacity",0.4);
	})
	.on("mouseout", function (d, i) {
		d3.select(this).attr("opacity", 0);

		d3.select(".outer-wrapper .chart .tool-tip")
			.transition()
			.delay(duration/4)
			.duration(duration/2)
			.style("opacity", 0)
			.each("end", function() {
				d3.select(".outer-wrapper .chart .tool-tip").classed("hidden", true);
			});
	});

}
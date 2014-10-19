function createKey (data, colour) {
	data.sort();

	/* Create checkboxes for each discipline */
	d3.select(".outer-wrapper .choose-option")
		.append("ul")
		.selectAll('li')
	  .data(data)
		.enter()
		.append("li")
		.style("border-left",function (d, i) {
			return "20px solid " + getColour (d, colour, data);
		})
		.html(function(d,i) {			
			return d;
		});
}
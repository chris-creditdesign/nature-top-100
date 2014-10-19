function createKey (data, colour) {
	
	var sortedData = [];

	for (var i = 0; i < data.length; i++) {
		sortedData.push(data[i]);
	}

	sortedData.sort();

	/* Create checkboxes for each discipline */
	d3.select(".outer-wrapper .choose-option")
		.append("ul")
		.selectAll('li')
	  .data(sortedData)
		.enter()
		.append("li")
		.style("border-left",function (d, i) {
			return "20px solid " + getColour (d, colour, data);
		})
		.html(function(d,i) {			
			return d;
		});
}
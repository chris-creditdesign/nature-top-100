function createCheckboxes (data, colour) {


 	sortedData = [];

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
		.html(function(d,i) {
			var name = d;
			var safeName  = name.toLowerCase().split(' ').join("-");

			var innerHTML = "<label><input type='checkbox' id='" + safeName + "' checked >" + name + "</label>";
			
			return innerHTML;
		})
		.style("color", function (d,i) {
			return getColour (d, colour, data);
		});
}

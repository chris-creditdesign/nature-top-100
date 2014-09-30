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
		.style("border-left",function (d, i) {
			return "10px solid " + getColour (d, colour, data);
		})
		.html(function(d,i) {
			var name = d;
			var safeName  = name.toLowerCase().split(' ').join("-");

			var innerHTML = "<input type='checkbox' id='" + safeName + "' style='background-color:" + "#fff" + ";' checked ><label for='" + safeName + "'>" + name + "</label>";
			
			return innerHTML;
		});
}

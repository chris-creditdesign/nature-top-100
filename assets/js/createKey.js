BuildWidget.prototype.createKey = function () {
	var self = this;
	var sortedData = [];

	for (var i = 0; i < this.disciplines.length; i++) {
		sortedData.push(this.disciplines[i]);
	}

	sortedData.sort();

	/* Create checkboxes for each discipline */
	d3.select(this.target + " > .discipline-colour")
		.append("ul")
		.selectAll('li')
	  .data(sortedData)
		.enter()
		.append("li")
		.style("border-left",function (d, i) {
			return "20px solid " + getColour (d, self.params.colour, self.disciplines);
		})
		.html(function(d,i) {			
			return d;
		});
};
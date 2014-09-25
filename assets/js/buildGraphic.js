function buildGraphic (topData, margin, width, height, colour, duration) {

	var svg = d3.select(".outer-wrapper .chart").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);

	svg.append("rect")
		.attr("width", width)
		.attr("height", height)
		.attr("fill","none")
		.attr("stroke","skyblue")
		.attr("stroke-width", 0.25)
		.attr("x", margin.left)
		.attr("y", margin.top);

	var barsGroup = svg.append('g')
						.attr("transform","translate(" + margin.left + "," + margin.top + ")");
	
	/*	Define Y scale range to go from height to 0
		Do not define the domain yet */
	var xScale = d3.scale.linear()
		.range([0 , width])
		.domain([d3.min(topData, function(d) { return d.cites;}), d3.max(topData, function(d) { return d.cites;})]);

	var yScale = d3.scale.ordinal()
		.domain(d3.range(topData.length))
		.rangeBands([0, height], 0.2, 0);


	var bars = barsGroup.selectAll("rect")
		.data(topData, function(d, i) {
			return d.title;
		});

	/* Enter… */
	bars.enter()
		.append("rect")
		.attr("x", function (d) {
			return (width/2) - (xScale(d.cites) / 2);
		})
		.attr("width", function(d) {
			return xScale(d.cites);
		})
		.attr("y", function(d, i){
			return yScale(i);
		})
		.attr("height", function () {
			return yScale.rangeBand();
		} )
		.attr("opacity",1)
		.attr("fill", function(d, i){

			my_colour = "#000";

			switch (d.discipline) {
				case "Statistics":
					my_colour = colour[0];
					break;
				case "Other":
					my_colour = colour[1];
					break;
				case "Math/Computer Science":
					my_colour = colour[2];
					break;
				case "Experimental, Social and Clinical Psychology":
					my_colour = colour[3];
					break;
				case "Discoveries":
					my_colour = colour[4];
					break;
				case "Crystallography":
					my_colour = colour[5];
					break;
				case "Condensed Matter Physics":
					my_colour = colour[6];
					break;
				case "Biomedical Research and Clinical Medicine":
					my_colour = colour[7];
					break;
				case "bioinformatics close to evolutionary biology":
					my_colour = colour[8];
					break;
				case "bioinformatics":
					my_colour = colour[9];
					break;
				case "biochem techniques":
					my_colour = colour[10];
					break;
				case "Atomic and Molecular Physics":
					my_colour = colour[11];
					break;
				default:
					my_colour = colour[0];
			}

			return my_colour;
		});


}
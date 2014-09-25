function buildDataSet (data) {
	var dataSet = [];

	var tableRows = jQuery(data).find("tbody tr");
	var headerRows = jQuery(data).find("thead tr").find('th');

	var discipline = [];

	for (var i = 0; i < tableRows.length; i++) {
		var newObject = {};

		newObject.author = tableRows.eq(i).find("td").eq(0).text();
		newObject.title = tableRows.eq(i).find("td").eq(1).text();
		newObject.publication = tableRows.eq(i).find("td").eq(2).text();
		
		newObject.cites = parseInt(tableRows.eq(i).find("td").eq(3).text(), 10);

		newObject.year = parseInt(tableRows.eq(i).find("td").eq(4).text(), 10);
		
		newObject.doi = tableRows.eq(i).find("td").eq(5).text();

		my_discipline = tableRows.eq(i).find("td").eq(6).text();

		newObject.discipline = my_discipline;

		if (discipline.indexOf(my_discipline) === -1 ) {
			discipline.push(my_discipline);
		}
		
		dataSet.push(newObject);
	}

	return {
		dataSet: dataSet,
		discipline: discipline
	};
}
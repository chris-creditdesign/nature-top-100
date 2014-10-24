function buildDataSet (data) {

	var discipline = [];

	for (var i = 0; i < data.length; i++) {

		var my_discipline = data[i].discipline;

		if (discipline.indexOf(my_discipline) === -1 ) {
			discipline.push(my_discipline);
		}
		
	}

	return discipline;
}

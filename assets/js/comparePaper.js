/*	Function to sort papers by citation */
function comparePaper(a,b) {
	if (a.lifeCycle.Total < b.lifeCycle.Total)
		return 1;
	if (a.lifeCycle.Total > b.lifeCycle.Total)
		return -1;
	return 0;
}

/*	Function to sort papers by year */
function compareYear(a,b) {
	if (a.year === b.year) {
		if (a.cites < b.cites)
			return 1;
		if (a.cites > b.cites)
			return -1;
		return 0;
	}

	if (a.year < b.year)
		return 1;
	if (a.year > b.year)
		return -1;
	return 0;
}
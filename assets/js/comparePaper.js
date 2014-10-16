/*	Function to sort papers by citation */
function comparePaper(a,b) {
	if (a.total < b.total)
		return 1;
	if (a.total > b.total)
		return -1;
	return 0;
}

/*	Function to sort citations by year */
function compareYear(a,b) {
	if (a.date < b.date)
		return 1;
	if (a.date > b.date)
		return -1;
	return 0;
}
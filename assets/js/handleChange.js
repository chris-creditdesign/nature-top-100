function handleChange (dataSet, activeArray, delay, myGraphic) {
	var startingLength = activeArray.length;

	/* First remove the existing data from the arrays */
	while (activeArray.length > 0) {
		activeArray.shift();
	}

	activeArray = updateArray(dataSet);

	if (startingLength < activeArray.length) {
		delay = 0;
	}

	return {
		activeArray: activeArray,
		activeDelay: delay
	};

}
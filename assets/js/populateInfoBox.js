function populateInfoBox (data, index, format) {
	var myData = data;
	var myFormat = format;


	function updateText (index) {
		jQuery(".title").text(myData[index].rank + ". " + myData[index].title);
		jQuery(".authors").text(myData[index].authors);
		jQuery(".journal").text(myData[index].journal);
		jQuery(".pub-year").text(myData[index].pub_year);
		jQuery(".discipline").text(myData[index].discipline);
		jQuery(".cites").text(myFormat(myData[index].total));
		jQuery(".doi").text(myData[index].doi);
	}

	updateText(index);

	return {
		updateText: function (index) {
			updateText(index);
		}

	};
}
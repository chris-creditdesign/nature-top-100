function populateInfoBox (data, index, format) {
	jQuery(".title").text(data[index].title);
	jQuery(".authors").text(data[index].authors);
	jQuery(".journal").text(data[index].journal);
	jQuery(".pub-year").text(data[index].pub_year);
	jQuery(".discipline").text(data[index].discipline);
	jQuery(".cites").text(format(data[index].total));
	jQuery(".doi").text(data[index].doi);
}
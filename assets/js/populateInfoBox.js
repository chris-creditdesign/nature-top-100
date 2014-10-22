BuildWidget.prototype.populateInfoBox = function () {
	jQuery(".life-cycle .title").text(this.data[this.displayIndex].rank + ". " + this.data[this.displayIndex].title);
	jQuery(".life-cycle .authors").text(this.data[this.displayIndex].authors);
	jQuery(".life-cycle .journal").text(this.data[this.displayIndex].journal);
	jQuery(".life-cycle .pub-year").text(this.data[this.displayIndex].pub_year);
	jQuery(".life-cycle .cites").text(this.format(this.data[this.displayIndex].total));
	jQuery(".life-cycle .doi").text(this.data[this.displayIndex].doi);
};
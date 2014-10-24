BuildWidget.prototype.populateInfoBox = function () {
	jQuery(".life-cycle .rank").text(this.data[this.displayIndex].rank);
	jQuery(".life-cycle .cites").text(this.format(this.data[this.displayIndex].cites));

	jQuery(".life-cycle .title").html(this.data[this.displayIndex].title);
	jQuery(".life-cycle .authors").html(this.data[this.displayIndex].authors);

	jQuery(".life-cycle a.paper-link").prop("href", this.data[this.displayIndex].hyperlink);
	
	jQuery(".life-cycle .journal").text(this.data[this.displayIndex].journal);
	jQuery(".life-cycle .volume").text(this.data[this.displayIndex].volume);
	jQuery(".life-cycle .page").html(this.data[this.displayIndex].page);
	jQuery(".life-cycle .pub-year").text(this.data[this.displayIndex]["pub-year"]);

};

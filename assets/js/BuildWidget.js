function BuildWidget (target, params, data) {
	this.target = target;
	this.params = params;
	this.data = data;
	this.pubsub = {};
	this.updatedData = [];
	this.disciplines = [];
	this.lifeCycleData = [];
	this.displayIndex = 0;
	this.format = d3.format("0,000");
	this.parseDate = d3.time.format("%Y").parse;
}
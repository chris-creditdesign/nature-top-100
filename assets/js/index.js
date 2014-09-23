(function() {
		var init = function($)
		{

		/*	==================================================================================== */
		/*	GLOBAL VARIABLES FOR D3 */

		/*  Colours for the bars */
		var colour = ["#1abc9c","#27ae60","#3498db","#5959b7","#EB6B4B"];

		/*	Margin, Width and height */
		var margin = {top: 15, right: 20, bottom: 20, left: 90};
		var width = $('.section').width()  - margin.left - margin.right;
		var height = 600 - margin.top - margin.bottom;
		/*	Global variable to control the length of D3 transitons */
		var duration = 450;

		var topData;

		/*	==================================================================================== */
		/*	jQuery ready */

			/*	==================================================================================== */
			/*	Load D3 */
			/*	All of the D3/svg code is contained within the call back function */
			/*	Loading D3 into ie6-8 seems to cause a runtime error */
			$.getScript("http://www.nature.com/polopoly_static/js/d3.v3.min.js", function() {

				$.ajax({
					url: "data/top-100-edit-table.html",
					dataType: 'text',
					success: function (data) {
						topData = buildDataSet(data);
					}

				}).done(function () {
					

					var myGraphic = buildGraphic(topData, margin, width, height, colour, duration);

				}); /* End of ajax call */

			}); /* End of d3js getscript call

		/* End of active code */
		};


	setTimeout(function()
	{
	if (typeof jQuery !== 'undefined')
	{
		init(jQuery);
	} else
	{
		setTimeout(arguments.callee, 60);
	}
	}, 60);

})();
(function() {
		var init = function($)
		{

		/*	==================================================================================== */
		/*	GLOBAL VARIABLES FOR D3 */

		/*  Colours for the bars */
		// var colour = ["#1abc9c","#27ae60","#3498db","#5959b7","#EB6B4B"];

		var colour =	["#ce071d",
						"#e95f0f",
						"#85b48b",
						"#302d2c",
						"#c2514e",
						"#e8af4a",
						"#dfc85c",
						"#a5b688",
						"#565279",
						"#8b0a1f",
						"#75c4c0",
						"#858986"];

		/*	Margin, Width and height */
		var margin = {top: 50, right: 20, bottom: 20, left: 20};
		var width = $('.section').width()  - margin.left - margin.right;
		var height = 600 - margin.top - margin.bottom;
		/*	Global variable to control the length of D3 transitons */
		var duration = 450;
		var delay = duration;
		var updateDelay = 0;
		var activeRecord = {};

		var topData;
		var myGraphic;
		var displayArray = [];

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
					
					createCheckboxes(topData.discipline, colour);

					var myData = topData.dataSet;
					
					displayArray = updateArray(myData);

					myGraphic = buildGraphic(displayArray, topData.discipline, margin, width, height, colour, duration, delay);
					myGraphic.updateBars(displayArray, updateDelay);

					$('.outer-wrapper form.choose-order select').on('change', function () {
						activeRecord = handleChange(myData, displayArray, delay, myGraphic);

						displayArray = activeRecord.activeArray;

						myGraphic.updateBars(displayArray, activeRecord.activeDelay);
					});

					d3.selectAll('.outer-wrapper form.choose-option input').on('change', function () {
						activeRecord = handleChange(myData, displayArray, delay, myGraphic);

						displayArray = activeRecord.activeArray;

						myGraphic.updateBars(displayArray, activeRecord.activeDelay);
					});

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
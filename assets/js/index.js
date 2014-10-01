(function() {
		var init = function($)
		{

		/*	==================================================================================== */
		/*	GLOBAL VARIABLES FOR D3 */

		/*  Colours for the bars */
		// var colour = ["#1abc9c","#27ae60","#3498db","#5959b7","#EB6B4B"];

		var colour =	["#c1272d",
						"#ed1c24",
						"#f15a24",
						"#f7931e",
						"#fbb03b",
						"#fcee21",
						"#d9e021",
						"#8cc63f",
						"#39b54a",
						"#006837",
						"#00a99d",
						"#29abe2",
						"#0071bc",
						"#2e3192",
						"#1b1464",
						"#662d91",
						"#93278f",
						"#9e005d",
						"#c69c6d",
						"#a67c52",
						"#8c6239",
						"#754c24",
						"#754c24",
						"#603813",
						"#42210b"];

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
					// url: "https://poly-admin1.nature.com/preview/www/2.788/1.15117/7.20172",
					dataType: 'text',
					success: function (data) {
						topData = buildDataSet(data);
					}

				}).done(function () {
					
					createCheckboxes(topData.discipline, colour);
					
					displayArray = updateArray(topData.dataSet);

					myGraphic = buildGraphic(displayArray, topData.discipline, margin, width, height, colour, duration, delay);
					myGraphic.updateBars(displayArray, updateDelay);

					$('.outer-wrapper form.choose-order select').change(function () {
						activeRecord = handleChange(topData.dataSet, displayArray, delay, myGraphic);

						displayArray = activeRecord.activeArray;

						myGraphic.updateBars(displayArray, activeRecord.activeDelay);
					});

					d3.selectAll('.outer-wrapper form.choose-option input').on('change', function () {
						activeRecord = handleChange(topData.dataSet, displayArray, delay, myGraphic);

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
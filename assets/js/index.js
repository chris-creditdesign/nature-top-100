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
		var margin = {top: 40, right: 40, bottom: 40, left: 80, mid: 40};
		var lifeCycleMargin = {top: 20, right: 20, bottom: 20, left: 80};
		var width = $('.section').width()  - margin.left - margin.right;
		var miniHeight = 60;
		var lifeCycleHeight = 100;
		var lifeCycleWidth = width - lifeCycleMargin.left - lifeCycleMargin.right;
		var height = 400 - margin.top - margin.mid - miniHeight - margin.bottom;
		/*	Global variable to control the length of D3 transitons */
		var duration = 450;
		var delay = duration;
		var activeRecord = {};

		var topData;
		var myGraphic;
		var myLifeCycleGraphic;
		var myInfoBox;
		var displayArray = [];
		var disciplineArray = [];
		var displayIndex = 0;

		/*	==================================================================================== */
		/*	jQuery ready */

			/*	==================================================================================== */
			/*	Load D3 */
			/*	All of the D3/svg code is contained within the call back function */
			/*	Loading D3 into ie6-8 seems to cause a runtime error */
			$.getScript("http://www.nature.com/polopoly_static/js/d3.v3.min.js", function() {

				var format = d3.format("0,000");

				function upDateButtons (idx) {
					$('button.widget-button').removeClass("active");

					if ( displayIndex < 99 ) {
						$('button.widget-button.lower').addClass("active");
					}

					if ( displayIndex > 0 ) {
						$('button.widget-button.higher').addClass("active");
					}
				}

				displayArray = data.sort(comparePaper);

				for (var i = 0; i < displayArray.length; i++) {
					displayArray[i].rank = (i + 1);
				}

				disciplineArray = buildDataSet(data);

				myGraphic = buildGraphic(displayArray, disciplineArray, margin, width, height, miniHeight, colour, duration, delay, displayIndex);
				myGraphic.updateBars(displayArray, displayIndex);

				myInfoBox = populateInfoBox(displayArray, displayIndex, format);
				myLifeCycleGraphic = buildLifeCycle(displayArray, displayIndex, lifeCycleMargin, lifeCycleWidth, lifeCycleHeight, colour);

				function upDateInfoBox (idx) {
					myLifeCycleGraphic.updateLine(idx);
					myInfoBox.updateText(idx);
				}

				upDateButtons(displayIndex);

				$('button.widget-button').on("click", function () {
					if ($(this).hasClass('lower') && (displayIndex < 99)) {
						displayIndex++;
						upDateInfoBox(displayIndex);
						myGraphic.upDatePointer(displayIndex);
					} else if ($(this).hasClass('higher') && (displayIndex > 0)) {
						displayIndex--;
						upDateInfoBox(displayIndex);
						myGraphic.upDatePointer(displayIndex);
					}
					upDateButtons(displayIndex);
				});


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
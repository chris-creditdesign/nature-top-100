var thRoParams = {};

thRoParams.colour =  ["#c1272d",
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
thRoParams.margin = {top: 40, right: 40, bottom: 40, left: 80, mid: 40};
thRoParams.lifeCycleMargin = {top: 10, right: 20, bottom: 20, left: 70};
thRoParams.width = jQuery('.section').width()  - thRoParams.margin.left - thRoParams.margin.right;
thRoParams.miniHeight = 60;
thRoParams.lifeCycleHeight = 100;
thRoParams.lifeCycleWidth = jQuery('.info-box').width() - thRoParams.lifeCycleMargin.left - thRoParams.lifeCycleMargin.right;
thRoParams.height = 400 - thRoParams.margin.top - thRoParams.margin.mid - thRoParams.miniHeight - thRoParams.margin.bottom;
thRoParams.handleWidth = 15;
/*	Global variable to control the length of D3 transitons */
thRoParams.duration = 450;
thRoParams.delay = 450;
thRoParams.activeRecord = {};
thRoParams.topData = [];
thRoParams.displayArray = [];
thRoParams.disciplineArray = [];
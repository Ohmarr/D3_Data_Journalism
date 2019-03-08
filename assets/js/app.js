// * NOTES: SEE 07.03-07&09 // function ignore me includes notes that need to be deleted. 


// @TODO: YOUR CODE HERE!
// columns =    0:id, 1:state, 2:abbr, 3:poverty, 5:age, 7:income, 8:incomeMoe, 9:healthcare, 
//              10:healthcareLow, 11:healthcareHigh, 12:obesity, 13:obesityLow, 14:obesityHigh, 15:smokes, 16:smokesLow, 17:smokesHigh
csv_url = 'https://raw.githubusercontent.com/the-Coding-Boot-Camp-at-UT/UTAUS201810DATA2/master/16_D3/Homework/Instructions/StarterCode/assets/data/data.csv?token=APbpvnKwY1hoh6gkhNYlITselwj5Sa21ks5ciyUywA%3D%3D'
// –––––––––––––––––––––––––––––– * LEVEL I * –––––––––––––––––––––––––––––– //
// Create Scatter Plot between 2 data variables such as (Healthcare vs. Poverty) or (Smokers vs. Age).
// use d3 to create a scatter plot that represents each state w/ circle elements. 
//      -You'll code this graphic in the app.js file of your homework directory—make sure you pull in the data from
//       data.csv by using the d3.csv function. 
//      -Include state abbreviations in the circles.
//      -Create and situate your axes and labels to the left and bottom of the chart.
//      -Note: You'll need to use python -m http.server to run the visualization. This will host the page at
//       localhost:8000 in your web browser.
// >python -m http.server 8000


function ignoreMe(){
//–––––––––––––––––––––––––––––––
//BINDING DATA TO 3 LIST ELEMENTS;
var selection1 = d3.select('ul').selectAll('li')
selection1.each((d, i)=>{
        console.log('element', this);
        console.log('data', d);
        console.log('index', i);
});
var arrr = [50, 55, 53];
selection1.data(arr) //bind new arrary to existing table; 
selection1.data(arr).text(d=>d) //bind the data as text; 
selection1.data(arr).append('li').text(d=>d) //add extra list elements; 
selection1.data(arr).enter().append('li').text(d=>d) //add extra list elements; 

// FIRST BIND THE DATA AS DESIRED
selection1.data(arr).text(d=>d) //bind the data as text; 
//increase # of list elements
selection1.data(arr).enter().append('li').text(d=>d) //add extra list elements; 
//decrease # of list itemts
selection1.data(arr).exit().remove();
//––––––––––––––––––––––––––––––––
//CREATE A D3 TABLE USING DATA BINDING; AUSTIN WEATHER;
d3.select('tbody')		// will know to create # of rows as data available
	.selectAll('tr')      	// not there yet
	.data(austinWeather)  	// to pass in data
	.enter().append('tr') 	// to append table row element which will contain ↓
	.html(d => {		// the contents of each `tr`=table_row
		return	`<td>${d.date}</td>
			 <td>${d.low}</td>
			 <td>${d.high}</td>`
        }); //setting table rows to Austin, weather;
//––––––––––––––––––––––––––––––––
//html//
/*     <div id="content">
                <div class="temps"></div>
                <div class="temps"></div>
                <div class="temps"></div>
        </div> */
var selection = d3.select('#content').selectAll('.temps') // global variable
////*1. Basic Data Bind - Update only first 3 elements, b/c only 3 elements exist
var austinTemps = [76, 59, 08, 90, 21, 22, 14];
selection.data(austinTemps).style('height', d => d + 'px'); 	// will affect css; data returned as pixel height
////*2. Updates ONLY new elements - Append new list elements to allow for more temps
var austinTemps = [76, 59, -08, 73, 71];
	selection
	.data(austinTemps)	// select node w/ id=content&class=temps// bind data
	.enter().append("div")			// appends new div to selected node
	.classed("temps", true)			// set class
	.style("height", d=>d+"px");		// set height
////*3. Enter - Updates All Elements
var austinTemps = [76, 59, 08, 73, 71];
selection
	.data(austinTemps)
	.enter().append("div")
	.classed("temps", true)
	.merge(selection)
	.style("height", d=> d + "px")
////*4. Exit Pattern - remove elements
var austinTemps = [76];
var choice = selection.data(austinTemps)
choice
	.enter().append("div")
	.classed("temps", true)
	.merge(selection)
	.style("height", d=> d + "px")
choice.exit().remove(); // must be done in three steps

function addOrRemoveElements(austinTemps) {
	var choice = selection.data(austinTemps)
	choice
		.enter().append("div")
		.classed("temps", true)
		.merge(selection)
		.style("height", d => d + "px")
		
	choice.exit().remove();}

};
// –––––––––––––––––– SVG CANVAS SETUP ––––––––––––––––––

// if (!svgArea.empty()) // clear svg canvas
// { 
// 	svgArea.remove();
// }
var svgWidth = 960;
var svgHeight = 500;
var margin = {
	top: 20,
	right: 40,
	bottom: 60,
	left: 100
};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3 // Create an SVG wrapper which will contain our element; append an SVG group that will hold our chart, and shift it by left and top margins.
	.select("#scatter")
	.append("svg")
	.attr("width", svgWidth)
	.attr("height", svgHeight);
var chartGroup = svg.append("g")
	.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data

d3.csv(csv_url)
	.then(inputData=>
		{
		inputData.forEach(data=>	// Step 1: Parse/Cast as numbers
		{
			data.poverty = +data.poverty;
			data.healthcare = +data.healthcare;
		});
		var xLinearScale = d3				// Step 2: Create scale functions
			.scaleLinear()
			.domain([0, d3.max(inputData, d => d.poverty)])
			.range([0, width]);
		var yLinearScale = d3
			.scaleLinear() 				// Step 3: Create axis functions
			.domain([0, d3.max(inputData, d => d.healthcare)])
			.range([height, 0]);
		var bottomAxis = d3
			.axisBottom(xLinearScale);
		var leftAxis = d3
			.axisLeft(yLinearScale);
		chartGroup
			.append("g")				// Step 4: Append Axes to the chart
			.attr("transform", `translate(0, ${height})`)
			.call(bottomAxis);
		chartGroup.append("g")
			.call(leftAxis);
		chartGroup// Create axes labels
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 0 - margin.left + 40)
			.attr("x", 0 - (height / 2))
			.attr("dy", "1em")
			.attr("class", "axisText")
			.text("Healthcare");
		chartGroup.append("text")
			.attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
			.attr("class", "axisText")
			.text("Poverty");
		var circlesGroup = chartGroup.selectAll("circle") 	// Step 5: Create Circles
			.data(inputData)
			.enter().append("circle")
			.attr("cx", d => xLinearScale(d.poverty))
			.attr("cy", d => yLinearScale(d.healthcare))
			.attr("r", "15")
			.attr("fill", "pink")
			.attr("opacity", ".5");


                // var toolTip = d3.tip()				// Step 6: Initialize tool tip
		// 	.attr("class", "tooltip")
		// 	.offset([80, -60])
		// 	.html(d=>`${d.abbr}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}`);
                // chartGroup.call(toolTip);	// Step 7: Create tooltip in the chart
		// circlesGroup// Step 8: Create event listeners to display and hide the tooltip
		// 	.on("click", data=>toolTip.show(data, this))
		// 	.on("mouseout", (data, index)=>toolTip.hide(data))// on mouseout event
		
	});

// –––––––––––––––––––––––––––––– * LEVEL II * –––––––––––––––––––––––––––––– //
// Level 2: Impress the Boss (Optional Challenge Assignment)
//      Why make a static graphic when D3 lets you interact with your data?
//        1. More Data, More Dynamics
//              You're going to include more demographics and more risk factors. 
//              Place additional labels in your scatter plot and give them click events so that your users can decide which data to display. 
//              Animate the transitions for your circles' locations as well as the range of your axes. Do this for two risk factors for each axis. 
//              Or, for an extreme challenge, create three for each axis.
//              Hint: Try binding all of the CSV data to your circles. This will let you easily determine their x or y values when you click the labels.
        //2. Incorporate d3-tip
        //      While the ticks on the axes allow us to infer approximate values for each circle, it's impossible to determine the true value without adding another layer of data. 
        //      Enter tooltips: developers can implement these in their D3 graphics to reveal a specific element's data when the user hovers their cursor over the element. 
        //      Add tooltips to your circles and display each tooltip with the data that the user has selected. 
        //      Use the d3-tip.js plugin developed by Justin Palmer—we've already included this plugin in your assignment directory.
//Check out David Gotz's example to see how you should implement tooltips with d3-tip.
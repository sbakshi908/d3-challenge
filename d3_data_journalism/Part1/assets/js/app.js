// @TODO: YOUR CODE HERE!

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

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g") //apends as a group 
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/Data/data.csv").then(function (smokerData) {
    //parse data as numbers 
    smokerData.forEach(function (data) {
      data.poverty=+ data.poverty;
      data.healthcare=+ data.healthcare;
    });

    //create the scale functions 

    var xLinearScale = d3.scaleLinear()
      //.domain([20, d3.max(smokerData, d => d.poverty)])
      .domain([d3.min(smokerData, d=> d.poverty)* 0.9 , d3.max(smokerData, d => d.poverty) *1.1])
      .range([0, width]); //scale data across pixels 

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(smokerData, d => d.healthcare)])
      .range([height, 0]);

    //create axis functions 
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //create axis 
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
    chartGroup.append("g")
      .call(leftAxis);

    //cerate the circles for plotting 
    
    var circlesGroup = chartGroup.selectAll("circle")
    .data(smokerData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "17")
    .attr("fill", "blue")
    .attr("opacity", ".5");

    //create text group 
    var textGroup = chartGroup.selectAll(null)
    .data(smokerData)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
    .text(d => d.abbr)
    .style("text-anchor", "middle");

    //create axis labels 
    //x  axis
    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Poverty (%)");
    //y axis
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");


    //Initialize tool tip
  
    var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
    return (`${d.state}<br>Poverty %: ${d.poverty}<br>Obesity%: ${d.obesity}`);
    });
    chartGroup.call(toolTip);
  
});


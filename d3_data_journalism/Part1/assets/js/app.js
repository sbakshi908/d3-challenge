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
var svg = d3.select(".scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("data.csv").then(function (smokerData) {
    //parse data as numbers 
    smokerData.forEach(function (data) {
      data.poverty=+ data.poverty;
      data.healthcare=+ data.healthcare;
    });

    //create the scale functions 

    var xLinearScale = d3.scaleLinear()
      .domain([20, d3.max(smokerData, d => d.poverty])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(smokerData, d => d.healthcare)])
      .range([height, 0]);

    //create axis functions 
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //cerate the circles for plotting 
    
    var circlesGroup = chartGroup.selectAll("circle")
    .data(smokerData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("opacity", ".5");

    //Initialize tool tip
  
    // var toolTip = d3.tip()
    // .attr("class", "tooltip")
    // .offset([80, -60])
    // .html(function(d) {
    //   return (`${d.rockband}<br>Hair length: ${d.hair_length}<br>Hits: ${d.num_hits}`);
    // });
  
});


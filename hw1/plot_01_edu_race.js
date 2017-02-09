(function(){
  var outerWidth = 850;
  var outerHeight = 500;
  var margin = { left: 80, top: 60, right: 30, bottom:130 };

  var xColumn = "EduLevel";
  var group = ["White Only", "White Non-spanic Only","Black","Asian","Hispanic","White or Comb","Asian or Comb","Black or Comb"];

  var innerWidth  = outerWidth  - margin.left - margin.right;
  var innerHeight = outerHeight - margin.top  - margin.bottom;

  var svg = d3.select("#bar_edu_race").append("svg")
    .attr("width",  outerWidth)
    .attr("height", outerHeight);
  var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xScale = d3.scale.ordinal().rangeBands([0, innerWidth], 0.2);
  var groupScale = d3.scale.ordinal();
  var yScale = d3.scale.linear().range([innerHeight, 0]);

  var colorlist = ["#3366cc", "#dc3912", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
  var color = d3.scale.ordinal()
    .range(colorlist);

  var xAxisG = g.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + innerHeight + ")");
  var yAxisG = g.append("g")
    .attr("class", "y-axis");

  var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
  var yAxis = d3.svg.axis().scale(yScale).orient("left");

  function render(data, i){

    xScale.domain(data.map( function (d){ return d[xColumn]; }));
    groupScale.domain(group).rangeBands([0, xScale.rangeBand()], 0.02);
    yScale.domain([0, 0.4]);

    xAxisG.call(xAxis);
    xAxisG
      .selectAll("text")
      .attr("dx", "-.8em")
      .attr("dy", ".25em")
      .attr("transform", "rotate(-30)")
      .style("text-anchor", "end");

    yAxisG.call(yAxis);

    yAxisG.append("text")
      .attr("class", "ylabel")
      .attr("x", -innerHeight/2)
      .attr("y", -margin.left*2/3)
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "middle")
      .style("font-size", "12.5pt")
      .text("Proportion of People by Education");

    var bars = g.selectAll(".bars")
    .data(data)
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + xScale(d[xColumn]) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return group.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("class", "bars")
      .attr("x", function(d) { return groupScale(d.key); })
      .attr("y", function(d) { return yScale(d.value); })
      .attr("width", groupScale.rangeBand())
      .attr("height", function(d) { return innerHeight - yScale(d.value); })
      .attr("fill", function(d) { return color(d.key); });

    var legend = g.append("g")
      .attr("class","legend")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "front")
      .selectAll("g")
      .data(group)
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x",  19)
        .attr("y", 19.5)
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", color);

    legend.append("text")
        .attr("x",  50)
        .attr("y", 29)
        .attr("dy", "0.32em")
        .text(function(d) { return d; });
  }

  d3.csv("data_01_edu_race.csv", function(data) {
    //make the data numeric
    data.forEach(function(d){
      var keys = d3.keys(d);
      for(var i = 1, n = keys.length; i<n; i++){
        d[keys[i]] = +d[keys[i]];
      }
      return d;
    });

    render(data);
  });
})();

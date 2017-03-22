// Search "D3 Margin Convention" on Google to understand margins.
var margin_l_2_2 = {top_l_2_2: 20, right_l_2_2: 220, bottom_l_2_2: 30, left_l_2_2: 60},
    width_l_2_2 = 830 - margin_l_2_2.right_l_2_2 - margin_l_2_2.left_l_2_2,
    height_l_2_2 = 550 - margin_l_2_2.top_l_2_2 - margin_l_2_2.bottom_l_2_2;

var parseDate_l_2_2 = d3.time.format("%Y").parse;

// Define X and Y SCALE and Axis
var x_l_2_2 = d3.time.scale()
    .range([0, width_l_2_2]);

var y_l_2_2 = d3.scale.linear()
    .range([height_l_2_2, 0]);

//var color_l_2_2 = d3.scale.category20();

//var color_l_2_2= d3.scale.ordinal()
//        .range([
//          
////            "#cc4c02", "#88419d","#fc4e2a","#fe9929","#df65b0","#5EB1BF","#5574a6","#114B5F","#F45B69","#644B77","#FA7921","#848982","#457B9D","#E63946",
//        "#848982",
//        "#50AAA7",
////        "#87B9E5","#6094CE","#446DAB","#315088",
////        "#DAE3E5","#BBD1EA","#A1C6EA","#507DBC",
////        "#F2F3AE", "#EDD382","#FC9E4F","#F55541",
//        "#DAE3E5","#BBD1EA","#A1C6EA",
//        "#F2F3AE","#EDD382","#FC9E4F",
//        "#E2B8CF","#C39EC9","#A791C5"]);

//var color_l_2_2= d3.scale.ordinal()
//        .range([
//            "#ededed","#d3d3d3",
////            "#cc4c02", "#88419d","#fc4e2a","#fe9929","#df65b0","#5EB1BF","#5574a6","#114B5F","#F45B69","#644B77","#FA7921","#848982","#457B9D","#E63946",
//            "#716168",
//            "#46465A",
//        "#737373",
////        "#87B9E5","#6094CE","#446DAB","#315088",
////        "#DAE3E5","#BBD1EA","#A1C6EA","#507DBC",
////        "#F2F3AE", "#EDD382","#FC9E4F","#F55541",
//        "#525252","#252525","#D14E61",
//        "#CC3A50","#C7273F","#B5243A","#A32034",
//        "#911D2E","#7F1929"]);

var color_l_2_2 = d3.scale.ordinal()
        .range(["#911D2E", "#A32034", "#B5243A","#C7273F", "#CC3A50", "#D14E61", "#252525",	"#525252", "#737373","#46465A", "#716168"]);

var xAxis_l_2_2 = d3.svg.axis()
    .scale(x_l_2_2)
    .orient("bottom");

var yAxis_l_2_2 = d3.svg.axis()
    .scale(y_l_2_2)
    .orient("left");

var line_l_2_2 = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x_l_2_2(d.year); })
    .y(function(d) { return y_l_2_2(d.killed); });

// Define SVG. "g" means group SVG elements together.
var svg_l_2_2 = d3.select("#multi_line_chart_2_2").append("svg")
            .attr("width", width_l_2_2 + margin_l_2_2.left_l_2_2 + margin_l_2_2.right_l_2_2)
            .attr("height", height_l_2_2 + margin_l_2_2.top_l_2_2 + margin_l_2_2.bottom_l_2_2)
            .append("g")
            .attr("transform", "translate(" + margin_l_2_2.left_l_2_2 + "," + margin_l_2_2.top_l_2_2 + ")");

// Load the data from EPC_2000_2010_new.csv
d3.csv("data/fixed_year_data_output_3_reverse_line_1_2.csv", function(error, data){
    if (error) throw error;
    color_l_2_2.domain(d3.keys(data[0]).filter(function(key) {return key !== "year"; }));
    
    data.forEach(function(d) {
        d.year = parseDate_l_2_2(d.year);
    });
    
    var countries = color_l_2_2.domain().map(function(name) {
        return {
            name: name,
            values: data.map(function(d) {
                return {year: d.year, killed: +d[name]};
            })
        };
    });
    
    x_l_2_2.domain(d3.extent(data, function(d) { return d.year; }));

    y_l_2_2.domain([
    d3.min(countries, function(c) { return d3.min(c.values, function(v) { return v.killed; }); }),
    d3.max(countries, function(c) { return d3.max(c.values, function(v) { return v.killed; }); })
    ]);

    
    svg_l_2_2.selectAll("line.horizontalGrid").data(y_l_2_2.ticks(8)).enter()
    .append("line")
        .attr(
        {
            "class":"horizontalGrid",
            "x1" : 0,
            "x2" : width_l_2_2,
            "y1" : function(d){ return y_l_2_2(d);},
            "y2" : function(d){ return y_l_2_2(d);},
            "fill" : "none",
            "shape-rendering" : "crispEdges",
            "stroke" : "lightgrey",
            "stroke-width" : "1px"
        });

    svg_l_2_2.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height_l_2_2 + ")")
      .call(xAxis_l_2_2);
    
    svg_l_2_2.append("g")
      .attr("class", "y axis")
      .call(yAxis_l_2_2)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Number of Killed");
    
    var country = svg_l_2_2.selectAll(".country")
      .data(countries)
      .enter().append("g")
      .attr("class", "country");
    
    var path = country.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line_l_2_2(d.values); })
      .style("stroke", function(d) { return color_l_2_2(d.name); })
      .on("mouseover", function(d) { 
          d3.select(this).style("stroke-width", "5px");
      svg_l_2_2.selectAll("text.text_terror" + d.name.substring(d.name.length - 4, d.name.length)).style("opacity", "1");})
      
      .on("mouseout", function(d) {
          d3.select(this).style("stroke-width", "1.5px");
          if (d.name != "Al-Shabaab" && d.name != "Al-Nusrah Front" && d.name != "Fulani Militants"){
              svg_l_2_2.selectAll("text.text_terror" + d.name.substring(d.name.length - 4, d.name.length)).style("opacity", "0.1");
          }
      });
        
    country.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x_l_2_2(d.value.year) + "," + y_l_2_2(d.value.killed) + ")"; })
      .attr("class", function(d) {return "text_terror" + d.name.substring(d.name.length - 4, d.name.length);})
      .attr("x", 3)
      .attr("dy", ".35em")
      .style("font-size", "10px")
      .style("opacity", "0.5")
      .style("opacity",function(d) {
        if (d.name === "Al-Shabaab" || d.name === "Al-Nusrah Front" || d.name === "Fulani Militants") {
            return 1;
        } else {
            return 0.1;
        }
    })
      .text(function(d) { return d.name; });
    
    var varNames = ["Al-Shabaab","Tehrik-i-Taliban Pakistan","Al-Qaida in Iraq","Al-Qaida","Al-Qaida in the Arabian Peninsula","Al-Nusrah Front","Lord's Resistance Army","Liberation Tigers of Tamil Eelam","Revolutionary Armed Forces of Colombia","Communist Party of India - Maoist","Fulani Militants"]
    
    var legend = svg_l_2_2.selectAll(".legend")
        .data(varNames.slice())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(-400," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 15)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", color);
        

    legend.append("text")
        .attr("x", width)
        .attr("y", 6)
        .attr("dy", ".35em")
        //.style("text-anchor", "end")
        .text(function (d) { return d; });
    
});
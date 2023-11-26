//1980
var data1 = [{
        title: "Coal",
        value: 1153,
        all: 1551
    },
    {
        title: "Natural Gas",
        value: 200,
        all: 1551
    },
    {
        title: "Petroleum",
        value: 198,
        all: 1551
    }
];

//1990
var data2 = [{
    title: "Coal",
    value: 1547,
    all: 1820
},
{
    title: "Natural Gas",
    value: 175,
    all: 1820
},
{
    title: "Petroleum",
    value: 98,
    all: 1820
}
];

//2000
var data3 = [{
    title: "Coal",
    value: 1926,
    all: 2296
},
{
    title: "Natural Gas",
    value: 281,
    all: 2296
},
{
    title: "Petroleum",
    value: 89,
    all: 2296
}
];

//2010
var data4 = [{
    title: "Coal",
    value: 1828,
    all: 2259
},
{
    title: "Natural Gas",
    value: 400,
    all: 2259
},
{
    title: "Petroleum",
    value: 31,
    all: 2259
}
];

//2020
var data5 = [{
    title: "Coal",
    value: 788,
    all: 1439
},
{
    title: "Natural Gas",
    value: 635,
    all: 1439
},
{
    title: "Petroleum",
    value: 16,
    all:1439
}
];

var width = 360;
var height = 360;
var radius = Math.min(width, height) / 2;
var donutWidth = 75;
var color = d3.scaleOrdinal()
    .range(["#544C4A", "#D4F1F9", "#9B7653"]);

var svg = d3.select('#donut')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (width / 2) +
        ',' + (height / 2) + ')');

var arc = d3.arc()
    .innerRadius(radius - donutWidth)
    .outerRadius(radius);

var pie = d3.pie()
    .value(function (d) {
        return d.value;
    })
    .sort(null);

var legendRectSize = 13;
var legendSpacing = 7;

var donutTip = d3.select("body").append("div")
    .attr("class", "donut-tip")
    .style("opacity", 0);

var path = svg.selectAll('path')
    .data(pie(data1))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function (d, i) {
        return color(d.data.title);
    })
    .attr('transform', 'translate(0, 0)')
    .on('mouseover', function (d, i) {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '.85');
        donutTip.transition()
            .duration(50)
            .style("opacity", 1);
        let num = (Math.round((d.value / d.data.all) * 100)).toString() + '%';
        donutTip.html(num)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 15) + "px");

    })
    .on('mouseout', function (d, i) {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '1');
        donutTip.transition()
            .duration('50')
            .style("opacity", 0);
    });


var legend = svg.selectAll('.legend')
    .data(color.domain())
    .enter()
    .append('g')
    .attr('class', 'circle-legend')
    .attr('transform', function (d, i) {
        var height = legendRectSize + legendSpacing;
        var offset = height * color.domain().length / 2;
        var horz = -2 * legendRectSize - 13;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
    });

legend.append('circle')
    .style('fill', color)
    .style('stroke', color)
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', '.5rem');

legend.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function (d) {
        return d;
    });

function change(data) {
    var pie = d3.pie()
        .value(function (d) {
            return d.value;
        }).sort(null)(data);

    var width = 360;
    var height = 360;
    var radius = Math.min(width, height) / 2;
    var donutWidth = 75;

    path = d3.select("#donut")
        .selectAll("path")
        .data(pie); // Compute the new angles
    var arc = d3.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);
    path.transition().duration(500).attr("d", arc); // redrawing the path with a smooth transition
}

d3.select("button#id1")
    .on("click", function () {
        change(data1);
    })
d3.select("button#id2")
    .on("click", function () {
        change(data2);
    })
d3.select("button#id3")
    .on("click", function () {
        change(data3);
    })
d3.select("button#id4")
    .on("click", function () {
        change(data4);
    })
d3.select("button#id5")
    .on("click", function () {
        change(data5);
    })
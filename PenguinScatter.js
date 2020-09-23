var penguinPromise = d3.json("classData.json")

var getGrade = function(category)
{
    return category.grade
}

var drawPlot_FHw = function(penguins,screen,xscale,yscale)
{
    d3.select("#graph")
    .selectAll("circle")
    .data(penguins)
    .enter()
    .append("circle")
    .attr("cx",function(penguin)
    {
        var hwArray = penguin.homework.map(getGrade)
        return xscale(d3.mean(hwArray))
    })
    .attr("cy",function(penguin)
    {
        var hwArray = penguin.final.map(getGrade)
        return yscale(d3.mean(hwArray))
    })
    .attr("r",4)
    .on("mouseenter",function(penguin)
    {
        var xPos = d3.event.pageX;
        var yPos = d3.event.pageY;
        d3.select("#tooltip")
        .classed("hidden",false)
        .style("top", yPos+"px")
        .style("left",xPos+"px")
        d3.select("img")
        .attr("src","imgs/" + penguin.picture)
        
    })
}

var initGraph_FHw = function(penguins)
{
    var screen = {width:600,height:600}
    
    d3.select("#graph")
    .attr("width",screen.width)
    .attr("height",screen.height)

    var xscale = d3.scaleLinear()
    .domain([0,100])
    .range([0,screen.width])

    var yscale = d3.scaleLinear()
    .domain([0,100])
    .range([screen.height,0])
    
    d3.select("#header")
    .text("Final Grade vs Average Homework Grade")
    
    drawPlot_FHw(penguins,screen,xscale,yscale)
}

var drawPlot_HwQ = function(penguins,screen,xscale,yscale)
{
    d3.select("#graph")
    .selectAll("circle")
    .data(penguins)
    .enter()
    .append("circle")
    .attr("cx",function(penguin)
    {
        var QuizArray = penguin.quizes.map(getGrade)
        return xscale(d3.mean(QuizArray))
    })
    .attr("cy",function(penguin)
    {
        var hwArray = penguin.homework.map(getGrade)
        return yscale(d3.mean(hwArray))
    })
    .attr("r",4)
    .on("mouseenter",function(penguin)
    {
        var xPos = d3.event.pageX;
        var yPos = d3.event.pageY;
        d3.select("#tooltip")
        .classed("hidden",false)
        .style("top", yPos+"px")
        .style("left",xPos+"px")
        d3.select("img")
        .attr("src","imgs/" + penguin.picture)
        
    })
}

var initGraph_HwQ = function(penguins)
{
    var screen = {width:600,height:600}
    
    d3.select("#graph")
    .attr("width",screen.width)
    .attr("height",screen.height)

    var xscale = d3.scaleLinear()
    .domain([0,10])
    .range([0,screen.width])

    var yscale = d3.scaleLinear()
    .domain([0,80])
    .range([screen.height,0])
    
    d3.select("#header")
    .text("Average Homework Grade vs Average Quiz Grade")
    
    drawPlot_HwQ(penguins,screen,xscale,yscale)
}

var successFCN = function(penguins)
{
    d3.select("#header")
    .text("Data Loaded")
    console.log("Penguins", penguins)
    d3.select("#FHw")
    .on("click",function()
    {
        d3.selectAll("circle")
        .remove()
        initGraph_FHw(penguins)
    })
    d3.select("#HwQ")
    .on("click",function()
    {
        d3.selectAll("circle")
        .remove()
        initGraph_HwQ(penguins)
    })
}

var failFCN = function()
{
    console.log("Couldn't find data")
    d3.select("#header")
    .text("Couldn't find data")
}

penguinPromise.then(successFCN,failFCN)
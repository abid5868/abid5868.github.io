// scripts/scene2.js
function createScene2() {
    const svg = d3.select("#scene-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const tooltip = d3.select("#scene-container")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    d3.csv("data/cars2017.csv").then(function(data) {
        const fuelTypes = Array.from(new Set(data.map(d => d.Fuel)));
        const colorScale = d3.scaleOrdinal()
            .domain(fuelTypes)
            .range(d3.schemeCategory10);

        const x = d3.scaleLinear()
            .range([0, width]);

        const y = d3.scaleLinear()
            .range([height, 0]);

        x.domain([0, d3.max(data, d => +d.AverageHighwayMPG)]);
        y.domain([0, d3.max(data, d => +d.AverageCityMPG)]);

        svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 5)
            .attr("cx", d => x(+d.AverageHighwayMPG))
            .attr("cy", d => y(+d.AverageCityMPG))
            .style("fill", d => colorScale(d.Fuel))
            .on("mouseover", function(event, d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(`Make: ${d.Make}<br>Fuel: ${d.Fuel}<br>Highway MPG: ${d.AverageHighwayMPG}<br>City MPG: ${d.AverageCityMPG}`)
                    .style("left", (event.pageX + 5) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .call(d3.axisLeft(y));

        svg.append("text")
            .attr("class", "axis-label")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 5)
            .text("Average Highway MPG");

        svg.append("text")
            .attr("class", "axis-label")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -margin.left + 20)
            .text("Average City MPG");

            svg.append("text")
            .attr("x", width / 2)
            .attr("y", -margin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            .style("font-weight", "bold")
            .text("City vs Highway MPG by Fuel Type");

        // Legend
        const legend = svg.selectAll(".legend")
            .data(fuelTypes)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", (d, i) => `translate(0,${i * 20})`);

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", colorScale);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(d => d);

        // Annotation
        svg.append("text")
            .attr("class", "annotation")
            .attr("x", x(110))
            .attr("y", y(130) - 10)
            .attr("text-anchor", "middle")
            .text("Electric cars have highest efficiency");

        svg.append("line")
            .attr("x1", x(110))
            .attr("y1", y(130) - 5)
            .attr("x2", x(110))
            .attr("y2", y(130))
            .attr("stroke", "black")
            .attr("stroke-width", 1);
    });
}
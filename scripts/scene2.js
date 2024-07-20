// Chart 2

function createScene2(width, height, margin) {
    const svg = d3.select("#scene-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right + 150)  // Extra space for legend
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

        const dots = svg.selectAll(".dot")
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
            .attr("transform", (d, i) => `translate(${width + 20},${i * 25})`)
            .style("cursor", "pointer")
            .on("click", function(event, d) {
                const isActive = !d3.select(this).classed("active");
                legend.classed("active", false);
                d3.select(this).classed("active", isActive);
                
                if (isActive) {
                    dots.style("opacity", dot => dot.Fuel === d ? 1 : 0.1);
                } else {
                    dots.style("opacity", 1);
                }
            });

        legend.append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", colorScale);

        legend.append("text")
            .attr("x", 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .text(d => d);
    });
}
// Script for scene one

function createScene1() {
    const svg = d3.select("#scene-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    d3.csv("data/cars2017.csv").then(function(data) {
        const groupedbyMakeData = d3.rollup(data, 
            v => d3.mean(v, d => +d.AverageHighwayMPG),
            d => d.Make
        );

        const groupedandsortedData = Array.from(groupedbyMakeData, ([make, avgMPG]) => ({make, avgMPG}))
            .sort((a, b) => b.avgMPG - a.avgMPG)
            .slice(0, 10);

        const x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .range([height, 0]);

        x.domain(groupedandsortedData.map(d => d.make));
        y.domain([0, d3.max(groupedandsortedData, d => d.avgMPG)]);

        svg.selectAll(".bar")
            .data(groupedandsortedData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.make))
            .attr("width", x.bandwidth())
            .attr("y", d => y(d.avgMPG))
            .attr("height", d => height - y(d.avgMPG));

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");

        svg.append("g")
            .call(d3.axisLeft(y));

        svg.append("text")
            .attr("class", "axis-label")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 5)
            .text("Car Make");

        svg.append("text")
            .attr("class", "axis-label")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -margin.left + 20)
            .text("Average Highway MPG");

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", -margin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            .style("font-weight", "bold")
            .text("Top 10 Car Makes by Average Highway MPG");

        // Annotation
        svg.append("text")
            .attr("class", "annotation")
            .attr("x", x("Tesla") + x.bandwidth() / 2)
            .attr("y", y(98) - 10)
            .attr("text-anchor", "middle")
            .text("Tesla leads in Highway MPG");

        svg.append("line")
            .attr("x1", x("Tesla") + x.bandwidth() / 2)
            .attr("y1", y(98) - 5)
            .attr("x2", x("Tesla") + x.bandwidth() / 2)
            .attr("y2", y(98))
            .attr("stroke", "black")
            .attr("stroke-width", 1);
    });
}
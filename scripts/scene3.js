// Chart 3

function createScene3(width, height, margin) {
    const svg = d3.select("#scene-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    d3.csv("data/cars2017.csv").then(function(data) {
        const cylinderCounts = Array.from(new Set(data.map(d => +d.EngineCylinders))).sort((a, b) => a - b);
        
        const groupedData = d3.rollup(data, 
            v => d3.mean(v, d => +d.AverageHighwayMPG),
            d => +d.EngineCylinders
        );

        const processedData = Array.from(groupedData, ([cylinders, avgMPG]) => ({cylinders, avgMPG}))
            .sort((a, b) => a.cylinders - b.cylinders);

        const x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .range([height, 0]);

        x.domain(cylinderCounts.map(String));
        y.domain([0, d3.max(processedData, d => d.avgMPG)]);

        svg.selectAll(".bar")
            .data(processedData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(String(d.cylinders)))
            .attr("width", x.bandwidth())
            .attr("y", d => y(d.avgMPG))
            .attr("height", d => height - y(d.avgMPG));

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
            .text("Number of Engine Cylinders");

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
            .text("Average Highway MPG by Number of Engine Cylinders");
    });
}
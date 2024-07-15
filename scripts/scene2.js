function createScene2(data) {
    const scene = d3.select("#scene2");
    scene.html(""); // Clear previous content

    scene.append("h2").text("Key Insights");

    // Example visualization: Distribution of car prices
    const svg = scene.append("svg").attr("width", 600).attr("height", 400);

    const x = d3.scaleLinear().domain([0, d3.max(data, d => d.Price)]).range([0, 600]);
    const histogram = d3.histogram().value(d => d.Price).domain(x.domain()).thresholds(x.ticks(20));

    const bins = histogram(data);

    const y = d3.scaleLinear().domain([0, d3.max(bins, d => d.length)]).range([400, 0]);

    const bar = svg.selectAll(".bar")
        .data(bins)
        .enter().append("g")
        .attr("class", "bar")
        .attr("transform", d => `translate(${x(d.x0)}, ${y(d.length)})`);

    bar.append("rect")
        .attr("x", 1)
        .attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
        .attr("height", d => 400 - y(d.length));

    bar.append("text")
        .attr("dy", ".75em")
        .attr("y", 6)
        .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2)
        .attr("text-anchor", "middle")
        .text(d => d.length);

    console.log("Scene 2 Data:", data);
}

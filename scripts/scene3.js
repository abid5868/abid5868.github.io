function createScene3(data) {
    const scene = d3.select("#scene3");
    scene.html(""); // Clear previous content

    scene.append("h2").text("Explore the Data");

    // Example interactive scatter plot
    const svg = scene.append("svg").attr("width", 600).attr("height", 400);

    const x = d3.scaleLinear().domain([0, d3.max(data, d => d.Horsepower)]).range([0, 600]);
    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.MPG)]).range([400, 0]);

    svg.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("cx", d => x(d.Horsepower))
        .attr("cy", d => y(d.MPG))
        .attr("r", 5)
        .on("mouseover", (event, d) => {
            const [mouseX, mouseY] = d3.pointer(event);
            svg.append("text")
                .attr("id", "tooltip")
                .attr("x", mouseX + 10)
                .attr("y", mouseY - 10)
                .text(`Price: ${d.Price}, MPG: ${d.MPG}`);
        })
        .on("mouseout", () => {
            svg.select("#tooltip").remove();
        });
}
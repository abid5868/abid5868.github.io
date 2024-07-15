function createScene1(data) {
    const scene = d3.select("#scene1");
    scene.html(""); // Clear previous content

    scene.append("h2").text("Introduction to the Dataset");

    scene.append("p").text("This dataset contains information on various cars from the year 2017, including their prices, horsepower, and fuel efficiency (MPG). Here are some sample entries:");

    // Display sample data
    const sampleData = data.slice(0, 5); // Display the first 5 entries as samples

    const table = scene.append("table").attr("class", "sample-table");
    const thead = table.append("thead");
    const tbody = table.append("tbody");

    // Append table headers
    thead.append("tr")
        .selectAll("th")
        .data(Object.keys(sampleData[0]))
        .enter()
        .append("th")
        .text(d => d);

    // Append table rows
    const rows = tbody.selectAll("tr")
        .data(sampleData)
        .enter()
        .append("tr");

    // Append table cells
    rows.selectAll("td")
        .data(d => Object.values(d))
        .enter()
        .append("td")
        .text(d => d);

    console.log("Scene 1 Data:", data);
}
function createScene1(data) {
    const scene = d3.select("#scene1");
    scene.html(""); // Clear previous content

    scene.append("h2").text("Introduction to the Dataset");

    scene.append("p").text("This dataset contains information on various cars from the year 2017, including their prices, horsepower, and fuel efficiency (MPG).");
}
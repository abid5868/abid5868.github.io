// Load the data and create the visualizations
d3.csv('cars2017.csv').then(data => {
    // Parse data
    data.forEach(d => {
        d.MPG = +d.MPG;
        d.Horsepower = +d.Horsepower;
        d.Price = +d.Price;
    });

    // Scene 1: Introduction to the Dataset
    createScene1(data);

    // Scene 2: Highlighting Key Insights
    createScene2(data);

    // Scene 3: User Exploration
    createScene3(data);
});
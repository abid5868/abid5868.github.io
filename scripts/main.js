let currentScene = 1;

d3.csv('cars2017.csv').then(data => {
    // Parse data
    data.forEach(d => {
        d.MPG = +d.MPG;
        d.Horsepower = +d.Horsepower;
        d.Price = +d.Price;
    });

    // Initialize scenes
    createScene1(data);
    createScene2(data);
    createScene3(data);
});

function showScene(sceneNumber) {
    d3.selectAll('.scene').style('display', 'none');
    d3.select(`#scene${sceneNumber}`).style('display', 'block');

    if (sceneNumber === 1) {
        d3.select('#prevButton').attr('disabled', true);
    } else {
        d3.select('#prevButton').attr('disabled', null);
    }

    if (sceneNumber === 3) {
        d3.select('#nextButton').attr('disabled', true);
    } else {
        d3.select('#nextButton').attr('disabled', null);
    }
}

function nextScene() {
    if (currentScene < 3) {
        currentScene++;
        showScene(currentScene);
    }
}

function prevScene() {
    if (currentScene > 1) {
        currentScene--;
        showScene(currentScene);
    }
}

showScene(currentScene);

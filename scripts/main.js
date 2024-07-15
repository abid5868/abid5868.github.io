let currentScene = 1;
let globalData = null;

d3.csv('data/cars2017.csv').then(data => {
    // Parse data
    data.forEach(d => {
        d.MPG = +d.MPG;
        d.Horsepower = +d.Horsepower;
        d.Price = +d.Price;
    });

    globalData = data;

    // Show the initial scene
    showScene(currentScene, data);
});

function showScene(sceneNumber, data) {
    d3.selectAll('.scene').style('display', 'none');
    const currentSceneElement = d3.select(`#scene${sceneNumber}`).style('display', 'block');

    switch(sceneNumber) {
        case 1:
            createScene1(data);
            break;
        case 2:
            createScene2(data);
            break;
        case 3:
            createScene3(data);
            break;
    }

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
        showScene(currentScene, globalData);
    }
}

function prevScene() {
    if (currentScene > 1) {
        currentScene--;
        showScene(currentScene, globalData);
    }
}

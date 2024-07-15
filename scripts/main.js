// scripts/main.js
let currentScene = 1;
const totalScenes = 3;

function updateNavigation() {
    document.getElementById('prev-btn').disabled = currentScene === 1;
    document.getElementById('next-btn').disabled = currentScene === totalScenes;
}

function loadScene(sceneNumber) {
    d3.select("#scene-container").html("");
    switch(sceneNumber) {
        case 1:
            createScene1();
            break;
        case 2:
            createScene2();
            break;
        case 3:
            createScene3();
            break;
    }
    updateNavigation();
}

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentScene > 1) {
        currentScene--;
        loadScene(currentScene);
    }
});

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentScene < totalScenes) {
        currentScene++;
        loadScene(currentScene);
    }
});

// Initial load
loadScene(currentScene);
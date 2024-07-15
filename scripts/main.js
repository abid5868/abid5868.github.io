// scripts/main.js
let currentScene = 1;
const totalScenes = 3;

const margin = {top: 60, right: 30, bottom: 80, left: 70};
const width = 900 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

function updateNavigation() {
    document.getElementById('prev-btn').disabled = currentScene === 1;
    document.getElementById('next-btn').disabled = currentScene === totalScenes;
}

function loadScene(sceneNumber) {
    d3.select("#scene-container").html("");
    switch(sceneNumber) {
        case 1:
            createScene1(width, height, margin);
            break;
        case 2:
            createScene2(width, height, margin);
            break;
        case 3:
            createScene3(width, height, margin);
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
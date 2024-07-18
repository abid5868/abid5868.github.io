let currentPage = 1;
const totalPages = 3;

const margin = {top: 60, right: 30, bottom: 80, left: 70};
const width = 900 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

function updateNavigation() {
    document.getElementById('prev-button').disabled = currentPage === 1;
    document.getElementById('next-button').disabled = currentPage === totalPages;
}

function loadCurrentScene(sceneNumber) {
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

document.getElementById('prev-button').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadCurrentScene(currentPage);
    }
});

document.getElementById('next-button').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        loadCurrentScene(currentPage);
    }
});

// Initial load
loadCurrentScene(currentPage);
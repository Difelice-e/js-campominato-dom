// ------ VARIABILI ------
const gameWrapper = document.getElementById("wrapper");  // selezioniamo il container

let numberGrid;

let bombList = [];

let result = document.querySelector('.result');
let score = 0;

// let cell = [];



// ------ FUNZIONI ------
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createBomb () {
    bombList = [];
    while (bombList.length < 16) {
        const bombNumber = getRandomInt(1, Math.pow(numberGrid, 2));
        if (!bombList.includes(bombNumber)) {
            bombList.push(bombNumber);
        }   
    }
    console.log(bombList);
}

function getGameMode() {
    let gameMode = document.getElementById("difficulty").value;
    
    if (gameMode == "easy") {
        numberGrid = 10;
    } else if (gameMode == "hard") {
        numberGrid = 9;
    } else {
        numberGrid = 7;
    }
    console.log(numberGrid);
    return numberGrid; 
}

function getGrid(numberGrid) {
    gameWrapper.innerHTML = "";

    for (let i = 1; i <= Math.pow(numberGrid, 2); i++) {
        const squareWrapper = document.createElement("div");
        gameWrapper.append(squareWrapper);
        squareWrapper.classList.add("element");
        squareWrapper.style = `width: calc(100% / ${numberGrid}`;
        squareWrapper.append(i);
    }
}

function endGameWin() {
    gameWrapper.removeEventListener('click', selectThisGrid);
    result.append(`Hai vinto! Il tuo punteggio è ${score}`);
}

function endGameLose() {
    gameWrapper.removeEventListener('click', selectThisGrid);
    result.append(`Hai perso! Il tuo punteggio è ${score}`);
}

function bombReveal() {
    let cells = document.getElementsByClassName('element');
    for(let i = 0; i < cells.length; i++){
        if (bombList.includes(parseInt(cells[i].innerHTML))) {
        cells[i].classList.add('bomb');
        }
    }
}



function selectThisGrid(event) {
    const squareWrapper = event.target;
    if (bombList.includes(parseInt(squareWrapper.innerHTML))) {
        squareWrapper.classList.add("bomb");
        endGameLose();
        bombReveal();
    } else if (!squareWrapper.classList.contains("selected")) {
        squareWrapper.classList.add("selected");
        score = score + 1;
        if (score == Math.pow(numberGrid, 2) - 16) {
            endGameWin();
        }
    }
    console.dir(squareWrapper);
}

function play() {
    getGameMode();
    getGrid(numberGrid);
    createBomb();
    gameWrapper.addEventListener('click', selectThisGrid);
}


// ------ SEZIONE OPERATIVA ------
document.getElementById("play").addEventListener("click", play);
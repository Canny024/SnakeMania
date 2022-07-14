// Game variables

let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3')
const gameOverSound = new Audio('gameover.mp3')
const moveSound = new Audio('move.mp3');
let speed = 7;
let lastPaintTime = 0;
let snakeArr = [
    { x: 9, y: 9 }
]
food = { x: 6, y: 15 };
let score = 0;

// Game Functions


function main(ctime) {
    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    else {
        lastPaintTime = ctime;
        gameEngine();
    }
}
function isCollide(sarr) {
    // If snake Bump into Himself

    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
            return true;
        }
    }
    // If Snake collides with wall

    if ((snakeArr[0].x >= 18 || snakeArr[0].x <= 0) || (snakeArr[0].y >= 18 || snakeArr[0].y <= 0)) { return true; }

}



function gameEngine() {
    //  Part 1 - Updating the snake array and food

    if (isCollide(snakeArr)) {
        gameOverSound.play();
        inputDir = { x: 0, y: 0 };
        alert("GAME OVER!!");
        snakeArr = [{ x: 9, y: 9 }]
        score = 0;
        scoreBox.innerHTML = "SCORE: " + score;
    }

    // if Snake ate the Food 

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = "HIG.SCORE: " + hiscoreval;


        }
        scoreBox.innerHTML = "SCORE: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        console.log(food.x, food.y);
    }

    // Moving the snake

    for (let i = snakeArr.length - 2; i >= 0; i--) {

        snakeArr[i + 1] = { ...snakeArr[i] };

    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2 - Displaying the Snake 

    board.innerHTML = "";
    snakeArr.forEach((e, index) => {

        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else { snakeElement.classList.add('snake'); }

        board.appendChild(snakeElement)

    })
    // Displaying the Food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement)


}
// Main Logic

// Highest score part
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HIG.SCORE: " + hiscore;
}

// Use of buttons and direction chang of snake

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }

})
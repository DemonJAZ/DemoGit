var canvasWidth = 500;
var canvasHeight = 300;
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var input = "d";
var headX = canvasWidth/2;
var headY = canvasHeight/2;
var direction = "left" //default Left
var score = 0;

var cookieSpawned = false;
var cookieLoc = new snakeNode(0,0);

var snake = new Array();
function snakeNode(x,y){
    this.x = x;
    this.y = y;
}

function initialSnakeBody(){
    for (let index = 1; index <= 5; index++) {
        snake.push(new snakeNode(headX-(10*index),headY));  
    }
}
initialSnakeBody();
var GameProcessor = setInterval(RenderGame,100);
function getKeyPressed(){
    input = event.key;
}

function RenderGame(){
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    update();
    keyInput();
    draw();  
}

function keyInput(){
    document.onkeydown = getKeyPressed;
    if(input === "q"){
        clearInterval(GameProcessor);
        alert("Game Quit");
    }
    if(input === "w" & direction != "down" ){
        direction = "up";
    }
    if(input === "a" & direction != "right"){
        direction = "left";
    }
    if(input === "s" & direction != "up"){
        direction = "down";
    }
    if(input === "d" & direction != "left"){
        direction = "right";
    }
}

function draw(){
    for (let index = 0; index < snake.length; index++) {
        ctx.beginPath();
        ctx.rect(snake[index].x,snake[index].y,10,10);
        ctx.fillStyle = "black";
        ctx.fill();  
    }

    if(cookieSpawned){
        ctx.beginPath();
        ctx.rect(cookieLoc.x,cookieLoc.y,10,10);
        ctx.fillStyle = "red";
        ctx.fill();
    }
    
}

function update(){

    for (let index = snake.length-1; index > 0; index--) {
        snake[index].x = snake[index-1].x;
        snake[index].y = snake[index-1].y;
    }
    switch (direction) {
        case "left":
            snake[0].x -= 10;
            break;
        case "right":
            snake[0].x += 10;
            break;
        case "up":
            snake[0].y -= 10;
            break;
        case "down":
            snake[0].y += 10;
            break;
        default:
            break;
    }
    
    

    if(snake[0].x < 0 | snake[0].x > canvasWidth){
        gameOver();
    }
    if(snake[0].y < 0 | snake[0].y > canvasHeight){
        gameOver();
    }

    if(cookieSpawned){
        if(cookieLoc.x == snake[0].x & cookieLoc.y == snake[0].y){
            score +=1;
            document.getElementById("score").innerHTML = score;
            snake.push(new snakeNode(0,0));
            for (let index = snake.length-1; index > 0; index--) {
                snake[index].x = snake[index-1].x;
                snake[index].y = snake[index-1].y;
            }
            switch (direction) {
                case "left":
                    snake[0].x -= 10;
                    break;
                case "right":
                    snake[0].x += 10;
                    break;
                case "up":
                    snake[0].y -= 10;
                    break;
                case "down":
                    snake[0].y += 10;
                    break;
                default:
                    break;
            }
            cookieSpawned = false;
        }
    }else{
        cookieLoc.x =Math.round( Math.random()*canvasWidth);
        cookieLoc.x -= cookieLoc.x%10;
        cookieLoc.y = Math.round( Math.random()*canvasHeight);
        cookieLoc.y -= cookieLoc.y%10;
        cookieSpawned = true;
    }


}


function gameOver(){
    
    clearInterval(GameProcessor);
    alert("Game Over!!");
}

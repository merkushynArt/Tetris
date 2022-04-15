const main = document.querySelector('.main');

let playfield = [
   [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let gameSpeed = 1000;

function draw() {
   let mainInnerHTML = '';

   for(let y = 0; y < playfield.length; y++) {
      for(let x = 0; x < playfield[y].length; x++) {
         if(playfield[y][x] === 1) {
            mainInnerHTML += '<div class="cell movingCell"></div>';
         } else if(playfield[y][x] === 2) {
            mainInnerHTML += '<div class="cell fixedCell"></div>'
         } else {
            mainInnerHTML += '<div class="cell"></div>'
         }
      }
   }
   main.innerHTML = mainInnerHTML
}

function canTetroMoveDown() {
   for(let y = 0; y < playfield.length; y++) {
      for(let x = 0; x < playfield[y].length; x++){
         if(playfield[y][x] === 1) {
            if(y === playfield.length - 1 || playfield[y + 1][x] === 2) {
               return false;
            }
         }
      }
   }
   return true;
}

function moveTetroDown() {
   if(canTetroMoveDown()) {
      for(let y = playfield.length - 1; y >= 0; y--) {
         for(let x = 0; x < playfield[y].length; x++){
            if(playfield[y][x] === 1) {
               playfield[y + 1][x] = 1;
               playfield[y][x] = 0;
            }
         }   
      }
   } else {
      fixTetro();
   }
}

//move the figure to the left
function canTetroMoveLeft() {
   for(let y = 0; y < playfield.length; y++) {
      for(let x = 0; x < playfield[y].length; x++){
         if(playfield[y][x] === 1) {
            if(x === 0 || playfield[y][x - 1] === 2) {
               return false;
            }
         }
      }
   }
   return true;
}

function moveTetroLeft() {
   if(canTetroMoveLeft()) {
      for(let y = playfield.length - 1; y >= 0; y--) {
         for(let x = 0; x < playfield[y].length; x++){
            if(playfield[y][x] === 1) {
               playfield[y][x - 1] = 1;
               playfield[y][x] = 0;
            }
         }   
      }
   }
}

//move the figure to the right
function canTetroMoveRight() {
   for(let y = 0; y < playfield.length; y++) {
      for(let x = 0; x < playfield[y].length; x++){
         if(playfield[y][x] === 1) {
            if(x === 9 || playfield[y][x + 1] === 2) {
               return false;
            }
         }
      }
   }
   return true;
}

function moveTetroRight() {
   if(canTetroMoveRight()) {
      for(let y = playfield.length - 1; y >= 0; y--) {
         for(let x = 9; x >= 0; x--){
            if(playfield[y][x] === 1) {
               playfield[y][x + 1] = 1;
               playfield[y][x] = 0;
            }
         }   
      }
   }
}

function fixTetro() {
   for(let y = 0; y < playfield.length; y++) {
      for(let x = 0; x < playfield[y].length; x++){
         if(playfield[y][x] === 1) {
            playfield[y][x] = 2;
         }
      }
   }

   playfield[0] = [0, 0, 0, 0, 1, 1, 1, 0, 0, 0];
   playfield[1] = [0, 0, 0, 0, 0, 1, 0, 0, 0, 0];
   playfield[1] = [0, 0, 0, 0, 0, 1, 0, 0, 0, 0];
}

draw();

document.onkeydown = function(e) {
   
   if(e.keyCode === 37) {
      //move the figure to the left
      moveTetroLeft();

   } else if(e.keyCode === 39) {
      //move the figure to the right
      moveTetroRight();

   } else if(e.keyCode === 40) {
      //speed up the figure
      moveTetroDown();
   }
}

function startGame() {
   moveTetroDown();
   draw();
   setTimeout(startGame, gameSpeed)
}

setTimeout(startGame, gameSpeed)
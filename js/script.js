const main = document.querySelector('.main');

let playfield = [
   [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
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
            if(y === playfield.length - 1) {
               return false;
            }
         }
      }
   }
   return true;
}

function moveTetroDown() {
   if(canTetroMoveDown()) {
      for(let y = playfield.length - 1; y >= 0 ; y--) {
         for(let x = 0; x < playfield[y].length; x++){
            if(playfield[y][x] === 1) {
               playfield[y + 1][x] = 1;
               playfield[y][x] = 0;
            }
         }   
      }
   }
}

draw();

function startGame() {
   moveTetroDown();
   draw();
   setTimeout(startGame, gameSpeed)
}

setTimeout(startGame, gameSpeed)
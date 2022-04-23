const main = document.querySelector('.main');
const scoreElem = document.getElementById('score');
const levelElem = document.getElementById('level');
const nextTetroEl = document.getElementById('next-tetro');


let playfield = //Array(20).fill(Array(10).fill(0))
[
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
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let score = 0;
let currentLevel = 1;
let possibleLevels = {
   1: {
      scorePerLine: 10,
      speed: 400,
      nextLevelScore: 30
   },
   2: {
      scorePerLine: 15,
      speed: 300,
      nextLevelScore: 500
   },
   3: {
      scorePerLine: 20,
      speed: 200,
      nextLevelScore: 1000
   },
   4: {
      scorePerLine: 30,
      speed: 100,
      nextLevelScore: 2000
   },
   5: {
      scorePerLine: 50,
      speed: 50,
      nextLevelScore: Infinity
   },
}

let figures = {
   O: [
      [1, 1],
      [1, 1],
   ],
   I: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
   ],
   S: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
   ],
   Z: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
   ],
   L: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
   ],
   J: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
   ],
   T: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
   ],
}

let activeTetro = getNewTetro();
let nextTetro = getNewTetro();

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
   main.innerHTML = mainInnerHTML;
}

function drawNextTetro() {
   let nextTetroInnerHTML = '';
   for(let y = 0; y < nextTetro.shape.length; y++) {
      for(let x = 0; x < nextTetro.shape[y].length; x++) {
         if(nextTetro.shape[y][x]) {
            nextTetroInnerHTML += '<div class="cell movingCell"></div>';
         } else {
            nextTetroInnerHTML += '<div class="cell"></div>';
         }
      }
      nextTetroInnerHTML += '<br/>';
   }
   nextTetroEl.innerHTML = nextTetroInnerHTML;
}

function removePrevActiveTetro() {
   for(let y = 0; y < playfield.length; y++) {
      for(let x = 0; x < playfield[y].length; x++) {
         if(playfield[y][x] === 1) {
            playfield[y][x] = 0;
         }
      }
   }
}

function addActiveTetro() {
   removePrevActiveTetro();
   for(let y = 0; y < activeTetro.shape.length; y++) {
      for(let x = 0; x < activeTetro.shape[y].length; x++) {
         if(activeTetro.shape[y][x]) {
            playfield[activeTetro.y + y][activeTetro.x + x] = activeTetro.shape[y][x];
         }
      }
   }
}

function rotateTetro() {
   const prevTetroState = activeTetro.shape;
   activeTetro.shape = activeTetro.shape[0].map((val, index) => 
   activeTetro.shape.map((row) => row[index]).reverse()
   );

   if(hasCollisions()) {
      activeTetro.shape = prevTetroState;
   }
}

function hasCollisions() {
   for(let y = 0; y < activeTetro.shape.length; y++) {
      for(let x = 0; x < activeTetro.shape[y].length; x++) {
         if(activeTetro.shape[y][x] && (playfield[activeTetro.y + y] === undefined || playfield[activeTetro.y + y][activeTetro.x + x] === undefined || playfield[activeTetro.y + y][activeTetro.x + x] === 2)) {
            return true;
         }
      }
   }
   return false;
}

function removeFullLines() {
   let canRemoveLine = true;
   let filledLines = 0;
   for(let y = 0; y < playfield.length; y++) {
      for(let x = 0; x < playfield[y].length; x++) {
         if(playfield[y][x] !== 2) {
            canRemoveLine = false;
            break;
         }
      }
      if(canRemoveLine) {
         playfield.splice(y, 1);
         playfield.splice(0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
         filledLines += 1;
      }
      canRemoveLine = true;
   }

   switch(filledLines) {
      case 1:
         score += possibleLevels[currentLevel].scorePerLine;
         break;
      case 2:
         score += possibleLevels[currentLevel].scorePerLine * 3;
         break;
      case 3:
         score += 10 * 6;
         break;
      case 4:
         score += 10 * 12;
         break;
   }
   scoreElem.innerHTML = score;
   if(score >= possibleLevels[currentLevel].nextLevelScore) {
      currentLevel++;
      levelElem.innerHTML = currentLevel;
   }
}

function getNewTetro() {
   const posibleFigures = 'IOLJTSZ';
   const rand = Math.floor(Math.random() * 7);
   const newTetro = figures[posibleFigures[rand]];

   return {
      x: Math.floor((10 - newTetro[0].length) / 2),
      y: 0,
      shape: newTetro,
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
   removeFullLines();
}

function moveTetroDown() {
   activeTetro.y += 1;
   if(hasCollisions()) {
      activeTetro.y -= 1;
      fixTetro();
      removeFullLines();
      activeTetro = nextTetro;
      nextTetro = getNewTetro();
   }
}

function dropTetro() {
   for(let y = activeTetro.y; y < playfield.length; y++) {
      activeTetro.y += 1;
      if(hasCollisions()) {
         activeTetro.y -= 1;
         break;
      }
   }
}

document.onkeydown = function(e) {
   
   if(e.keyCode === 37) {
      //move the figure to the left
      activeTetro.x -= 1;
      if(hasCollisions()) {
         activeTetro.x += 1;
      }
   } else if(e.keyCode === 39) {
      //move the figure to the right
      activeTetro.x += 1;
      if(hasCollisions()) {
         activeTetro.x -= 1;
      }
   } else if(e.keyCode === 40) {
      //speed up the figure
      moveTetroDown();
   } else if(e.keyCode === 38) {
      rotateTetro();
   } else if(e.keyCode === 32) {
      dropTetro();
   }
   addActiveTetro();
   draw();
   drawNextTetro();
}


scoreElem.innerHTML = score;
levelElem.innerHTML = currentLevel;

addActiveTetro();

draw();

drawNextTetro();

function startGame() {
   moveTetroDown();
   addActiveTetro();
   draw();
   drawNextTetro();
   setTimeout(startGame, possibleLevels[currentLevel].speed);
}

setTimeout(startGame, possibleLevels[currentLevel].speed );
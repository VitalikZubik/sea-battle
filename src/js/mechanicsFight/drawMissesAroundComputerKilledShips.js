import store from '../store/store';

const {arrayComputerCells, mechanicsFight} = store.getGameState();

const computerCellsMap = store.getCopyEmptyCellsMap();

const computerMapDivs = {
   1: arrayComputerCells.slice(0, 6),
   2: arrayComputerCells.slice(6, 12),
   3: arrayComputerCells.slice(12, 18),
   4: arrayComputerCells.slice(18, 24),
   5: arrayComputerCells.slice(24, 30),
   6: arrayComputerCells.slice(30, 36)
};

// removeShipHitClass - функция удаления класса у убитых кораблей компьютера, после рисования миссов вокруг корабля.
function removeShipHitClass(typeShip) {
   arrayComputerCells.forEach(ship => {
      if(typeShip === 1) {
         if (ship.classList.contains('hitOneDeck')) {
            ship.classList.remove('hitOneDeck');
         } 
      } else if (typeShip === 2) {
         if (ship.classList.contains('hitTwoDeck')) {
            ship.classList.remove('hitTwoDeck');
         }
      } else if (typeShip === 3) {
         if (ship.classList.contains('hitThreeDeck')) {
            ship.classList.remove('hitThreeDeck');
         } 
      }      
   });
}

// drawMissesAroundKilledSingleDeckComputerShips - функция для отрисовки промохов вокруг убитого однопалубного корабля компьютера.
export function drawMissesAroundKilledSingleDeckComputerShips() {
   const killedShip = arrayComputerCells.find(element => element.classList.contains('hitOneDeck')),
      coordinates = killedShip.id.split('-'),
      y = Number(coordinates[1]),
      rawX = Number(coordinates[2]),
      x = rawX - 1;

   if (
      mechanicsFight.computerShips.oneDeck.length === 2 ||
      mechanicsFight.computerShips.oneDeck.length === 1 ||
      mechanicsFight.computerShips.oneDeck.length === 0
   ) {
      if (y > 1 && y < 6 && x > 0 && x < 5) {
         computerCellsMap[y - 1][x - 1] = 'missed';
         computerCellsMap[y - 1][x] = 'missed';
         computerCellsMap[y - 1][x + 1] = 'missed';
         computerCellsMap[y][x + 1] = 'missed';
         computerCellsMap[y + 1][x + 1] = 'missed';
         computerCellsMap[y + 1][x] = 'missed';
         computerCellsMap[y + 1][x - 1] = 'missed';
         computerCellsMap[y][x - 1] = 'missed';

         computerMapDivs[y - 1][x - 1].classList.add('miss');
         computerMapDivs[y - 1][x].classList.add('miss');
         computerMapDivs[y - 1][x + 1].classList.add('miss');
         computerMapDivs[y][x + 1].classList.add('miss');
         computerMapDivs[y + 1][x + 1].classList.add('miss');
         computerMapDivs[y + 1][x].classList.add('miss');
         computerMapDivs[y + 1][x - 1].classList.add('miss');
         computerMapDivs[y][x - 1].classList.add('miss');

         computerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

         removeShipHitClass(1);

      } else if (y === 1 && x === 0) {
         computerCellsMap[y][x + 1] = 'missed';
         computerCellsMap[y + 1][x + 1] = 'missed';
         computerCellsMap[y + 1][x] = 'missed';

         computerMapDivs[y][x + 1].classList.add('miss');
         computerMapDivs[y + 1][x + 1].classList.add('miss');
         computerMapDivs[y + 1][x].classList.add('miss');

         computerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;

         removeShipHitClass(1);

      } else if (y === 1 && x > 0 && x < 5) {
         computerCellsMap[y][x + 1] = 'missed';
         computerCellsMap[y + 1][x + 1] = 'missed';
         computerCellsMap[y + 1][x] = 'missed';
         computerCellsMap[y + 1][x - 1] = 'missed';
         computerCellsMap[y][x - 1] = 'missed';

         computerMapDivs[y][x + 1].classList.add('miss');
         computerMapDivs[y + 1][x + 1].classList.add('miss');
         computerMapDivs[y + 1][x].classList.add('miss');
         computerMapDivs[y + 1][x - 1].classList.add('miss');
         computerMapDivs[y][x - 1].classList.add('miss');

         computerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

         removeShipHitClass(1);

      } else if (y === 1 && x === 5) {
         computerCellsMap[y + 1][x] = 'missed';
         computerCellsMap[y + 1][x - 1] = 'missed';
         computerCellsMap[y][x - 1] = 'missed';

         computerMapDivs[y + 1][x].classList.add('miss');
         computerMapDivs[y + 1][x - 1].classList.add('miss');
         computerMapDivs[y][x - 1].classList.add('miss');

         computerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

         removeShipHitClass(1);

      } else if (y > 1 && y < 6 && x === 5) {
         computerCellsMap[y + 1][x] = 'missed';
         computerCellsMap[y + 1][x - 1] = 'missed';
         computerCellsMap[y][x - 1] = 'missed';
         computerCellsMap[y - 1][x - 1] = 'missed';
         computerCellsMap[y - 1][x] = 'missed';

         computerMapDivs[y + 1][x].classList.add('miss');
         computerMapDivs[y + 1][x - 1].classList.add('miss');
         computerMapDivs[y][x - 1].classList.add('miss');
         computerMapDivs[y - 1][x - 1].classList.add('miss');
         computerMapDivs[y - 1][x].classList.add('miss');

         computerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;

         removeShipHitClass(1);

      } else if (y === 6 && x === 5) {
         computerCellsMap[y][x - 1] = 'missed';
         computerCellsMap[y - 1][x - 1] = 'missed';
         computerCellsMap[y - 1][x] = 'missed';

         computerMapDivs[y][x - 1].classList.add('miss');
         computerMapDivs[y - 1][x - 1].classList.add('miss');
         computerMapDivs[y - 1][x].classList.add('miss');

         computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;

         removeShipHitClass(1);

      } else if (y === 6 && x > 0 && x < 5) {
         computerCellsMap[y][x - 1] = 'missed';
         computerCellsMap[y - 1][x - 1] = 'missed';
         computerCellsMap[y - 1][x] = 'missed';
         computerCellsMap[y - 1][x + 1] = 'missed';
         computerCellsMap[y][x + 1] = 'missed';

         computerMapDivs[y][x - 1].classList.add('miss');
         computerMapDivs[y - 1][x - 1].classList.add('miss');
         computerMapDivs[y - 1][x].classList.add('miss');
         computerMapDivs[y - 1][x + 1].classList.add('miss');
         computerMapDivs[y][x + 1].classList.add('miss');

         computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;

         removeShipHitClass(1);

      } else if (y === 6 && x === 0) {
         computerCellsMap[y - 1][x] = 'missed';
         computerCellsMap[y - 1][x + 1] = 'missed';
         computerCellsMap[y][x + 1] = 'missed';

         computerMapDivs[y - 1][x].classList.add('miss');
         computerMapDivs[y - 1][x + 1].classList.add('miss');
         computerMapDivs[y][x + 1].classList.add('miss');

         computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;

         removeShipHitClass(1);

      } else if (y > 1 && y < 6 && x === 0) {
         computerCellsMap[y - 1][x] = 'missed';
         computerCellsMap[y - 1][x + 1] = 'missed';
         computerCellsMap[y][x + 1] = 'missed';
         computerCellsMap[y + 1][x + 1] = 'missed';
         computerCellsMap[y + 1][x] = 'missed';

         computerMapDivs[y - 1][x].classList.add('miss');
         computerMapDivs[y - 1][x + 1].classList.add('miss');
         computerMapDivs[y][x + 1].classList.add('miss');
         computerMapDivs[y + 1][x + 1].classList.add('miss');
         computerMapDivs[y + 1][x].classList.add('miss');

         computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
         computerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;

         removeShipHitClass(1);
      }
   }
}

// drawMissesAroundKilledDoubleDeckComputerShips - функция для отрисовки промохов вокруг убитого двухпалубного корабля компьютера.
export function drawMissesAroundKilledDoubleDeckComputerShips() {
   const killedShip = arrayComputerCells.find(element => element.classList.contains('hitTwoDeck')),
      coordinates = killedShip.id.split('-'),
      y = Number(coordinates[1]),
      rawX = Number(coordinates[2]),
      x = rawX - 1;



   if (mechanicsFight.computerShips.twoDeck.length === 2 || mechanicsFight.computerShips.twoDeck.length === 0) {
      if (!killedShip.classList.contains('vertical')) {
         if (y > 1 && y < 6 && x > 0 && x < 4) {
            computerCellsMap[y - 1][x - 1] = 'missed';
            computerCellsMap[y - 1][x] = 'missed';
            computerCellsMap[y - 1][x + 1] = 'missed';
            computerCellsMap[y - 1][x + 2] = 'missed';
            computerCellsMap[y][x + 2] = 'missed';
            computerCellsMap[y + 1][x + 2] = 'missed';
            computerCellsMap[y + 1][x + 1] = 'missed';
            computerCellsMap[y + 1][x] = 'missed';
            computerCellsMap[y + 1][x - 1] = 'missed';
            computerCellsMap[y][x - 1] = 'missed';

            computerMapDivs[y - 1][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x].classList.add('miss');
            computerMapDivs[y - 1][x + 1].classList.add('miss');
            computerMapDivs[y - 1][x + 2].classList.add('miss');
            computerMapDivs[y][x + 2].classList.add('miss');
            computerMapDivs[y + 1][x + 2].classList.add('miss');
            computerMapDivs[y + 1][x + 1].classList.add('miss');
            computerMapDivs[y + 1][x].classList.add('miss');
            computerMapDivs[y + 1][x - 1].classList.add('miss');
            computerMapDivs[y][x - 1].classList.add('miss');

            computerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 2].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x + 2].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 2].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(2);

         } else if (y === 1 && x === 0) {
            computerCellsMap[y][x + 2] = 'missed';
            computerCellsMap[y + 1][x + 2] = 'missed';
            computerCellsMap[y + 1][x + 1] = 'missed';
            computerCellsMap[y + 1][x] = 'missed';

            computerMapDivs[y][x + 2].classList.add('miss');
            computerMapDivs[y + 1][x + 2].classList.add('miss');
            computerMapDivs[y + 1][x + 1].classList.add('miss');
            computerMapDivs[y + 1][x].classList.add('miss');

            computerMapDivs[y][x + 2].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 2].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(2);

         } else if (y === 1 && x > 0 && x < 4) {
            computerCellsMap[y][x + 2] = 'missed';
            computerCellsMap[y + 1][x + 2] = 'missed';
            computerCellsMap[y + 1][x + 1] = 'missed';
            computerCellsMap[y + 1][x] = 'missed';
            computerCellsMap[y + 1][x - 1] = 'missed';
            computerCellsMap[y][x - 1] = 'missed';

            computerMapDivs[y][x + 2].classList.add('miss');
            computerMapDivs[y + 1][x + 2].classList.add('miss');
            computerMapDivs[y + 1][x + 1].classList.add('miss');
            computerMapDivs[y + 1][x].classList.add('miss');
            computerMapDivs[y + 1][x - 1].classList.add('miss');
            computerMapDivs[y][x - 1].classList.add('miss');

            computerMapDivs[y][x + 2].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 2].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(2);

         } else if (y === 1 && x === 4) {
            computerCellsMap[y + 1][x + 1] = 'missed';
            computerCellsMap[y + 1][x] = 'missed';
            computerCellsMap[y + 1][x - 1] = 'missed';
            computerCellsMap[y][x - 1] = 'missed';

            computerMapDivs[y + 1][x + 1].classList.add('miss');
            computerMapDivs[y + 1][x].classList.add('miss');
            computerMapDivs[y + 1][x - 1].classList.add('miss');
            computerMapDivs[y][x - 1].classList.add('miss');

            computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(2);

         } else if (y > 1 && y < 6 && x === 0) {
            computerCellsMap[y - 1][x] = 'missed';
            computerCellsMap[y - 1][x + 1] = 'missed';
            computerCellsMap[y - 1][x + 2] = 'missed';
            computerCellsMap[y][x + 2] = 'missed';
            computerCellsMap[y + 1][x + 2] = 'missed';
            computerCellsMap[y + 1][x + 1] = 'missed';
            computerCellsMap[y + 1][x] = 'missed';

            computerMapDivs[y - 1][x].classList.add('miss');
            computerMapDivs[y - 1][x + 1].classList.add('miss');
            computerMapDivs[y - 1][x + 2].classList.add('miss');
            computerMapDivs[y][x + 2].classList.add('miss');
            computerMapDivs[y + 1][x + 2].classList.add('miss');
            computerMapDivs[y + 1][x + 1].classList.add('miss');
            computerMapDivs[y + 1][x].classList.add('miss');

            computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 2].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x + 2].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 2].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(2);

         } else if (y > 1 && y < 6 && x === 4) {
            computerCellsMap[y + 1][x + 1] = 'missed';
            computerCellsMap[y + 1][x] = 'missed';
            computerCellsMap[y + 1][x - 1] = 'missed';
            computerCellsMap[y][x - 1] = 'missed';
            computerCellsMap[y - 1][x - 1] = 'missed';
            computerCellsMap[y - 1][x] = 'missed';
            computerCellsMap[y - 1][x + 1] = 'missed';

            computerMapDivs[y + 1][x + 1].classList.add('miss');
            computerMapDivs[y + 1][x].classList.add('miss');
            computerMapDivs[y + 1][x - 1].classList.add('miss');
            computerMapDivs[y][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x].classList.add('miss');
            computerMapDivs[y - 1][x + 1].classList.add('miss');

            computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(2);

         } else if (y === 6 && x === 4) {
            computerCellsMap[y][x - 1] = 'missed';
            computerCellsMap[y - 1][x - 1] = 'missed';
            computerCellsMap[y - 1][x] = 'missed';
            computerCellsMap[y - 1][x + 1] = 'missed';

            computerMapDivs[y][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x].classList.add('miss');
            computerMapDivs[y - 1][x + 1].classList.add('miss');

            computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(2);

         } else if (y === 6 && x > 0 && x < 4) {
            computerCellsMap[y][x - 1] = 'missed';
            computerCellsMap[y - 1][x - 1] = 'missed';
            computerCellsMap[y - 1][x] = 'missed';
            computerCellsMap[y - 1][x + 1] = 'missed';
            computerCellsMap[y - 1][x + 2] = 'missed';
            computerCellsMap[y][x + 2] = 'missed';

            computerMapDivs[y][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x].classList.add('miss');
            computerMapDivs[y - 1][x + 1].classList.add('miss');
            computerMapDivs[y - 1][x + 2].classList.add('miss');
            computerMapDivs[y][x + 2].classList.add('miss');

            computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 2].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x + 2].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(2);

         } else if (y === 6 && x === 0) {
            computerCellsMap[y - 1][x] = 'missed';
            computerCellsMap[y - 1][x + 1] = 'missed';
            computerCellsMap[y - 1][x + 2] = 'missed';
            computerCellsMap[y][x + 2] = 'missed';

            computerMapDivs[y - 1][x].classList.add('miss');
            computerMapDivs[y - 1][x + 1].classList.add('miss');
            computerMapDivs[y - 1][x + 2].classList.add('miss');
            computerMapDivs[y][x + 2].classList.add('miss');

            computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 2].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x + 2].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(2);
         }

      } else if (killedShip.classList.contains('vertical')) {
         if (y > 1 && y < 5 && x > 0 && x < 5) {
            computerCellsMap[y - 1][x - 1] = 'missed';
            computerCellsMap[y - 1][x] = 'missed';
            computerCellsMap[y - 1][x + 1] = 'missed';
            computerCellsMap[y][x + 1] = 'missed';
            computerCellsMap[y + 1][x + 1] = 'missed';
            computerCellsMap[y + 2][x + 1] = 'missed';
            computerCellsMap[y + 2][x] = 'missed';
            computerCellsMap[y + 2][x - 1] = 'missed';
            computerCellsMap[y + 1][x - 1] = 'missed';
            computerCellsMap[y][x - 1] = 'missed';

            computerMapDivs[y - 1][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x].classList.add('miss');
            computerMapDivs[y - 1][x + 1].classList.add('miss');
            computerMapDivs[y][x + 1].classList.add('miss');
            computerMapDivs[y + 1][x + 1].classList.add('miss');
            computerMapDivs[y + 2][x + 1].classList.add('miss');
            computerMapDivs[y + 2][x].classList.add('miss');
            computerMapDivs[y + 2][x - 1].classList.add('miss');
            computerMapDivs[y + 1][x - 1].classList.add('miss');
            computerMapDivs[y][x - 1].classList.add('miss');

            computerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 2][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 2][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 2][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(2);

         } else if (y === 1 && x === 0) {
            computerCellsMap[y][x + 1] = 'missed';
            computerCellsMap[y + 1][x + 1] = 'missed';
            computerCellsMap[y + 2][x + 1] = 'missed';
            computerCellsMap[y + 2][x] = 'missed';

            computerMapDivs[y][x + 1].classList.add('miss');
            computerMapDivs[y + 1][x + 1].classList.add('miss');
            computerMapDivs[y + 2][x + 1].classList.add('miss');
            computerMapDivs[y + 2][x].classList.add('miss');

            computerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 2][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 2][x].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(2);

         } else if (y === 1 && x > 0 && x < 5) {
            computerCellsMap[y][x + 1] = 'missed';
            computerCellsMap[y + 1][x + 1] = 'missed';
            computerCellsMap[y + 2][x + 1] = 'missed';
            computerCellsMap[y + 2][x] = 'missed';
            computerCellsMap[y + 2][x - 1] = 'missed';
            computerCellsMap[y + 1][x - 1] = 'missed';
            computerCellsMap[y][x - 1] = 'missed';

            computerMapDivs[y][x + 1].classList.add('miss');
            computerMapDivs[y + 1][x + 1].classList.add('miss');
            computerMapDivs[y + 2][x + 1].classList.add('miss');
            computerMapDivs[y + 2][x].classList.add('miss');
            computerMapDivs[y + 2][x - 1].classList.add('miss');
            computerMapDivs[y + 1][x - 1].classList.add('miss');
            computerMapDivs[y][x - 1].classList.add('miss');

            computerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 2][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 2][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 2][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(2);

         } else if (y === 1 && x === 5) {
            computerCellsMap[y][x - 1] = 'missed';
            computerCellsMap[y + 1][x - 1] = 'missed';
            computerCellsMap[y + 2][x - 1] = 'missed';
            computerCellsMap[y + 2][x] = 'missed';

            computerMapDivs[y][x - 1].classList.add('miss');
            computerMapDivs[y + 1][x - 1].classList.add('miss');
            computerMapDivs[y + 2][x - 1].classList.add('miss');
            computerMapDivs[y + 2][x].classList.add('miss');

            computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 2][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 2][x].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(2);

         } else if (y > 1 && y < 5 && x === 5) {
            computerCellsMap[y + 2][x] = 'missed';
            computerCellsMap[y + 2][x - 1] = 'missed';
            computerCellsMap[y + 1][x - 1] = 'missed';
            computerCellsMap[y][x - 1] = 'missed';
            computerCellsMap[y - 1][x - 1] = 'missed';
            computerCellsMap[y - 1][x] = 'missed';

            computerMapDivs[y + 2][x].classList.add('miss');
            computerMapDivs[y + 2][x - 1].classList.add('miss');
            computerMapDivs[y + 1][x - 1].classList.add('miss');
            computerMapDivs[y][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x].classList.add('miss');

            computerMapDivs[y + 2][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 2][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(2);

         } else if (y === 5 && x === 5) {
            computerCellsMap[y + 1][x - 1] = 'missed';
            computerCellsMap[y][x - 1] = 'missed';
            computerCellsMap[y - 1][x - 1] = 'missed';
            computerCellsMap[y - 1][x] = 'missed';

            computerMapDivs[y + 1][x - 1].classList.add('miss');
            computerMapDivs[y][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x].classList.add('miss');

            computerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(2);

         } else if (y === 5 && x > 0 && x < 5) {
            computerCellsMap[y + 1][x - 1] = 'missed';
            computerCellsMap[y][x - 1] = 'missed';
            computerCellsMap[y - 1][x - 1] = 'missed';
            computerCellsMap[y - 1][x] = 'missed';
            computerCellsMap[y - 1][x + 1] = 'missed';
            computerCellsMap[y][x + 1] = 'missed';
            computerCellsMap[y + 1][x + 1] = 'missed';

            computerMapDivs[y + 1][x - 1].classList.add('miss');
            computerMapDivs[y][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x].classList.add('miss');
            computerMapDivs[y - 1][x + 1].classList.add('miss');
            computerMapDivs[y][x + 1].classList.add('miss');
            computerMapDivs[y + 1][x + 1].classList.add('miss');

            computerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(2);

         } else if (y === 5 && x === 0) {
            computerCellsMap[y - 1][x] = 'missed';
            computerCellsMap[y - 1][x + 1] = 'missed';
            computerCellsMap[y][x + 1] = 'missed';
            computerCellsMap[y + 1][x + 1] = 'missed';

            computerMapDivs[y - 1][x].classList.add('miss');
            computerMapDivs[y - 1][x + 1].classList.add('miss');
            computerMapDivs[y][x + 1].classList.add('miss');
            computerMapDivs[y + 1][x + 1].classList.add('miss');

            computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(2);

         } else if (y > 1 && y < 5 && x === 0) {
            computerCellsMap[y - 1][x] = 'missed';
            computerCellsMap[y - 1][x + 1] = 'missed';
            computerCellsMap[y][x + 1] = 'missed';
            computerCellsMap[y + 1][x + 1] = 'missed';
            computerCellsMap[y + 2][x + 1] = 'missed';
            computerCellsMap[y + 2][x] = 'missed';

            computerMapDivs[y - 1][x].classList.add('miss');
            computerMapDivs[y - 1][x + 1].classList.add('miss');
            computerMapDivs[y][x + 1].classList.add('miss');
            computerMapDivs[y + 1][x + 1].classList.add('miss');
            computerMapDivs[y + 2][x + 1].classList.add('miss');
            computerMapDivs[y + 2][x].classList.add('miss');

            computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 2][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 2][x].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(2);
         }
      }
   }
}

// drawMissesAroundKilledThreeDeckComputerShip - функция для отрисовки промохов вокруг убитого трехпалубного корабля компьютера. 
export function drawMissesAroundKilledThreeDeckComputerShip() {
   const killedShip = arrayComputerCells.find(element => element.classList.contains('hitThreeDeck')),
      coordinates = killedShip.id.split('-'),
      y = Number(coordinates[1]),
      rawX = Number(coordinates[2]),
      x = rawX - 1;

   if (mechanicsFight.computerShips.threeDeck.length === 0) {
      if (!killedShip.classList.contains('vertical')) {
         if (y > 1 && y < 6 && x > 0 && x < 3) {
            computerCellsMap[y - 1][x - 1] = 'missed';
            computerCellsMap[y - 1][x] = 'missed';
            computerCellsMap[y - 1][x + 1] = 'missed';
            computerCellsMap[y - 1][x + 2] = 'missed';
            computerCellsMap[y - 1][x + 3] = 'missed';
            computerCellsMap[y][x + 3] = 'missed';
            computerCellsMap[y + 1][x + 3] = 'missed';
            computerCellsMap[y + 1][x + 2] = 'missed';
            computerCellsMap[y + 1][x + 1] = 'missed';
            computerCellsMap[y + 1][x] = 'missed';
            computerCellsMap[y + 1][x - 1] = 'missed';
            computerCellsMap[y][x - 1] = 'missed';

            computerMapDivs[y - 1][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x].classList.add('miss');
            computerMapDivs[y - 1][x + 1].classList.add('miss');
            computerMapDivs[y - 1][x + 2].classList.add('miss');
            computerMapDivs[y - 1][x + 3].classList.add('miss');
            computerMapDivs[y][x + 3].classList.add('miss');
            computerMapDivs[y + 1][x + 3].classList.add('miss');
            computerMapDivs[y + 1][x + 2].classList.add('miss');
            computerMapDivs[y + 1][x + 1].classList.add('miss');
            computerMapDivs[y + 1][x].classList.add('miss');
            computerMapDivs[y + 1][x - 1].classList.add('miss');
            computerMapDivs[y][x - 1].classList.add('miss');

            computerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 2].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 3].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x + 3].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 3].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 2].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(3);

         } else if (y === 1 && x === 0) {
            computerCellsMap[y][x + 3] = 'missed';
            computerCellsMap[y + 1][x + 3] = 'missed';
            computerCellsMap[y + 1][x + 2] = 'missed';
            computerCellsMap[y + 1][x + 1] = 'missed';
            computerCellsMap[y + 1][x] = 'missed';

            computerMapDivs[y][x + 3].classList.add('miss');
            computerMapDivs[y + 1][x + 3].classList.add('miss');
            computerMapDivs[y + 1][x + 2].classList.add('miss');
            computerMapDivs[y + 1][x + 1].classList.add('miss');
            computerMapDivs[y + 1][x].classList.add('miss');

            computerMapDivs[y][x + 3].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 3].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 2].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(3);

         } else if (y === 1 && x > 0 && x < 3) {
            computerCellsMap[y][x + 3] = 'missed';
            computerCellsMap[y + 1][x + 3] = 'missed';
            computerCellsMap[y + 1][x + 2] = 'missed';
            computerCellsMap[y + 1][x + 1] = 'missed';
            computerCellsMap[y + 1][x] = 'missed';
            computerCellsMap[y + 1][x - 1] = 'missed';
            computerCellsMap[y][x - 1] = 'missed';

            computerMapDivs[y][x + 3].classList.add('miss');
            computerMapDivs[y + 1][x + 3].classList.add('miss');
            computerMapDivs[y + 1][x + 2].classList.add('miss');
            computerMapDivs[y + 1][x + 1].classList.add('miss');
            computerMapDivs[y + 1][x].classList.add('miss');
            computerMapDivs[y + 1][x - 1].classList.add('miss');
            computerMapDivs[y][x - 1].classList.add('miss');

            computerMapDivs[y][x + 3].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 3].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 2].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(3);

         } else if (y > 1 && y < 6 && x === 3) {
            computerCellsMap[y + 1][x + 2] = 'missed';
            computerCellsMap[y + 1][x + 1] = 'missed';
            computerCellsMap[y + 1][x] = 'missed';
            computerCellsMap[y + 1][x - 1] = 'missed';
            computerCellsMap[y][x - 1] = 'missed';
            computerCellsMap[y - 1][x - 1] = 'missed';
            computerCellsMap[y - 1][x] = 'missed';
            computerCellsMap[y - 1][x + 1] = 'missed';
            computerCellsMap[y - 1][x + 2] = 'missed';

            computerMapDivs[y + 1][x + 2].classList.add('miss');
            computerMapDivs[y + 1][x + 1].classList.add('miss');
            computerMapDivs[y + 1][x].classList.add('miss');
            computerMapDivs[y + 1][x - 1].classList.add('miss');
            computerMapDivs[y][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x].classList.add('miss');
            computerMapDivs[y - 1][x + 1].classList.add('miss');
            computerMapDivs[y - 1][x + 2].classList.add('miss');

            computerMapDivs[y + 1][x + 2].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 2].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(3);

         } else if (y === 1 && x === 3) {
            computerCellsMap[y + 1][x + 2] = 'missed';
            computerCellsMap[y + 1][x + 1] = 'missed';
            computerCellsMap[y + 1][x] = 'missed';
            computerCellsMap[y + 1][x - 1] = 'missed';
            computerCellsMap[y][x - 1] = 'missed';

            computerMapDivs[y + 1][x + 2].classList.add('miss');
            computerMapDivs[y + 1][x + 1].classList.add('miss');
            computerMapDivs[y + 1][x].classList.add('miss');
            computerMapDivs[y + 1][x - 1].classList.add('miss');
            computerMapDivs[y][x - 1].classList.add('miss');

            computerMapDivs[y + 1][x + 2].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(3);

         } else if (y === 6 && x === 3) {
            computerCellsMap[y][x - 1] = 'missed';
            computerCellsMap[y - 1][x - 1] = 'missed';
            computerCellsMap[y - 1][x] = 'missed';
            computerCellsMap[y - 1][x + 1] = 'missed';
            computerCellsMap[y - 1][x + 2] = 'missed';

            computerMapDivs[y][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x].classList.add('miss');
            computerMapDivs[y - 1][x + 1].classList.add('miss');
            computerMapDivs[y - 1][x + 2].classList.add('miss');

            computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 2].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(3);

         } else if (y === 6 && x > 0 && x < 3) {
            computerCellsMap[y][x - 1] = 'missed';
            computerCellsMap[y - 1][x - 1] = 'missed';
            computerCellsMap[y - 1][x] = 'missed';
            computerCellsMap[y - 1][x + 1] = 'missed';
            computerCellsMap[y - 1][x + 2] = 'missed';
            computerCellsMap[y - 1][x + 3] = 'missed';
            computerCellsMap[y][x + 3] = 'missed';

            computerMapDivs[y][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x].classList.add('miss');
            computerMapDivs[y - 1][x + 1].classList.add('miss');
            computerMapDivs[y - 1][x + 2].classList.add('miss');
            computerMapDivs[y - 1][x + 3].classList.add('miss');
            computerMapDivs[y][x + 3].classList.add('miss');

            computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 2].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 3].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x + 3].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(3);

         } else if (y === 6 && x === 0) {
            computerCellsMap[y - 1][x] = 'missed';
            computerCellsMap[y - 1][x + 1] = 'missed';
            computerCellsMap[y - 1][x + 2] = 'missed';
            computerCellsMap[y - 1][x + 3] = 'missed';
            computerCellsMap[y][x + 3] = 'missed';

            computerMapDivs[y - 1][x].classList.add('miss');
            computerMapDivs[y - 1][x + 1].classList.add('miss');
            computerMapDivs[y - 1][x + 2].classList.add('miss');
            computerMapDivs[y - 1][x + 3].classList.add('miss');
            computerMapDivs[y][x + 3].classList.add('miss');

            computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 2].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 3].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x + 3].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(3);

         } else if (y > 0 && y < 6 && x === 0) {
            computerCellsMap[y + 1][x] = 'missed';
            computerCellsMap[y + 1][x + 1] = 'missed';
            computerCellsMap[y + 1][x + 2] = 'missed';
            computerCellsMap[y + 1][x + 3] = 'missed';
            computerCellsMap[y][x + 3] = 'missed';
            computerCellsMap[y - 1][x + 3] = 'missed';
            computerCellsMap[y - 1][x + 2] = 'missed';
            computerCellsMap[y - 1][x + 1] = 'missed';
            computerCellsMap[y - 1][x] = 'missed';

            computerMapDivs[y + 1][x].classList.add('miss');
            computerMapDivs[y + 1][x + 1].classList.add('miss');
            computerMapDivs[y + 1][x + 2].classList.add('miss');
            computerMapDivs[y + 1][x + 3].classList.add('miss');
            computerMapDivs[y][x + 3].classList.add('miss');
            computerMapDivs[y - 1][x + 3].classList.add('miss');
            computerMapDivs[y - 1][x + 2].classList.add('miss');
            computerMapDivs[y - 1][x + 1].classList.add('miss');
            computerMapDivs[y - 1][x].classList.add('miss');

            computerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 2].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 3].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x + 3].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 3].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 2].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(3);
         }
      } else if (killedShip.classList.contains('vertical')) {
         if (y > 1 && y < 4 && x > 0 && x < 5) {
            computerCellsMap[y - 1][x - 1] = 'missed';
            computerCellsMap[y - 1][x] = 'missed';
            computerCellsMap[y - 1][x + 1] = 'missed';
            computerCellsMap[y][x + 1] = 'missed';
            computerCellsMap[y + 1][x + 1] = 'missed';
            computerCellsMap[y + 2][x + 1] = 'missed';
            computerCellsMap[y + 3][x + 1] = 'missed';
            computerCellsMap[y + 3][x] = 'missed';
            computerCellsMap[y + 3][x - 1] = 'missed';
            computerCellsMap[y + 2][x - 1] = 'missed';
            computerCellsMap[y + 1][x - 1] = 'missed';
            computerCellsMap[y][x - 1] = 'missed';

            computerMapDivs[y - 1][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x].classList.add('miss');
            computerMapDivs[y - 1][x + 1].classList.add('miss');
            computerMapDivs[y][x + 1].classList.add('miss');
            computerMapDivs[y + 1][x + 1].classList.add('miss');
            computerMapDivs[y + 2][x + 1].classList.add('miss');
            computerMapDivs[y + 3][x + 1].classList.add('miss');
            computerMapDivs[y + 3][x].classList.add('miss');
            computerMapDivs[y + 3][x - 1].classList.add('miss');
            computerMapDivs[y + 2][x - 1].classList.add('miss');
            computerMapDivs[y + 1][x - 1].classList.add('miss');
            computerMapDivs[y][x - 1].classList.add('miss');

            computerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 2][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 3][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 3][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 3][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 2][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(3);

         } else if (y === 1 && x === 0) {
            computerCellsMap[y][x + 1] = 'missed';
            computerCellsMap[y + 1][x + 1] = 'missed';
            computerCellsMap[y + 2][x + 1] = 'missed';
            computerCellsMap[y + 3][x + 1] = 'missed';
            computerCellsMap[y + 3][x] = 'missed';

            computerMapDivs[y][x + 1].classList.add('miss');
            computerMapDivs[y + 1][x + 1].classList.add('miss');
            computerMapDivs[y + 2][x + 1].classList.add('miss');
            computerMapDivs[y + 3][x + 1].classList.add('miss');
            computerMapDivs[y + 3][x].classList.add('miss');

            computerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 2][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 3][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 3][x].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(3);

         } else if (y === 1 && x > 0 && x < 5) {
            computerCellsMap[y][x + 1] = 'missed';
            computerCellsMap[y + 1][x + 1] = 'missed';
            computerCellsMap[y + 2][x + 1] = 'missed';
            computerCellsMap[y + 3][x + 1] = 'missed';
            computerCellsMap[y + 3][x] = 'missed';
            computerCellsMap[y + 3][x - 1] = 'missed';
            computerCellsMap[y + 2][x - 1] = 'missed';
            computerCellsMap[y + 1][x - 1] = 'missed';
            computerCellsMap[y][x - 1] = 'missed';

            computerMapDivs[y][x + 1].classList.add('miss');
            computerMapDivs[y + 1][x + 1].classList.add('miss');
            computerMapDivs[y + 2][x + 1].classList.add('miss');
            computerMapDivs[y + 3][x + 1].classList.add('miss');
            computerMapDivs[y + 3][x].classList.add('miss');
            computerMapDivs[y + 3][x - 1].classList.add('miss');
            computerMapDivs[y + 2][x - 1].classList.add('miss');
            computerMapDivs[y + 1][x - 1].classList.add('miss');
            computerMapDivs[y][x - 1].classList.add('miss');

            computerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 2][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 3][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 3][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 3][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 2][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(3);

         } else if (y === 1 && x === 5) {
            computerCellsMap[y + 3][x] = 'missed';
            computerCellsMap[y + 3][x - 1] = 'missed';
            computerCellsMap[y + 2][x - 1] = 'missed';
            computerCellsMap[y + 1][x - 1] = 'missed';
            computerCellsMap[y][x - 1] = 'missed';

            computerMapDivs[y + 3][x].classList.add('miss');
            computerMapDivs[y + 3][x - 1].classList.add('miss');
            computerMapDivs[y + 2][x - 1].classList.add('miss');
            computerMapDivs[y + 1][x - 1].classList.add('miss');
            computerMapDivs[y][x - 1].classList.add('miss');

            computerMapDivs[y + 3][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 3][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 2][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(3);

         } else if (y > 1 && y < 4 && x === 5) {
            computerCellsMap[y + 3][x] = 'missed';
            computerCellsMap[y + 3][x - 1] = 'missed';
            computerCellsMap[y + 2][x - 1] = 'missed';
            computerCellsMap[y + 1][x - 1] = 'missed';
            computerCellsMap[y][x - 1] = 'missed';
            computerCellsMap[y - 1][x - 1] = 'missed';
            computerCellsMap[y - 1][x] = 'missed';

            computerMapDivs[y + 3][x].classList.add('miss');
            computerMapDivs[y + 3][x - 1].classList.add('miss');
            computerMapDivs[y + 2][x - 1].classList.add('miss');
            computerMapDivs[y + 1][x - 1].classList.add('miss');
            computerMapDivs[y][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x].classList.add('miss');

            computerMapDivs[y + 3][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 3][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 2][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(3);

         } else if (y === 4 && x === 5) {
            computerCellsMap[y + 2][x - 1] = 'missed';
            computerCellsMap[y + 1][x - 1] = 'missed';
            computerCellsMap[y][x - 1] = 'missed';
            computerCellsMap[y - 1][x - 1] = 'missed';
            computerCellsMap[y - 1][x] = 'missed';

            computerMapDivs[y + 2][x - 1].classList.add('miss');
            computerMapDivs[y + 1][x - 1].classList.add('miss');
            computerMapDivs[y][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x].classList.add('miss');

            computerMapDivs[y + 2][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(3);

         } else if (y === 4 && x > 0 && x < 5) {
            computerCellsMap[y + 2][x - 1] = 'missed';
            computerCellsMap[y + 1][x - 1] = 'missed';
            computerCellsMap[y][x - 1] = 'missed';
            computerCellsMap[y - 1][x - 1] = 'missed';
            computerCellsMap[y - 1][x] = 'missed';
            computerCellsMap[y - 1][x + 1] = 'missed';
            computerCellsMap[y][x + 1] = 'missed';
            computerCellsMap[y + 1][x + 1] = 'missed';
            computerCellsMap[y + 2][x + 1] = 'missed';

            computerMapDivs[y + 2][x - 1].classList.add('miss');
            computerMapDivs[y + 1][x - 1].classList.add('miss');
            computerMapDivs[y][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x - 1].classList.add('miss');
            computerMapDivs[y - 1][x].classList.add('miss');
            computerMapDivs[y - 1][x + 1].classList.add('miss');
            computerMapDivs[y][x + 1].classList.add('miss');
            computerMapDivs[y + 1][x + 1].classList.add('miss');
            computerMapDivs[y + 2][x + 1].classList.add('miss');

            computerMapDivs[y + 2][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 2][x + 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(3);

         } else if (y === 4 && x === 0) {
            computerCellsMap[y - 1][x] = 'missed';
            computerCellsMap[y - 1][x + 1] = 'missed';
            computerCellsMap[y][x + 1] = 'missed';
            computerCellsMap[y + 1][x + 1] = 'missed';
            computerCellsMap[y + 2][x + 1] = 'missed';

            computerMapDivs[y - 1][x].classList.add('miss');
            computerMapDivs[y - 1][x + 1].classList.add('miss');
            computerMapDivs[y][x + 1].classList.add('miss');
            computerMapDivs[y + 1][x + 1].classList.add('miss');
            computerMapDivs[y + 2][x + 1].classList.add('miss');

            computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 2][x + 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(3);

         } else if (y > 1 && y < 4 && x === 0) {
            computerCellsMap[y - 1][x] = 'missed';
            computerCellsMap[y - 1][x + 1] = 'missed';
            computerCellsMap[y][x + 1] = 'missed';
            computerCellsMap[y + 1][x + 1] = 'missed';
            computerCellsMap[y + 2][x + 1] = 'missed';
            computerCellsMap[y + 3][x + 1] = 'missed';
            computerCellsMap[y + 3][x] = 'missed';

            computerMapDivs[y - 1][x].classList.add('miss');
            computerMapDivs[y - 1][x + 1].classList.add('miss');
            computerMapDivs[y][x + 1].classList.add('miss');
            computerMapDivs[y + 1][x + 1].classList.add('miss');
            computerMapDivs[y + 2][x + 1].classList.add('miss');
            computerMapDivs[y + 3][x + 1].classList.add('miss');
            computerMapDivs[y + 3][x].classList.add('miss');

            computerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 2][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 3][x + 1].innerHTML = `<div class='missed'></div>`;
            computerMapDivs[y + 3][x].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass(3);
         }
      }
   }
}
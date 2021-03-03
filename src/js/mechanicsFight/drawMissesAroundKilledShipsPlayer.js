import store from '../store/store';

const {arrayPlayerCells, mechanicsFight} = store.getGameState();

export const playerCellsMap = store.getCopyEmptyCellsMap();

export const playerMapDivs = {
   1: arrayPlayerCells.slice(0, 6),
   2: arrayPlayerCells.slice(6, 12),
   3: arrayPlayerCells.slice(12, 18),
   4: arrayPlayerCells.slice(18, 24),
   5: arrayPlayerCells.slice(24, 30),
   6: arrayPlayerCells.slice(30, 36)
};

function removeShipHitClass() {
   arrayPlayerCells.forEach(ship => {
      if (ship.classList.contains('hit')) {
         ship.classList.remove('hit');
      }
   });
}

// drawMissesAroundKilledSingleDeckPlayerShips - функция для отрисовки промохов вокруг убитого однопалубного корабля игрока.
export function drawMissesAroundKilledSingleDeckPlayerShips() {
   const killedShip = arrayPlayerCells.find(element => element.classList.contains('hit')),
      coordinates = killedShip.id.split('-'),
      y = Number(coordinates[1]),
      rawX = Number(coordinates[2]),
      x = rawX - 1;

   if (
      mechanicsFight.playerShips.oneDeck.length === 2 ||
      mechanicsFight.playerShips.oneDeck.length === 1 ||
      mechanicsFight.playerShips.oneDeck.length === 0
   ) {
      if (y > 1 && y < 6 && x > 0 && x < 5) {
         playerCellsMap[y - 1][x - 1] = 'missed';
         playerCellsMap[y - 1][x] = 'missed';
         playerCellsMap[y - 1][x + 1] = 'missed';
         playerCellsMap[y][x + 1] = 'missed';
         playerCellsMap[y + 1][x + 1] = 'missed';
         playerCellsMap[y + 1][x] = 'missed';
         playerCellsMap[y + 1][x - 1] = 'missed';
         playerCellsMap[y][x - 1] = 'missed';

         playerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

         removeShipHitClass();

      } else if (y === 1 && x === 0) {
         playerCellsMap[y][x + 1] = 'missed';
         playerCellsMap[y + 1][x + 1] = 'missed';
         playerCellsMap[y + 1][x] = 'missed';

         playerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;

         removeShipHitClass();

      } else if (y === 1 && x > 0 && x < 5) {
         playerCellsMap[y][x + 1] = 'missed';
         playerCellsMap[y + 1][x + 1] = 'missed';
         playerCellsMap[y + 1][x] = 'missed';
         playerCellsMap[y + 1][x - 1] = 'missed';
         playerCellsMap[y][x - 1] = 'missed';

         playerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

         removeShipHitClass();

      } else if (y === 1 && x === 5) {
         playerCellsMap[y + 1][x] = 'missed';
         playerCellsMap[y + 1][x - 1] = 'missed';
         playerCellsMap[y][x - 1] = 'missed';

         playerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

         removeShipHitClass();

      } else if (y > 1 && y < 6 && x === 5) {
         playerCellsMap[y + 1][x] = 'missed';
         playerCellsMap[y + 1][x - 1] = 'missed';
         playerCellsMap[y][x - 1] = 'missed';
         playerCellsMap[y - 1][x - 1] = 'missed';
         playerCellsMap[y - 1][x] = 'missed';

         playerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;

         removeShipHitClass();

      } else if (y === 6 && x === 5) {
         playerCellsMap[y][x - 1] = 'missed';
         playerCellsMap[y - 1][x - 1] = 'missed';
         playerCellsMap[y - 1][x] = 'missed';

         playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;

         removeShipHitClass();

      } else if (y === 6 && x > 0 && x < 5) {
         playerCellsMap[y][x - 1] = 'missed';
         playerCellsMap[y - 1][x - 1] = 'missed';
         playerCellsMap[y - 1][x] = 'missed';
         playerCellsMap[y - 1][x + 1] = 'missed';
         playerCellsMap[y][x + 1] = 'missed';

         playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;

         removeShipHitClass();

      } else if (y === 6 && x === 0) {
         playerCellsMap[y - 1][x] = 'missed';
         playerCellsMap[y - 1][x + 1] = 'missed';
         playerCellsMap[y][x + 1] = 'missed';

         playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;

         removeShipHitClass();

      } else if (y > 1 && y < 6 && x === 0) {
         playerCellsMap[y - 1][x] = 'missed';
         playerCellsMap[y - 1][x + 1] = 'missed';
         playerCellsMap[y][x + 1] = 'missed';
         playerCellsMap[y + 1][x + 1] = 'missed';
         playerCellsMap[y + 1][x] = 'missed';

         playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
         playerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;

         removeShipHitClass();
      }
   }
}

// drawMissesAroundKilledDoubleDeckPlayerShips - функция для отрисовки промохов вокруг убитого двухпалубного корабля игрока.
export function drawMissesAroundKilledDoubleDeckPlayerShips() {
   const killedShip = arrayPlayerCells.find(element => element.classList.contains('hit')),
      coordinates = killedShip.id.split('-'),
      y = Number(coordinates[1]),
      rawX = Number(coordinates[2]),
      x = rawX - 1;

   if (mechanicsFight.playerShips.twoDeck.length === 2 || mechanicsFight.playerShips.twoDeck.length === 0) {
      if (!killedShip.classList.contains('vertical')) {
         if (y > 1 && y < 6 && x > 0 && x < 4) {
            playerCellsMap[y - 1][x - 1] = 'missed';
            playerCellsMap[y - 1][x] = 'missed';
            playerCellsMap[y - 1][x + 1] = 'missed';
            playerCellsMap[y - 1][x + 2] = 'missed';
            playerCellsMap[y][x + 2] = 'missed';
            playerCellsMap[y + 1][x + 2] = 'missed';
            playerCellsMap[y + 1][x + 1] = 'missed';
            playerCellsMap[y + 1][x] = 'missed';
            playerCellsMap[y + 1][x - 1] = 'missed';
            playerCellsMap[y][x - 1] = 'missed';

            playerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 2].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x + 2].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 2].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y === 1 && x === 0) {
            playerCellsMap[y][x + 2] = 'missed';
            playerCellsMap[y + 1][x + 2] = 'missed';
            playerCellsMap[y + 1][x + 1] = 'missed';
            playerCellsMap[y + 1][x] = 'missed';

            playerMapDivs[y][x + 2].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 2].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y === 1 && x > 0 && x < 4) {
            playerCellsMap[y][x + 2] = 'missed';
            playerCellsMap[y + 1][x + 2] = 'missed';
            playerCellsMap[y + 1][x + 1] = 'missed';
            playerCellsMap[y + 1][x] = 'missed';
            playerCellsMap[y + 1][x - 1] = 'missed';
            playerCellsMap[y][x - 1] = 'missed';

            playerMapDivs[y][x + 2].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 2].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y === 1 && x === 4) {
            playerCellsMap[y + 1][x + 1] = 'missed';
            playerCellsMap[y + 1][x] = 'missed';
            playerCellsMap[y + 1][x - 1] = 'missed';
            playerCellsMap[y][x - 1] = 'missed';

            playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y > 1 && y < 6 && x === 0) {
            playerCellsMap[y - 1][x] = 'missed';
            playerCellsMap[y - 1][x + 1] = 'missed';
            playerCellsMap[y - 1][x + 2] = 'missed';
            playerCellsMap[y][x + 2] = 'missed';
            playerCellsMap[y + 1][x + 2] = 'missed';
            playerCellsMap[y + 1][x + 1] = 'missed';
            playerCellsMap[y + 1][x] = 'missed';

            playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 2].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x + 2].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 2].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y > 1 && y < 6 && x === 4) {
            playerCellsMap[y + 1][x + 1] = 'missed';
            playerCellsMap[y + 1][x] = 'missed';
            playerCellsMap[y + 1][x - 1] = 'missed';
            playerCellsMap[y][x - 1] = 'missed';
            playerCellsMap[y - 1][x - 1] = 'missed';
            playerCellsMap[y - 1][x] = 'missed';
            playerCellsMap[y - 1][x + 1] = 'missed';

            playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y === 6 && x === 4) {
            playerCellsMap[y][x - 1] = 'missed';
            playerCellsMap[y - 1][x - 1] = 'missed';
            playerCellsMap[y - 1][x] = 'missed';
            playerCellsMap[y - 1][x + 1] = 'missed';

            playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y === 6 && x > 0 && x < 4) {
            playerCellsMap[y][x - 1] = 'missed';
            playerCellsMap[y - 1][x - 1] = 'missed';
            playerCellsMap[y - 1][x] = 'missed';
            playerCellsMap[y - 1][x + 1] = 'missed';
            playerCellsMap[y - 1][x + 2] = 'missed';
            playerCellsMap[y][x + 2] = 'missed';

            playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 2].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x + 2].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y === 6 && x === 0) {
            playerCellsMap[y - 1][x] = 'missed';
            playerCellsMap[y - 1][x + 1] = 'missed';
            playerCellsMap[y - 1][x + 2] = 'missed';
            playerCellsMap[y][x + 2] = 'missed';

            playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 2].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x + 2].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();
         }

      } else if (killedShip.classList.contains('vertical')) {
         if (y > 1 && y < 5 && x > 0 && x < 5) {
            playerCellsMap[y - 1][x - 1] = 'missed';
            playerCellsMap[y - 1][x] = 'missed';
            playerCellsMap[y - 1][x + 1] = 'missed';
            playerCellsMap[y][x + 1] = 'missed';
            playerCellsMap[y + 1][x + 1] = 'missed';
            playerCellsMap[y + 2][x + 1] = 'missed';
            playerCellsMap[y + 2][x] = 'missed';
            playerCellsMap[y + 2][x - 1] = 'missed';
            playerCellsMap[y + 1][x - 1] = 'missed';
            playerCellsMap[y][x - 1] = 'missed';

            playerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 2][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 2][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 2][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y === 1 && x === 0) {
            playerCellsMap[y][x + 1] = 'missed';
            playerCellsMap[y + 1][x + 1] = 'missed';
            playerCellsMap[y + 2][x + 1] = 'missed';
            playerCellsMap[y + 2][x] = 'missed';

            playerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 2][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 2][x].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y === 1 && x > 0 && x < 5) {
            playerCellsMap[y][x + 1] = 'missed';
            playerCellsMap[y + 1][x + 1] = 'missed';
            playerCellsMap[y + 2][x + 1] = 'missed';
            playerCellsMap[y + 2][x] = 'missed';
            playerCellsMap[y + 2][x - 1] = 'missed';
            playerCellsMap[y + 1][x - 1] = 'missed';
            playerCellsMap[y][x - 1] = 'missed';

            playerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 2][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 2][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 2][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y === 1 && x === 5) {
            playerCellsMap[y][x - 1] = 'missed';
            playerCellsMap[y + 1][x - 1] = 'missed';
            playerCellsMap[y + 2][x - 1] = 'missed';
            playerCellsMap[y + 2][x] = 'missed';

            playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 2][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 2][x].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y > 1 && y < 5 && x === 5) {
            playerCellsMap[y + 2][x] = 'missed';
            playerCellsMap[y + 2][x - 1] = 'missed';
            playerCellsMap[y + 1][x - 1] = 'missed';
            playerCellsMap[y][x - 1] = 'missed';
            playerCellsMap[y - 1][x - 1] = 'missed';
            playerCellsMap[y - 1][x] = 'missed';

            playerMapDivs[y + 2][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 2][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y === 5 && x === 5) {
            playerCellsMap[y + 1][x - 1] = 'missed';
            playerCellsMap[y][x - 1] = 'missed';
            playerCellsMap[y - 1][x - 1] = 'missed';
            playerCellsMap[y - 1][x] = 'missed';

            playerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y === 5 && x > 0 && x < 5) {
            playerCellsMap[y + 1][x - 1] = 'missed';
            playerCellsMap[y][x - 1] = 'missed';
            playerCellsMap[y - 1][x - 1] = 'missed';
            playerCellsMap[y - 1][x] = 'missed';
            playerCellsMap[y - 1][x + 1] = 'missed';
            playerCellsMap[y][x + 1] = 'missed';
            playerCellsMap[y + 1][x + 1] = 'missed';

            playerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y === 5 && x === 0) {
            playerCellsMap[y - 1][x] = 'missed';
            playerCellsMap[y - 1][x + 1] = 'missed';
            playerCellsMap[y][x + 1] = 'missed';
            playerCellsMap[y + 1][x + 1] = 'missed';

            playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y > 1 && y < 5 && x === 0) {
            playerCellsMap[y - 1][x] = 'missed';
            playerCellsMap[y - 1][x + 1] = 'missed';
            playerCellsMap[y][x + 1] = 'missed';
            playerCellsMap[y + 1][x + 1] = 'missed';
            playerCellsMap[y + 2][x + 1] = 'missed';
            playerCellsMap[y + 2][x] = 'missed';

            playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 2][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 2][x].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();
         }
      }
   }
}
// drawMissesAroundKilledThreeDeckPlayerShip - функция для отрисовки промохов вокруг убитого трехпалубного корабля игрока. 
export function drawMissesAroundKilledThreeDeckPlayerShip() {
   const killedShip = arrayPlayerCells.find(element => element.classList.contains('hit')),
      coordinates = killedShip.id.split('-'),
      y = Number(coordinates[1]),
      rawX = Number(coordinates[2]),
      x = rawX - 1;

   if (mechanicsFight.playerShips.threeDeck.length === 0) {
      if (!killedShip.classList.contains('vertical')) {
         if (y > 1 && y < 6 && x > 0 && x < 3) {
            playerCellsMap[y - 1][x - 1] = 'missed';
            playerCellsMap[y - 1][x] = 'missed';
            playerCellsMap[y - 1][x + 1] = 'missed';
            playerCellsMap[y - 1][x + 2] = 'missed';
            playerCellsMap[y - 1][x + 3] = 'missed';
            playerCellsMap[y][x + 3] = 'missed';
            playerCellsMap[y + 1][x + 3] = 'missed';
            playerCellsMap[y + 1][x + 2] = 'missed';
            playerCellsMap[y + 1][x + 1] = 'missed';
            playerCellsMap[y + 1][x] = 'missed';
            playerCellsMap[y + 1][x - 1] = 'missed';
            playerCellsMap[y][x - 1] = 'missed';

            playerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 2].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 3].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x + 3].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 3].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 2].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y === 1 && x === 0) {
            playerCellsMap[y][x + 3] = 'missed';
            playerCellsMap[y + 1][x + 3] = 'missed';
            playerCellsMap[y + 1][x + 2] = 'missed';
            playerCellsMap[y + 1][x + 1] = 'missed';
            playerCellsMap[y + 1][x] = 'missed';

            playerMapDivs[y][x + 3].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 3].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 2].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y === 1 && x > 0 && x < 3) {
            playerCellsMap[y][x + 3] = 'missed';
            playerCellsMap[y + 1][x + 3] = 'missed';
            playerCellsMap[y + 1][x + 2] = 'missed';
            playerCellsMap[y + 1][x + 1] = 'missed';
            playerCellsMap[y + 1][x] = 'missed';
            playerCellsMap[y + 1][x - 1] = 'missed';
            playerCellsMap[y][x - 1] = 'missed';

            playerMapDivs[y][x + 3].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 3].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 2].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y > 1 && y < 6 && x === 3) {
            playerCellsMap[y + 1][x + 2] = 'missed';
            playerCellsMap[y + 1][x + 1] = 'missed';
            playerCellsMap[y + 1][x] = 'missed';
            playerCellsMap[y + 1][x - 1] = 'missed';
            playerCellsMap[y][x - 1] = 'missed';
            playerCellsMap[y - 1][x - 1] = 'missed';
            playerCellsMap[y - 1][x] = 'missed';
            playerCellsMap[y - 1][x + 1] = 'missed';
            playerCellsMap[y - 1][x + 2] = 'missed';

            playerMapDivs[y + 1][x + 2].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 2].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y === 1 && x === 3) {
            playerCellsMap[y + 1][x + 2] = 'missed';
            playerCellsMap[y + 1][x + 1] = 'missed';
            playerCellsMap[y + 1][x] = 'missed';
            playerCellsMap[y + 1][x - 1] = 'missed';
            playerCellsMap[y][x - 1] = 'missed';

            playerMapDivs[y + 1][x + 2].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y === 6 && x === 3) {
            playerCellsMap[y][x - 1] = 'missed';
            playerCellsMap[y - 1][x - 1] = 'missed';
            playerCellsMap[y - 1][x] = 'missed';
            playerCellsMap[y - 1][x + 1] = 'missed';
            playerCellsMap[y - 1][x + 2] = 'missed';

            playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 2].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y === 6 && x > 0 && x < 3) {
            playerCellsMap[y][x - 1] = 'missed';
            playerCellsMap[y - 1][x - 1] = 'missed';
            playerCellsMap[y - 1][x] = 'missed';
            playerCellsMap[y - 1][x + 1] = 'missed';
            playerCellsMap[y - 1][x + 2] = 'missed';
            playerCellsMap[y - 1][x + 3] = 'missed';
            playerCellsMap[y][x + 3] = 'missed';

            playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 2].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 3].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x + 3].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y === 6 && x === 0) {
            playerCellsMap[y - 1][x] = 'missed';
            playerCellsMap[y - 1][x + 1] = 'missed';
            playerCellsMap[y - 1][x + 2] = 'missed';
            playerCellsMap[y - 1][x + 3] = 'missed';
            playerCellsMap[y][x + 3] = 'missed';

            playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 2].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 3].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x + 3].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y > 0 && y < 6 && x === 0) {
            playerCellsMap[y + 1][x] = 'missed';
            playerCellsMap[y + 1][x + 1] = 'missed';
            playerCellsMap[y + 1][x + 2] = 'missed';
            playerCellsMap[y + 1][x + 3] = 'missed';
            playerCellsMap[y][x + 3] = 'missed';
            playerCellsMap[y - 1][x + 3] = 'missed';
            playerCellsMap[y - 1][x + 2] = 'missed';
            playerCellsMap[y - 1][x + 1] = 'missed';
            playerCellsMap[y - 1][x] = 'missed';

            playerMapDivs[y + 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 2].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 3].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x + 3].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 3].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 2].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();
         }
      } else if (killedShip.classList.contains('vertical')) {
         if (y > 1 && y < 4 && x > 0 && x < 5) {
            playerCellsMap[y - 1][x - 1] = 'missed';
            playerCellsMap[y - 1][x] = 'missed';
            playerCellsMap[y - 1][x + 1] = 'missed';
            playerCellsMap[y][x + 1] = 'missed';
            playerCellsMap[y + 1][x + 1] = 'missed';
            playerCellsMap[y + 2][x + 1] = 'missed';
            playerCellsMap[y + 3][x + 1] = 'missed';
            playerCellsMap[y + 3][x] = 'missed';
            playerCellsMap[y + 3][x - 1] = 'missed';
            playerCellsMap[y + 2][x - 1] = 'missed';
            playerCellsMap[y + 1][x - 1] = 'missed';
            playerCellsMap[y][x - 1] = 'missed';

            playerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 2][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 3][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 3][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 3][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 2][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y === 1 && x === 0) {
            playerCellsMap[y][x + 1] = 'missed';
            playerCellsMap[y + 1][x + 1] = 'missed';
            playerCellsMap[y + 2][x + 1] = 'missed';
            playerCellsMap[y + 3][x + 1] = 'missed';
            playerCellsMap[y + 3][x] = 'missed';

            playerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 2][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 3][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 3][x].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y === 1 && x > 0 && x < 5) {
            playerCellsMap[y][x + 1] = 'missed';
            playerCellsMap[y + 1][x + 1] = 'missed';
            playerCellsMap[y + 2][x + 1] = 'missed';
            playerCellsMap[y + 3][x + 1] = 'missed';
            playerCellsMap[y + 3][x] = 'missed';
            playerCellsMap[y + 3][x - 1] = 'missed';
            playerCellsMap[y + 2][x - 1] = 'missed';
            playerCellsMap[y + 1][x - 1] = 'missed';
            playerCellsMap[y][x - 1] = 'missed';

            playerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 2][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 3][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 3][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 3][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 2][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y === 1 && x === 5) {
            playerCellsMap[y + 3][x] = 'missed';
            playerCellsMap[y + 3][x - 1] = 'missed';
            playerCellsMap[y + 2][x - 1] = 'missed';
            playerCellsMap[y + 1][x - 1] = 'missed';
            playerCellsMap[y][x - 1] = 'missed';

            playerMapDivs[y + 3][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 3][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 2][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y > 1 && y < 4 && x === 5) {
            playerCellsMap[y + 3][x] = 'missed';
            playerCellsMap[y + 3][x - 1] = 'missed';
            playerCellsMap[y + 2][x - 1] = 'missed';
            playerCellsMap[y + 1][x - 1] = 'missed';
            playerCellsMap[y][x - 1] = 'missed';
            playerCellsMap[y - 1][x - 1] = 'missed';
            playerCellsMap[y - 1][x] = 'missed';

            playerMapDivs[y + 3][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 3][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 2][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y === 4 && x === 5) {
            playerCellsMap[y + 2][x - 1] = 'missed';
            playerCellsMap[y + 1][x - 1] = 'missed';
            playerCellsMap[y][x - 1] = 'missed';
            playerCellsMap[y - 1][x - 1] = 'missed';
            playerCellsMap[y - 1][x] = 'missed';

            playerMapDivs[y + 2][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y === 4 && x > 0 && x < 5) {
            playerCellsMap[y + 2][x - 1] = 'missed';
            playerCellsMap[y + 1][x - 1] = 'missed';
            playerCellsMap[y][x - 1] = 'missed';
            playerCellsMap[y - 1][x - 1] = 'missed';
            playerCellsMap[y - 1][x] = 'missed';
            playerCellsMap[y - 1][x + 1] = 'missed';
            playerCellsMap[y][x + 1] = 'missed';
            playerCellsMap[y + 1][x + 1] = 'missed';
            playerCellsMap[y + 2][x + 1] = 'missed';

            playerMapDivs[y + 2][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x - 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 2][x + 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y === 4 && x === 0) {
            playerCellsMap[y - 1][x] = 'missed';
            playerCellsMap[y - 1][x + 1] = 'missed';
            playerCellsMap[y][x + 1] = 'missed';
            playerCellsMap[y + 1][x + 1] = 'missed';
            playerCellsMap[y + 2][x + 1] = 'missed';

            playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 2][x + 1].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();

         } else if (y > 1 && y < 4 && x === 0) {
            playerCellsMap[y - 1][x] = 'missed';
            playerCellsMap[y - 1][x + 1] = 'missed';
            playerCellsMap[y][x + 1] = 'missed';
            playerCellsMap[y + 1][x + 1] = 'missed';
            playerCellsMap[y + 2][x + 1] = 'missed';
            playerCellsMap[y + 3][x + 1] = 'missed';
            playerCellsMap[y + 3][x] = 'missed';

            playerMapDivs[y - 1][x].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y - 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 1][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 2][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 3][x + 1].innerHTML = `<div class='missed'></div>`;
            playerMapDivs[y + 3][x].innerHTML = `<div class='missed'></div>`;

            removeShipHitClass();
         }
      }
   }
}
import store from '../store/store';
import {
   countSingleDeckShipsPlayer, countDoubleDeckShipsPlayer, countThreeDeckShipsPlayer,
   countSingleDeckShipsComputer, countDoubleDeckShipsComputer, countThreeDeckShipsComputer,
   playerField, ComputerField, winnerWindow, loserWindow, closeWinnerWindow, closeLoserWindow,
   playerMove, computerMove
} from '../store/store';
import {
   drawMissesAroundKilledSingleDeckComputerShips, 
   drawMissesAroundKilledDoubleDeckComputerShips,
   drawMissesAroundKilledThreeDeckComputerShip
} from './drawMissesAroundComputerKilledShips';
import {
   playerCellsMap, playerMapDivs,
   drawMissesAroundKilledSingleDeckPlayerShips,
   drawMissesAroundKilledDoubleDeckPlayerShips,
   drawMissesAroundKilledThreeDeckPlayerShip
} from './drawMissesAroundKilledShipsPlayer';


export const MechanicsFight = {
   init: () => {
      closeWinnerWindow.addEventListener('click', () => {
         winnerWindow.style.display = 'none';
      });

      closeLoserWindow.addEventListener('click', () => {
         loserWindow.style.display = 'none';
      });

      const { arrayPlayerCells, arrayComputerCells, mechanicsFight, literals } = store.getGameState();
      
      // defineWinner - функция вывода окна победителя.
      function defineWinner() {
         if (
            mechanicsFight.computerShips.oneDeck.length === 0 &&
            mechanicsFight.computerShips.twoDeck.length === 0 &&
            mechanicsFight.computerShips.threeDeck.length === 0
         ) {
            winnerWindow.style.display = 'grid';

            arrayComputerCells.forEach((ship) => {
               ship.removeEventListener('click', activateShotUser);
            });

            return;

         } else if (
            mechanicsFight.playerShips.oneDeck.length === 0 &&
            mechanicsFight.playerShips.twoDeck.length === 0 &&
            mechanicsFight.playerShips.threeDeck.length === 0
         ) {
            loserWindow.style.display = 'grid';

            return;
         }
      }

      // drawNumberShipsUserAndShipComputer - функция подсчета оставшихся кораблей на полях игрока и компьютера.
      function drawNumberShipsUserAndShipComputer() {
         if (mechanicsFight.playerShips.oneDeck.length === 0) {
            countSingleDeckShipsPlayer.innerHTML = '0';
         } else if (mechanicsFight.playerShips.oneDeck.length === 1) {
            countSingleDeckShipsPlayer.innerHTML = '1';
         } else if (mechanicsFight.playerShips.oneDeck.length === 2) {
            countSingleDeckShipsPlayer.innerHTML = '2';
         }

         if (mechanicsFight.playerShips.twoDeck.length === 0) {
            countDoubleDeckShipsPlayer.innerHTML = '0';
         } else if (mechanicsFight.playerShips.twoDeck.length === 2) {
            countDoubleDeckShipsPlayer.innerHTML = '1';
         }

         if (mechanicsFight.playerShips.threeDeck.length === 0) {
            countThreeDeckShipsPlayer.innerHTML = '0';
         }


         if (mechanicsFight.computerShips.oneDeck.length === 0) {
            countSingleDeckShipsComputer.innerHTML = '0';
         } else if (mechanicsFight.computerShips.oneDeck.length === 1) {
            countSingleDeckShipsComputer.innerHTML = '1';
         } else if (mechanicsFight.computerShips.oneDeck.length === 2) {
            countSingleDeckShipsComputer.innerHTML = '2';
         }

         if (mechanicsFight.computerShips.twoDeck.length === 0) {
            countDoubleDeckShipsComputer.innerHTML = '0';
         } else if (mechanicsFight.computerShips.twoDeck.length === 2) {
            countDoubleDeckShipsComputer.innerHTML = '1';
         }

         if (mechanicsFight.computerShips.threeDeck.length === 0) {
            countThreeDeckShipsComputer.innerHTML = '0';
         }
      }

      arrayPlayerCells.forEach(ship => {
         if (ship.classList.contains('activeOneDeckShip')) {
            mechanicsFight.playerShips.oneDeck.push(ship);
         } else if (ship.classList.contains('activeTwoDeckShip')) {
            mechanicsFight.playerShips.twoDeck.push(ship);
         } else if (ship.classList.contains('activeThreeDeckShip')) {
            mechanicsFight.playerShips.threeDeck.push(ship);
         }
      });

      arrayComputerCells.forEach((ship) => {
         if (ship.classList.contains('activeOneDeckComputerShip')) {
            mechanicsFight.computerShips.oneDeck.push(ship);
         } else if (ship.classList.contains('activeTwoDeckComputerShip')) {
            mechanicsFight.computerShips.twoDeck.push(ship);
         } else if (ship.classList.contains('activeThreeDeckComputerShip')) {
            mechanicsFight.computerShips.threeDeck.push(ship);
         }
      });

      function getRandomShip() {
         mechanicsFight.randomPlayerCell = arrayPlayerCells[Math.floor(Math.random() * arrayPlayerCells.length)];
      }

      // getLimitedRandomShip - функция ограниченого выстрела компьютера при попадании в 2-х или 3-х палубный корабль. 
      function getLimitedRandomShip() {
         mechanicsFight.limitedRandomCell = mechanicsFight.limitedArrayPlayerCells[Math.floor(Math.random() * mechanicsFight.limitedArrayPlayerCells.length)];
      }

      // activateShotUser - функция для выстрела игрока.
      function activateShotUser() {
         if (this.classList.contains('activeOneDeckComputerShip')) {
            this.style.backgroundColor = 'red';
            this.classList.add('hit');
            mechanicsFight.computerShips.oneDeck.splice(this, 1);
            drawMissesAroundKilledSingleDeckComputerShips();

         } else if (this.classList.contains('activeTwoDeckComputerShip')) {
            this.style.backgroundColor = 'red';
            this.classList.add('hit');
            mechanicsFight.computerShips.twoDeck.splice(this, 1);
            drawMissesAroundKilledDoubleDeckComputerShips();

         } else if (this.classList.contains('activeThreeDeckComputerShip')) {
            this.style.backgroundColor = 'red';
            this.classList.add('hit');
            mechanicsFight.computerShips.threeDeck.splice(this, 1);
            drawMissesAroundKilledThreeDeckComputerShip();

         } else if (this.classList.contains('miss')) {
            return getShotUser();
         } else {
            this.innerHTML = `<div class='missed'></div>`;
            this.classList.add('miss');
         }

         defineWinner();
         drawNumberShipsUserAndShipComputer();
         getShotUser(event);
      }

      // makeShotComputer - функция хода компьютера.
      function makeShotComputer() {
         playerField.style.outline = '4px solid red';
         computerMove.innerHTML = literals.MOVE_COMPUTER;

         const delayShot = setTimeout(() => {
            function getLimitedShot() {
               getLimitedRandomShip();

               const coordinates = mechanicsFight.limitedRandomCell.id.split('-'),
                  y = Number(coordinates[1]),
                  rawX = Number(coordinates[2]),
                  x = rawX - 1;

               if (playerCellsMap[y][x] === null) {
                  if (mechanicsFight.limitedRandomCell.classList.contains('activeTwoDeckShip')) {
                     mechanicsFight.limitedRandomCell.style.backgroundColor = 'red';

                     mechanicsFight.limitedRandomCell.classList.add('hit');

                     mechanicsFight.playerShips.twoDeck.splice(mechanicsFight.limitedRandomCell, 1);

                     playerCellsMap[y][x] = 'hit';

                     mechanicsFight.limitedArrayPlayerCells.splice(mechanicsFight.limitedRandomCell, 1);

                     clearTimeout(delayShot);

                     if (mechanicsFight.playerShips.twoDeck.length === 2 || mechanicsFight.playerShips.twoDeck.length === 0) {
                        mechanicsFight.limitedArrayPlayerCells.splice(0, mechanicsFight.limitedArrayPlayerCells.length);
                     }

                     defineWinner();
                     drawNumberShipsUserAndShipComputer();
                     drawMissesAroundKilledDoubleDeckPlayerShips();
                     makeShotComputer();

                  } else if (mechanicsFight.limitedRandomCell.classList.contains('activeThreeDeckShip')) {
                     mechanicsFight.limitedRandomCell.style.backgroundColor = 'red';

                     mechanicsFight.limitedRandomCell.classList.add('hit');

                     mechanicsFight.playerShips.threeDeck.splice(mechanicsFight.limitedRandomCell, 1);

                     playerCellsMap[y][x] = 'hit';

                     clearTimeout(delayShot);

                     if (mechanicsFight.playerShips.threeDeck.length === 1) {
                        mechanicsFight.limitedArrayPlayerCells.splice(0, mechanicsFight.limitedArrayPlayerCells.length);

                        arrayPlayerCells.forEach(element => {
                           if (element.classList.contains('activeThreeDeckShip')) {
                              mechanicsFight.limitedArrayPlayerCells.push(element);
                           }
                        })

                        getLimitedShot();

                     } else if (mechanicsFight.playerShips.threeDeck.length === 0) {
                        mechanicsFight.limitedArrayPlayerCells.splice(0, mechanicsFight.limitedArrayPlayerCells.length);

                        defineWinner();
                        drawNumberShipsUserAndShipComputer();
                        drawMissesAroundKilledThreeDeckPlayerShip();
                        makeShotComputer();

                     } else {
                        defineWinner();
                        drawNumberShipsUserAndShipComputer();
                        drawMissesAroundKilledThreeDeckPlayerShip();
                        getLimitedShot();
                     }


                  } else {
                     mechanicsFight.limitedRandomCell.innerHTML = `<div class='missed'></div>`;

                     playerCellsMap[y][x] = 'missed';


                     arrayComputerCells.forEach((ship) => {
                        ship.addEventListener('click', activateShotUser);
                     });

                     clearTimeout(delayShot);
                     playerField.style.outline = 'none';
                     computerMove.innerHTML = '';
                     getShotUser();
                  }

               } else {
                  makeShotComputer();
               }

            }

            function getShot() {
               getRandomShip();

               const coordinates = mechanicsFight.randomPlayerCell.id.split('-'),
                  y = Number(coordinates[1]),
                  rawX = Number(coordinates[2]),
                  x = rawX - 1;


               if (playerCellsMap[y][x] === null) {
                  if (mechanicsFight.randomPlayerCell.classList.contains('activeOneDeckShip')) {
                     mechanicsFight.playerShips.oneDeck.splice(mechanicsFight.randomPlayerCell, 1);

                     mechanicsFight.randomPlayerCell.style.backgroundColor = 'red';

                     mechanicsFight.randomPlayerCell.classList.add('hit');

                     playerCellsMap[y][x] = 'hit';

                     clearTimeout(delayShot);
                     defineWinner();
                     drawNumberShipsUserAndShipComputer();
                     drawMissesAroundKilledSingleDeckPlayerShips();
                     getShot();

                  } else if (mechanicsFight.randomPlayerCell.classList.contains('activeTwoDeckShip')) {
                     mechanicsFight.playerShips.twoDeck.splice(mechanicsFight.randomPlayerCell, 1);

                     mechanicsFight.randomPlayerCell.classList.add('hit');

                     mechanicsFight.randomPlayerCell.style.backgroundColor = 'red';

                     playerCellsMap[y][x] = 'hit';

                     clearTimeout(delayShot);
                     defineWinner();
                     drawNumberShipsUserAndShipComputer();

                     if (y === 1 && x === 0) {
                        mechanicsFight.limitedArrayPlayerCells.push(
                           playerMapDivs[y][x + 1],
                           playerMapDivs[y + 1][x]
                        );
                        makeShotComputer();

                     } else if (y === 1 && x === 5) {
                        mechanicsFight.limitedArrayPlayerCells.push(
                           playerMapDivs[y][x - 1],
                           playerMapDivs[y + 1][x]
                        );
                        makeShotComputer();

                     } else if (y === 6 && x === 0) {
                        mechanicsFight.limitedArrayPlayerCells.push(
                           playerMapDivs[y - 1][x],
                           playerMapDivs[y][x + 1]
                        );
                        makeShotComputer();

                     } else if (y === 6 && x === 5) {
                        mechanicsFight.limitedArrayPlayerCells.push(
                           playerMapDivs[y][x - 1],
                           playerMapDivs[y - 1][x]
                        );
                        makeShotComputer();

                     } else if (y > 1 && y < 6 && x === 0) {
                        mechanicsFight.limitedArrayPlayerCells.push(
                           playerMapDivs[y - 1][x],
                           playerMapDivs[y][x + 1],
                           playerMapDivs[y + 1][x]
                        );
                        makeShotComputer();

                     } else if (y === 1 && x > 0 && x < 5) {
                        mechanicsFight.limitedArrayPlayerCells.push(
                           playerMapDivs[y][x + 1],
                           playerMapDivs[y + 1][x],
                           playerMapDivs[y][x - 1]
                        );
                        makeShotComputer();

                     } else if (y > 1 && y < 6 && x === 5) {
                        mechanicsFight.limitedArrayPlayerCells.push(
                           playerMapDivs[y - 1][x],
                           playerMapDivs[y][x - 1],
                           playerMapDivs[y + 1][x]
                        );
                        makeShotComputer();

                     } else if (y === 6 && x > 0 && x < 5) {
                        mechanicsFight.limitedArrayPlayerCells.push(
                           playerMapDivs[y][x - 1],
                           playerMapDivs[y - 1][x],
                           playerMapDivs[y][x + 1]
                        );
                        makeShotComputer();

                     } else if (y > 1 && y < 6 && x > 0 && x < 5) {
                        mechanicsFight.limitedArrayPlayerCells.push(
                           playerMapDivs[y][x - 1],
                           playerMapDivs[y - 1][x],
                           playerMapDivs[y][x + 1],
                           playerMapDivs[y + 1][x]
                        );
                        makeShotComputer();
                     }


                  } else if (mechanicsFight.randomPlayerCell.classList.contains('activeThreeDeckShip')) {
                     mechanicsFight.playerShips.threeDeck.splice(mechanicsFight.randomPlayerCell, 1);

                     mechanicsFight.randomPlayerCell.style.backgroundColor = 'red';

                     mechanicsFight.randomPlayerCell.classList.add('hit');

                     playerCellsMap[y][x] = 'hit';

                     clearTimeout(delayShot);
                     defineWinner();
                     drawNumberShipsUserAndShipComputer();

                     if (y === 1 && x === 0) {
                        mechanicsFight.limitedArrayPlayerCells.push(
                           playerMapDivs[y][x + 1],
                           playerMapDivs[y + 1][x]
                        );
                        makeShotComputer();

                     } else if (y === 1 && x === 5) {
                        mechanicsFight.limitedArrayPlayerCells.push(
                           playerMapDivs[y][x - 1],
                           playerMapDivs[y + 1][x]
                        );
                        makeShotComputer();

                     } else if (y === 6 && x === 0) {
                        mechanicsFight.limitedArrayPlayerCells.push(
                           playerMapDivs[y - 1][x],
                           playerMapDivs[y][x + 1]
                        );
                        makeShotComputer();

                     } else if (y === 6 && x === 5) {
                        mechanicsFight.limitedArrayPlayerCells.push(
                           playerMapDivs[y][x - 1],
                           playerMapDivs[y - 1][x]
                        );
                        makeShotComputer();

                     } else if (y > 1 && y < 6 && x === 0) {
                        mechanicsFight.limitedArrayPlayerCells.push(
                           playerMapDivs[y - 1][x],
                           playerMapDivs[y][x + 1],
                           playerMapDivs[y + 1][x]
                        );
                        makeShotComputer();

                     } else if (y === 1 && x > 0 && x < 5) {
                        mechanicsFight.limitedArrayPlayerCells.push(
                           playerMapDivs[y][x + 1],
                           playerMapDivs[y + 1][x],
                           playerMapDivs[y][x - 1]
                        );
                        makeShotComputer();

                     } else if (y > 1 && y < 6 && x === 5) {
                        mechanicsFight.limitedArrayPlayerCells.push(
                           playerMapDivs[y - 1][x],
                           playerMapDivs[y][x - 1],
                           playerMapDivs[y + 1][x]
                        );
                        makeShotComputer();

                     } else if (y === 6 && x > 0 && x < 5) {
                        mechanicsFight.limitedArrayPlayerCells.push(
                           playerMapDivs[y][x - 1],
                           playerMapDivs[y - 1][x],
                           playerMapDivs[y][x + 1]
                        );
                        makeShotComputer();

                     } else if (y > 1 && y < 6 && x > 0 && x < 5) {
                        mechanicsFight.limitedArrayPlayerCells.push(
                           playerMapDivs[y][x - 1],
                           playerMapDivs[y - 1][x],
                           playerMapDivs[y][x + 1],
                           playerMapDivs[y + 1][x]
                        );
                        makeShotComputer();
                     }

                  } else {
                     mechanicsFight.randomPlayerCell.innerHTML = `<div class='missed'></div>`;

                     playerCellsMap[y][x] = 'missed';

                     arrayComputerCells.forEach((ship) => {
                        ship.addEventListener('click', activateShotUser);
                     });

                     clearTimeout(delayShot);
                     playerField.style.outline = 'none';
                     computerMove.innerHTML = '';
                     getShotUser();
                  }

               } else if (playerCellsMap[y][x] !== null) {
                  getShot();
               }
            }

            if (mechanicsFight.playerShips.oneDeck.length <= 3) {
               if (mechanicsFight.playerShips.twoDeck.length === 4 || mechanicsFight.playerShips.twoDeck.length === 2 || mechanicsFight.playerShips.twoDeck.length === 0) {
                  if (mechanicsFight.playerShips.threeDeck.length === 3 || mechanicsFight.playerShips.threeDeck.length === 0) {
                     getShot();

                  } else {
                     getLimitedShot();
                  }

               } else {
                  getLimitedShot();
               }

            } else {
               getLimitedShot();
            }

         }, 1000);
      }

      arrayComputerCells.forEach((ship) => {
         ship.addEventListener('click', activateShotUser);
         drawNumberShipsUserAndShipComputer();
      });

      // getShotUser - функция выстрела игрока.
      function getShotUser(event) {
         ComputerField.style.outline = '4px solid red';
         playerMove.innerHTML = literals.MOVE_USER;

         if (event && (
            event.target.classList.contains('activeOneDeckComputerShip') ||
            event.target.classList.contains('activeTwoDeckComputerShip') ||
            event.target.classList.contains('activeThreeDeckComputerShip')
         )
         ) {
            drawNumberShipsUserAndShipComputer();
            defineWinner();
            getShotUser();

         } else if (event && (
            !event.target.classList.contains('activeOneDeckComputerShip') ||
            !event.target.classList.contains('activeTwoDeckComputerShip') ||
            !event.target.classList.contains('activeThreeDeckComputerShip')
         )
         ) {
            arrayComputerCells.forEach((ship) => {
               ship.removeEventListener('click', activateShotUser);
            });

            drawNumberShipsUserAndShipComputer();

            ComputerField.style.outline = 'none';
            playerMove.innerHTML = '';

            makeShotComputer();
         }
      }

      getShotUser();
   }
};
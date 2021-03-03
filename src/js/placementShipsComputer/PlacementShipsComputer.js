import store from '../store/store';
import {
   countSingleDeckShipsComputer, countDoubleDeckShipsComputer, countThreeDeckShipsComputer
} from '../store/store';

export const PlacementShipsComputer = {
   init: () => {
      const {
         computerState, arrayComputerCells, orientationEnum, shipTypeComputer
      } = store.getGameState();

      const computerCellsMap = store.getCopyEmptyCellsMap();

      const computerMapDivs = {
         1: arrayComputerCells.slice(0, 6),
         2: arrayComputerCells.slice(6, 12),
         3: arrayComputerCells.slice(12, 18),
         4: arrayComputerCells.slice(18, 24),
         5: arrayComputerCells.slice(24, 30),
         6: arrayComputerCells.slice(30, 36)
      };

      function drawNumberShipsComputer() {
         let countOne = 0,
            countTwo = 0,
            countThree = 0;

         arrayComputerCells.forEach((ship) => {
            if (ship.classList.contains('activeOneDeckComputerShip')) {
               countOne++;

            } else if (ship.classList.contains('activeTwoDeckComputerShip')) {
               countTwo++;

            } else if (ship.classList.contains('activeThreeDeckComputerShip')) {
               countThree++;
            }
         });

         if (countOne === 1) {
            countSingleDeckShipsComputer.innerHTML = '1';
         } else if (countOne === 2) {
            countSingleDeckShipsComputer.innerHTML = '2';
         } else if (countOne === 3) {
            countSingleDeckShipsComputer.innerHTML = '3';
         }

         if (countTwo === 2) {
            countDoubleDeckShipsComputer.innerHTML = '1';
         } else if (countTwo === 4) {
            countDoubleDeckShipsComputer.innerHTML = '2';
         }

         if (countThree === 3) {
            countThreeDeckShipsComputer.innerHTML = '1';
         }
      }

      function drawShip(x, y, shipType, orientation) {
         const x2 = x + 1,
            x3 = x + 2,
            y2 = y + 1,
            y3 = y + 2;

         if (shipType === 1) {
            computerCellsMap[y][x] = "ship1";
            computerMapDivs[y][x].classList.add('activeOneDeckComputerShip');

            shipTypeComputer.shipTypeOne.push('ship');

            drawNumberShipsComputer();
            startGame();

         } else if (shipType === 2 && orientation === 'h') {
            computerCellsMap[y][x] = "ship2";
            computerCellsMap[y][x2] = "ship2";

            computerMapDivs[y][x].classList.add('activeTwoDeckComputerShip');
            computerMapDivs[y][x2].classList.add('activeTwoDeckComputerShip');

            shipTypeComputer.shipTypeTwo.push('ship');

            drawNumberShipsComputer();
            startGame();

         } else if (shipType === 3 && orientation === 'h') {
            computerCellsMap[y][x] = "ship3";
            computerCellsMap[y][x2] = "ship3";
            computerCellsMap[y][x3] = "ship3";

            computerMapDivs[y][x].classList.add('activeThreeDeckComputerShip');
            computerMapDivs[y][x2].classList.add('activeThreeDeckComputerShip');
            computerMapDivs[y][x3].classList.add('activeThreeDeckComputerShip');

            shipTypeComputer.shipTypeThree.push('ship');

            drawNumberShipsComputer();
            startGame();

         } else if (shipType === 2 && orientation === 'v') {
            computerCellsMap[y][x] = "ship2";
            computerCellsMap[y2][x] = "ship2";

            computerMapDivs[y][x].classList.add('activeTwoDeckComputerShip');
            computerMapDivs[y2][x].classList.add('activeTwoDeckComputerShip');

            computerMapDivs[y][x].classList.add('vertical');
            computerMapDivs[y2][x].classList.add('vertical');

            shipTypeComputer.shipTypeTwo.push('ship');

            drawNumberShipsComputer();
            startGame();

         } else if (shipType === 3 && orientation === 'v') {
            computerCellsMap[y][x] = "ship3";
            computerCellsMap[y2][x] = "ship3";
            computerCellsMap[y3][x] = "ship3";

            computerMapDivs[y][x].classList.add('activeThreeDeckComputerShip');
            computerMapDivs[y2][x].classList.add('activeThreeDeckComputerShip');
            computerMapDivs[y3][x].classList.add('activeThreeDeckComputerShip');

            computerMapDivs[y][x].classList.add('vertical');
            computerMapDivs[y2][x].classList.add('vertical');
            computerMapDivs[y3][x].classList.add('vertical');

            shipTypeComputer.shipTypeThree.push('ship');

            drawNumberShipsComputer();
            startGame();
         }
      }

      function getRandomShip() {
         computerState.randomShip = arrayComputerCells[Math.floor(Math.random() * arrayComputerCells.length)];
      }

      function getRandomOrientationShip() {
         computerState.randomOrientation = orientationEnum[Math.floor(Math.random() * orientationEnum.length)];
      }

      function placeShipToMap(rawX, y, shipType, orientation = "h") {
         const x = rawX - 1;

         // Горизонтальное положение

         if (orientation === orientationEnum[0]) {
            if (shipType === 1) {
               if (computerCellsMap[y][x] !== null) {
                  return;

               } else if (y > 1 && y < 6 && x > 0 && x < 5) {
                  if
                     (
                     computerCellsMap[y - 1][x - 1] === null &&
                     computerCellsMap[y - 1][x] === null &&
                     computerCellsMap[y - 1][x + 1] === null &&
                     computerCellsMap[y][x + 1] === null &&
                     computerCellsMap[y + 1][x + 1] === null &&
                     computerCellsMap[y + 1][x] === null &&
                     computerCellsMap[y + 1][x - 1] === null &&
                     computerCellsMap[y][x - 1] === null
                  ) {
                     drawShip(x, y, 1);
                  } else {
                     restartRandom();
                  }

               } else if (y === 1 && x === 0) {
                  if
                     (
                     computerCellsMap[y][x + 1] === null &&
                     computerCellsMap[y + 1][x + 1] === null &&
                     computerCellsMap[y + 1][x] === null
                  ) {
                     drawShip(x, y, 1);
                  } else {
                     restartRandom();
                  }

               } else if (y === 1 && x > 0 && x < 5) {
                  if
                     (
                     computerCellsMap[y][x + 1] === null &&
                     computerCellsMap[y + 1][x + 1] === null &&
                     computerCellsMap[y + 1][x] === null &&
                     computerCellsMap[y + 1][x - 1] === null &&
                     computerCellsMap[y][x - 1] === null
                  ) {
                     drawShip(x, y, 1);
                  } else {
                     restartRandom();
                  }

               } else if (y === 1 && x === 5) {
                  if
                     (
                     computerCellsMap[y + 1][x] === null &&
                     computerCellsMap[y + 1][x - 1] === null &&
                     computerCellsMap[y][x - 1] === null
                  ) {
                     drawShip(x, y, 1);
                  } else {
                     restartRandom();
                  }

               } else if (y > 1 && y < 6 && x === 5) {
                  if
                     (
                     computerCellsMap[y + 1][x] === null &&
                     computerCellsMap[y + 1][x - 1] === null &&
                     computerCellsMap[y][x - 1] === null &&
                     computerCellsMap[y - 1][x - 1] === null &&
                     computerCellsMap[y - 1][x] === null
                  ) {
                     drawShip(x, y, 1);
                  } else {
                     restartRandom();
                  }

               } else if (y === 6 && x === 5) {
                  if
                     (
                     computerCellsMap[y][x - 1] === null &&
                     computerCellsMap[y - 1][x - 1] === null &&
                     computerCellsMap[y - 1][x] === null
                  ) {
                     drawShip(x, y, 1);
                  } else {
                     restartRandom();
                  }

               } else if (y === 6 && x > 0 && x < 5) {
                  if
                     (
                     computerCellsMap[y][x - 1] === null &&
                     computerCellsMap[y - 1][x - 1] === null &&
                     computerCellsMap[y - 1][x] === null &&
                     computerCellsMap[y - 1][x + 1] === null &&
                     computerCellsMap[y][x + 1] === null
                  ) {
                     drawShip(x, y, 1);
                  } else {
                     restartRandom();
                  }

               } else if (y === 6 && x === 0) {
                  if
                     (
                     computerCellsMap[y - 1][x] === null &&
                     computerCellsMap[y - 1][x + 1] === null &&
                     computerCellsMap[y][x + 1] === null
                  ) {
                     drawShip(x, y, 1);
                  } else {
                     restartRandom();
                  }

               } else if (y > 1 && y < 6 && x === 0) {
                  if
                     (
                     computerCellsMap[y - 1][x] === null &&
                     computerCellsMap[y - 1][x + 1] === null &&
                     computerCellsMap[y][x + 1] === null &&
                     computerCellsMap[y + 1][x + 1] === null &&
                     computerCellsMap[y + 1][x] === null
                  ) {
                     drawShip(x, y, 1);
                  } else {
                     restartRandom();
                  }

               } else {
                  restartRandom();
               }
            }

            if (shipType === 2) {
               if (computerCellsMap[y][x] !== null || computerCellsMap[y][x + 1] !== null) {
                  restartRandom();
               } else if (y > 1 && y < 6 && x > 0 && x < 4) {
                  if
                     (
                     computerCellsMap[y - 1][x - 1] === null &&
                     computerCellsMap[y - 1][x] === null &&
                     computerCellsMap[y - 1][x + 1] === null &&
                     computerCellsMap[y - 1][x + 2] === null &&
                     computerCellsMap[y][x + 2] === null &&
                     computerCellsMap[y + 1][x + 2] === null &&
                     computerCellsMap[y + 1][x + 1] === null &&
                     computerCellsMap[y + 1][x] === null &&
                     computerCellsMap[y + 1][x - 1] === null &&
                     computerCellsMap[y][x - 1] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  } else {
                     restartRandom();
                  }

               } else if (y === 1 && x === 0) {
                  if
                     (
                     computerCellsMap[y][x + 2] === null &&
                     computerCellsMap[y + 1][x + 2] === null &&
                     computerCellsMap[y + 1][x + 1] === null &&
                     computerCellsMap[y + 1][x] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  } else {
                     restartRandom();
                  }

               } else if (y === 1 && x > 0 && x < 4) {
                  if
                     (
                     computerCellsMap[y][x + 2] === null &&
                     computerCellsMap[y + 1][x + 2] === null &&
                     computerCellsMap[y + 1][x + 1] === null &&
                     computerCellsMap[y + 1][x] === null &&
                     computerCellsMap[y + 1][x - 1] === null &&
                     computerCellsMap[y][x - 1] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  } else {
                     restartRandom();
                  }

               } else if (y === 1 && x === 4) {
                  if
                     (
                     computerCellsMap[y + 1][x + 1] === null &&
                     computerCellsMap[y + 1][x] === null &&
                     computerCellsMap[y + 1][x - 1] === null &&
                     computerCellsMap[y][x - 1] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  } else {
                     restartRandom();
                  }

               } else if (y > 1 && y < 6 && x === 0) {
                  if
                     (
                     computerCellsMap[y - 1][x] === null &&
                     computerCellsMap[y - 1][x + 1] === null &&
                     computerCellsMap[y - 1][x + 2] === null &&
                     computerCellsMap[y][x + 2] === null &&
                     computerCellsMap[y + 1][x + 2] === null &&
                     computerCellsMap[y + 1][x + 1] === null &&
                     computerCellsMap[y + 1][x] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  } else {
                     restartRandom();
                  }

               } else if (y > 1 && y < 6 && x === 4) {
                  if
                     (
                     computerCellsMap[y + 1][x + 1] === null &&
                     computerCellsMap[y + 1][x] === null &&
                     computerCellsMap[y + 1][x - 1] === null &&
                     computerCellsMap[y][x - 1] === null &&
                     computerCellsMap[y - 1][x - 1] === null &&
                     computerCellsMap[y - 1][x] === null &&
                     computerCellsMap[y - 1][x + 1] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  } else {
                     restartRandom();
                  }

               } else if (y === 6 && x === 4) {
                  if
                     (
                     computerCellsMap[y][x - 1] === null &&
                     computerCellsMap[y - 1][x - 1] === null &&
                     computerCellsMap[y - 1][x] === null &&
                     computerCellsMap[y - 1][x + 1] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  } else {
                     restartRandom();
                  }

               } else if (y === 6 && x > 0 && x < 4) {
                  if
                     (
                     computerCellsMap[y][x - 1] === null &&
                     computerCellsMap[y - 1][x - 1] === null &&
                     computerCellsMap[y - 1][x] === null &&
                     computerCellsMap[y - 1][x + 1] === null &&
                     computerCellsMap[y - 1][x + 2] === null &&
                     computerCellsMap[y][x + 2] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  } else {
                     restartRandom();
                  }

               } else if (y === 6 && x === 0) {
                  if
                     (
                     computerCellsMap[y - 1][x] === null &&
                     computerCellsMap[y - 1][x + 1] === null &&
                     computerCellsMap[y - 1][x + 2] === null &&
                     computerCellsMap[y][x + 2] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  } else {
                     restartRandom();
                  }

               } else {
                  restartRandom();
               }
            }

            if (shipType === 3) {
               if (computerCellsMap[y][x] !== null || computerCellsMap[y][x + 1] !== null || computerCellsMap[y][x + 2] !== null) {
                  restartRandom();
               } else if (y > 1 && y < 6 && x > 0 && x < 3) {
                  if
                     (
                     computerCellsMap[y - 1][x - 1] === null &&
                     computerCellsMap[y - 1][x] === null &&
                     computerCellsMap[y - 1][x + 1] === null &&
                     computerCellsMap[y - 1][x + 2] === null &&
                     computerCellsMap[y - 1][x + 3] === null &&
                     computerCellsMap[y][x + 3] === null &&
                     computerCellsMap[y + 1][x + 3] === null &&
                     computerCellsMap[y + 1][x + 2] === null &&
                     computerCellsMap[y + 1][x + 1] === null &&
                     computerCellsMap[y + 1][x] === null &&
                     computerCellsMap[y + 1][x - 1] === null &&
                     computerCellsMap[y][x - 1] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  } else {
                     restartRandom();
                  }

               } else if (y === 1 && x === 0) {
                  if
                     (
                     computerCellsMap[y][x + 3] === null &&
                     computerCellsMap[y + 1][x + 3] === null &&
                     computerCellsMap[y + 1][x + 2] === null &&
                     computerCellsMap[y + 1][x + 1] === null &&
                     computerCellsMap[y + 1][x] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  } else {
                     restartRandom();
                  }

               } else if (y === 1 && x > 0 && x < 3) {
                  if
                     (
                     computerCellsMap[y][x + 3] === null &&
                     computerCellsMap[y + 1][x + 3] === null &&
                     computerCellsMap[y + 1][x + 2] === null &&
                     computerCellsMap[y + 1][x + 1] === null &&
                     computerCellsMap[y + 1][x] === null &&
                     computerCellsMap[y + 1][x - 1] === null &&
                     computerCellsMap[y][x - 1] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  } else {
                     restartRandom();
                  }

               } else if (y > 1 && y < 6 && x === 3) {
                  if
                     (
                     computerCellsMap[y + 1][x + 2] === null &&
                     computerCellsMap[y + 1][x + 1] === null &&
                     computerCellsMap[y + 1][x] === null &&
                     computerCellsMap[y + 1][x - 1] === null &&
                     computerCellsMap[y][x - 1] === null &&
                     computerCellsMap[y - 1][x - 1] === null &&
                     computerCellsMap[y - 1][x] === null &&
                     computerCellsMap[y - 1][x + 1] === null &&
                     computerCellsMap[y - 1][x + 2] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  } else {
                     restartRandom();
                  }

               } else if (y === 1 && x === 3) {
                  if
                     (
                     computerCellsMap[y + 1][x + 2] === null &&
                     computerCellsMap[y + 1][x + 1] === null &&
                     computerCellsMap[y + 1][x] === null &&
                     computerCellsMap[y + 1][x - 1] === null &&
                     computerCellsMap[y][x - 1] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  } else {
                     restartRandom();
                  }

               } else if (y === 6 && x === 3) {
                  if
                     (
                     computerCellsMap[y][x - 1] === null &&
                     computerCellsMap[y - 1][x - 1] === null &&
                     computerCellsMap[y - 1][x] === null &&
                     computerCellsMap[y - 1][x + 1] === null &&
                     computerCellsMap[y - 1][x + 2] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  } else {
                     restartRandom();
                  }

               } else if (y === 6 && x > 0 && x < 3) {
                  if
                     (
                     computerCellsMap[y][x - 1] === null &&
                     computerCellsMap[y - 1][x - 1] === null &&
                     computerCellsMap[y - 1][x] === null &&
                     computerCellsMap[y - 1][x + 1] === null &&
                     computerCellsMap[y - 1][x + 2] === null &&
                     computerCellsMap[y - 1][x + 3] === null &&
                     computerCellsMap[y][x + 3] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  } else {
                     restartRandom();
                  }

               } else if (y === 6 && x === 0) {
                  if
                     (
                     computerCellsMap[y - 1][x] === null &&
                     computerCellsMap[y - 1][x + 1] === null &&
                     computerCellsMap[y - 1][x + 2] === null &&
                     computerCellsMap[y - 1][x + 3] === null &&
                     computerCellsMap[y][x + 3] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  } else {
                     restartRandom();
                  }

               } else if (y > 0 && y < 6 && x === 0) {
                  if
                     (
                     computerCellsMap[y + 1][x] === null &&
                     computerCellsMap[y + 1][x + 1] === null &&
                     computerCellsMap[y + 1][x + 2] === null &&
                     computerCellsMap[y + 1][x + 3] === null &&
                     computerCellsMap[y][x + 3] === null &&
                     computerCellsMap[y - 1][x + 3] === null &&
                     computerCellsMap[y - 1][x + 2] === null &&
                     computerCellsMap[y - 1][x + 1] === null &&
                     computerCellsMap[y - 1][x] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  } else {
                     restartRandom();
                  }

               } else {
                  restartRandom();
               }
            }
         }

         // Вертикальное положение

         if (orientation === orientationEnum[1]) {
            if (shipType === 2) {
               if (y < 6) {
                  if (computerCellsMap[y][x] !== null || computerCellsMap[y + 1][x] !== null) {
                     restartRandom();

                  } else if (y > 1 && y < 5 && x > 0 && x < 5) {
                     if
                        (
                        computerCellsMap[y - 1][x - 1] === null &&
                        computerCellsMap[y - 1][x] === null &&
                        computerCellsMap[y - 1][x + 1] === null &&
                        computerCellsMap[y][x + 1] === null &&
                        computerCellsMap[y + 1][x + 1] === null &&
                        computerCellsMap[y + 2][x + 1] === null &&
                        computerCellsMap[y + 2][x] === null &&
                        computerCellsMap[y + 2][x - 1] === null &&
                        computerCellsMap[y + 1][x - 1] === null &&
                        computerCellsMap[y][x - 1] === null
                     ) {
                        drawShip(x, y, 2, orientation);
                     } else {
                        restartRandom();
                     }

                  } else if (y === 1 && x === 0) {
                     if
                        (
                        computerCellsMap[y][x + 1] === null &&
                        computerCellsMap[y + 1][x + 1] === null &&
                        computerCellsMap[y + 2][x + 1] === null &&
                        computerCellsMap[y + 2][x] === null
                     ) {
                        drawShip(x, y, 2, orientation);
                     } else {
                        restartRandom();
                     }

                  } else if (y === 1 && x > 0 && x < 5) {
                     if
                        (
                        computerCellsMap[y][x + 1] === null &&
                        computerCellsMap[y + 1][x + 1] === null &&
                        computerCellsMap[y + 2][x + 1] === null &&
                        computerCellsMap[y + 2][x] === null &&
                        computerCellsMap[y + 2][x - 1] === null &&
                        computerCellsMap[y + 1][x - 1] === null &&
                        computerCellsMap[y][x - 1] === null
                     ) {
                        drawShip(x, y, 2, orientation);
                     } else {
                        restartRandom();
                     }

                  } else if (y === 1 && x === 5) {
                     if
                        (
                        computerCellsMap[y][x - 1] === null &&
                        computerCellsMap[y + 1][x - 1] === null &&
                        computerCellsMap[y + 2][x - 1] === null &&
                        computerCellsMap[y + 2][x] === null
                     ) {
                        drawShip(x, y, 2, orientation);
                     } else {
                        restartRandom();
                     }

                  } else if (y > 1 && y < 5 && x === 5) {
                     if
                        (
                        computerCellsMap[y + 2][x] === null &&
                        computerCellsMap[y + 2][x - 1] === null &&
                        computerCellsMap[y + 1][x - 1] === null &&
                        computerCellsMap[y][x - 1] === null &&
                        computerCellsMap[y - 1][x - 1] === null &&
                        computerCellsMap[y - 1][x] === null
                     ) {
                        drawShip(x, y, 2, orientation);
                     } else {
                        restartRandom();
                     }

                  } else if (y === 5 && x === 5) {
                     if
                        (
                        computerCellsMap[y + 1][x - 1] === null &&
                        computerCellsMap[y][x - 1] === null &&
                        computerCellsMap[y - 1][x - 1] === null &&
                        computerCellsMap[y - 1][x] === null
                     ) {
                        drawShip(x, y, 2, orientation);
                     } else {
                        restartRandom();
                     }

                  } else if (y === 5 && x > 0 && x < 5) {
                     if
                        (
                        computerCellsMap[y + 1][x - 1] === null &&
                        computerCellsMap[y][x - 1] === null &&
                        computerCellsMap[y - 1][x - 1] === null &&
                        computerCellsMap[y - 1][x] === null &&
                        computerCellsMap[y - 1][x + 1] === null &&
                        computerCellsMap[y][x + 1] === null &&
                        computerCellsMap[y + 1][x + 1] === null
                     ) {
                        drawShip(x, y, 2, orientation);
                     } else {
                        restartRandom();
                     }

                  } else if (y === 5 && x === 0) {
                     if
                        (
                        computerCellsMap[y - 1][x] === null &&
                        computerCellsMap[y - 1][x + 1] === null &&
                        computerCellsMap[y][x + 1] === null &&
                        computerCellsMap[y + 1][x + 1] === null
                     ) {
                        drawShip(x, y, 2, orientation);
                     } else {
                        restartRandom();
                     }

                  } else if (y > 1 && y < 5 && x === 0) {
                     if
                        (
                        computerCellsMap[y - 1][x] === null &&
                        computerCellsMap[y - 1][x + 1] === null &&
                        computerCellsMap[y][x + 1] === null &&
                        computerCellsMap[y + 1][x + 1] === null &&
                        computerCellsMap[y + 2][x + 1] === null &&
                        computerCellsMap[y + 2][x] === null
                     ) {
                        drawShip(x, y, 2, orientation);
                     } else {
                        restartRandom();
                     }

                  } else {

                     restartRandom();
                  }

               } else {
                  restartRandom();
               }
            }

            if (shipType === 3) {
               if (y < 5) {
                  if (computerCellsMap[y][x] !== null || computerCellsMap[y + 1][x] !== null || computerCellsMap[y + 2][x] !== null) {
                     restartRandom();
                  } else if (y > 1 && y < 4 && x > 0 && x < 5) {
                     if
                        (
                        computerCellsMap[y - 1][x - 1] === null &&
                        computerCellsMap[y - 1][x] === null &&
                        computerCellsMap[y - 1][x + 1] === null &&
                        computerCellsMap[y][x + 1] === null &&
                        computerCellsMap[y + 1][x + 1] === null &&
                        computerCellsMap[y + 2][x + 1] === null &&
                        computerCellsMap[y + 3][x + 1] === null &&
                        computerCellsMap[y + 3][x] === null &&
                        computerCellsMap[y + 3][x - 1] === null &&
                        computerCellsMap[y + 2][x - 1] === null &&
                        computerCellsMap[y + 1][x - 1] === null &&
                        computerCellsMap[y][x - 1] === null
                     ) {
                        drawShip(x, y, 3, orientation);
                     } else {
                        restartRandom();
                     }

                  } else if (y === 1 && x === 0) {
                     if
                        (
                        computerCellsMap[y][x + 1] === null &&
                        computerCellsMap[y + 1][x + 1] === null &&
                        computerCellsMap[y + 2][x + 1] === null &&
                        computerCellsMap[y + 3][x + 1] === null &&
                        computerCellsMap[y + 3][x] === null
                     ) {
                        drawShip(x, y, 3, orientation);
                     } else {
                        restartRandom();
                     }

                  } else if (y === 1 && x > 0 && x < 5) {
                     if
                        (
                        computerCellsMap[y][x + 1] === null &&
                        computerCellsMap[y + 1][x + 1] === null &&
                        computerCellsMap[y + 2][x + 1] === null &&
                        computerCellsMap[y + 3][x + 1] === null &&
                        computerCellsMap[y + 3][x] === null &&
                        computerCellsMap[y + 3][x - 1] === null &&
                        computerCellsMap[y + 2][x - 1] === null &&
                        computerCellsMap[y + 1][x - 1] === null &&
                        computerCellsMap[y][x - 1] === null
                     ) {
                        drawShip(x, y, 3, orientation);
                     } else {
                        restartRandom();
                     }

                  } else if (y === 1 && x === 5) {
                     if
                        (
                        computerCellsMap[y + 3][x] === null &&
                        computerCellsMap[y + 3][x - 1] === null &&
                        computerCellsMap[y + 2][x - 1] === null &&
                        computerCellsMap[y + 1][x - 1] === null &&
                        computerCellsMap[y][x - 1] === null
                     ) {
                        drawShip(x, y, 3, orientation);
                     } else {
                        restartRandom();
                     }

                  } else if (y > 1 && y < 4 && x === 5) {
                     if
                        (
                        computerCellsMap[y + 3][x] === null &&
                        computerCellsMap[y + 3][x - 1] === null &&
                        computerCellsMap[y + 2][x - 1] === null &&
                        computerCellsMap[y + 1][x - 1] === null &&
                        computerCellsMap[y][x - 1] === null &&
                        computerCellsMap[y - 1][x - 1] === null &&
                        computerCellsMap[y - 1][x] === null
                     ) {
                        drawShip(x, y, 3, orientation);
                     } else {
                        restartRandom();
                     }

                  } else if (y === 4 && x === 5) {
                     if
                        (
                        computerCellsMap[y + 2][x - 1] === null &&
                        computerCellsMap[y + 1][x - 1] === null &&
                        computerCellsMap[y][x - 1] === null &&
                        computerCellsMap[y - 1][x - 1] === null &&
                        computerCellsMap[y - 1][x] === null
                     ) {
                        drawShip(x, y, 3, orientation);
                     } else {
                        restartRandom();
                     }

                  } else if (y === 4 && x > 0 && x < 5) {
                     if
                        (
                        computerCellsMap[y + 2][x - 1] === null &&
                        computerCellsMap[y + 1][x - 1] === null &&
                        computerCellsMap[y][x - 1] === null &&
                        computerCellsMap[y - 1][x - 1] === null &&
                        computerCellsMap[y - 1][x] === null &&
                        computerCellsMap[y - 1][x + 1] === null &&
                        computerCellsMap[y][x + 1] === null &&
                        computerCellsMap[y + 1][x + 1] === null &&
                        computerCellsMap[y + 2][x + 1] === null
                     ) {
                        drawShip(x, y, 3, orientation);
                     } else {
                        restartRandom();
                     }

                  } else if (y === 4 && x === 0) {
                     if
                        (
                        computerCellsMap[y - 1][x] === null &&
                        computerCellsMap[y - 1][x + 1] === null &&
                        computerCellsMap[y][x + 1] === null &&
                        computerCellsMap[y + 1][x + 1] === null &&
                        computerCellsMap[y + 2][x + 1] === null
                     ) {
                        drawShip(x, y, 3, orientation);
                     } else {
                        restartRandom();
                     }

                  } else if (y > 1 && y < 4 && x === 0) {
                     if
                        (
                        computerCellsMap[y - 1][x] === null &&
                        computerCellsMap[y - 1][x + 1] === null &&
                        computerCellsMap[y][x + 1] === null &&
                        computerCellsMap[y + 1][x + 1] === null &&
                        computerCellsMap[y + 2][x + 1] === null &&
                        computerCellsMap[y + 3][x + 1] === null &&
                        computerCellsMap[y + 3][x] === null
                     ) {
                        drawShip(x, y, 3, orientation);
                     } else {
                        restartRandom();
                     }

                  } else {

                     restartRandom();
                  }

               } else {
                  restartRandom();
               }
            }

         }
      }

      function restartRandom() {
         if (computerState.counterFailedAttempt === 30) {
            computerState.counterFailedAttempt = 0;

            shipTypeComputer.shipTypeOne = [];
            shipTypeComputer.shipTypeTwo = [];
            shipTypeComputer.shipTypeThree = [];

            for (let key in computerCellsMap) {
               if (Array.isArray(computerCellsMap[key])) {
                  computerCellsMap[key].forEach((element, index) => {
                     if (element === 'ship1' || element === 'ship2' || element === 'ship3') {
                        computerCellsMap[key][index] = null;
                     }
                  })
               }
            }

            arrayComputerCells.forEach(element => {
               if (element.classList.contains('activeOneDeckComputerShip')) {
                  element.classList.remove('activeOneDeckComputerShip');
               } else if (element.classList.contains('activeTwoDeckComputerShip')) {
                  element.classList.remove('activeTwoDeckComputerShip');
               } else if (element.classList.contains('activeThreeDeckComputerShip')) {
                  element.classList.remove('activeThreeDeckComputerShip');
               }
            })
            startGame();

         } else {
            computerState.counterFailedAttempt++
            startGame();
         }
      }

      function startGame() {
         getRandomShip();

         getRandomOrientationShip();

         if (
            computerState.randomShip.classList.contains('activeOneDeckComputerShip') ||
            computerState.randomShip.classList.contains('activeTwoDeckComputerShip') ||
            computerState.randomShip.classList.contains('activeThreeDeckComputerShip')
         ) {
            startGame();
         } else {
            const coordinates = computerState.randomShip.id.split("-"),
               y = Number(coordinates[1]),
               x = Number(coordinates[2]);

            if (shipTypeComputer.shipTypeThree.length < 1) {
               placeShipToMap(x, y, 3, computerState.randomOrientation);
            } else if (shipTypeComputer.shipTypeTwo.length < 2) {
               placeShipToMap(x, y, 2, computerState.randomOrientation);
            } else if (shipTypeComputer.shipTypeOne.length < 3) {
               placeShipToMap(x, y, 1);
            } else {
               return;
            }
         }

      }

      startGame();
   }
}
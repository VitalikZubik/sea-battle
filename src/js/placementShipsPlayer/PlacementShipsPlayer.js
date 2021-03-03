import store from '../store/store';
import {
   oneDeckShip, twoDeckShip, threeDeckShip, scoreShipsOneDeck,
   scoreShipsTwoDeck, scoreShipsThreeDeck, buttonStartGame, countSingleDeckShipsPlayer,
   countDoubleDeckShipsPlayer, countThreeDeckShipsPlayer, playerGameCells
} from '../store/store';

export const PlacementShipsUser = {
   init: () => {
      const { arrayPlayerCells, playerState, orientationEnum} = store.getGameState();

      const playerMapDivs = {
         1: arrayPlayerCells.slice(0, 6),
         2: arrayPlayerCells.slice(6, 12),
         3: arrayPlayerCells.slice(12, 18),
         4: arrayPlayerCells.slice(18, 24),
         5: arrayPlayerCells.slice(24, 30),
         6: arrayPlayerCells.slice(30, 36)
      };
      
      const playerCellsMap = store.getCopyEmptyCellsMap();
      
      // drawNumberShipsUser - отрисовка количества выставленных кораблей на поле игрока.
      function drawNumberShipsUser() {
         let countOne = 0,
            countTwo = 0,
            countThree = 0;

         arrayPlayerCells.forEach((cell) => {
            if (cell.classList.contains('activeOneDeckShip')) {
               countOne++;

            } else if (cell.classList.contains('activeTwoDeckShip')) {
               countTwo++;

            } else if (cell.classList.contains('activeThreeDeckShip')) {
               countThree++;
            }
         });

         if (countOne === 1) {
            countSingleDeckShipsPlayer.innerHTML = '1';
         } else if (countOne === 2) {
            countSingleDeckShipsPlayer.innerHTML = '2';
         } else if (countOne === 3) {
            countSingleDeckShipsPlayer.innerHTML = '3';
         }

         if (countTwo === 2) {
            countDoubleDeckShipsPlayer.innerHTML = '1';
         } else if (countTwo === 4) {
            countDoubleDeckShipsPlayer.innerHTML = '2';
         }

         if (countThree === 3) {
            countThreeDeckShipsPlayer.innerHTML = '1';
         }
      }

      // disabledButtonStartGame - выключение и включение активности кнопки "Начать игру".
      const disabledButtonStartGame = () => {
         if (
            playerState.scoreOneShip === 3 &&
            playerState.scoreTwoShip === 4 &&
            playerState.scoreThreeShip === 3
         ) {
            buttonStartGame.disabled = false;
            buttonStartGame.style.cursor = "pointer";

         } else {
            buttonStartGame.disabled = true;
            buttonStartGame.style.cursor = "not-allowed";
         }
      };

      // getCoordinates - получение координат ячейки для выставления кораблей.
      function getCoordinates(event) {
         const coordinates = event.target.id.split("-"),
            y = Number(coordinates[1]),
            x = Number(coordinates[2]),
            shipType = Number(playerState.typeShip);

         if (shipType === 1 && playerState.scoreOneShip === 2) {
            oneDeckShip.classList.remove("targetShip");

            playerGameCells.forEach(ship => {
               ship.removeEventListener('click', getCoordinates);
            });

         } else if (shipType === 2 && playerState.scoreTwoShip === 2) {
            twoDeckShip.classList.remove("targetShip");

            playerGameCells.forEach(ship => {
               ship.removeEventListener('click', getCoordinates);
            });


         } else if (shipType === 3 && playerState.scoreThreeShip === 0) {
            threeDeckShip.classList.remove("targetShip");

            playerGameCells.forEach(ship => {
               ship.removeEventListener('click', getCoordinates);
            });
         }

         placeShipToMap(x, y, shipType);
      }

      oneDeckShip.addEventListener('click', (event) => {
         if (playerState.scoreOneShip === 3) {
            oneDeckShip.removeEventListener('click');
         }

         playerState.typeShip = event.target.id;

         oneDeckShip.classList.add("targetShip");

         playerGameCells.forEach(ship => {
            ship.addEventListener('click', getCoordinates);
         });
      });

      twoDeckShip.addEventListener('click', (event) => {
         if (playerState.scoreTwoShip === 4) {
            twoDeckShip.removeEventListener('click',);
         }

         playerState.typeShip = event.target.parentNode.id;

         twoDeckShip.classList.add("targetShip");

         playerGameCells.forEach(ship => {
            ship.addEventListener('click', getCoordinates);
         });
      });

      threeDeckShip.addEventListener('click', (event) => {
         if (playerState.scoreThreeShip === 3) {
            threeDeckShip.removeEventListener('click',);
         }

         playerState.typeShip = event.target.parentNode.id;

         threeDeckShip.classList.add("targetShip");

         playerGameCells.forEach(ship => {
            ship.addEventListener('click', getCoordinates);
         });

      });

      /* setOrientationTwoDeckShip -
         setOrientationThreeDeckShip -
         changeOrientationTwoDeckShipOne ---> функции для смены ориентации 2 и 3 палубных кораблей,
         changeOrientationTwoDeckShipTwo -             из горизонтального положения в вертикальное
         changeOrientationThreeDeckShipOne -
         changeOrientationThreeDeckShipThree -
         reverseChangeOrientationTwoDeckShipOne - 
         reverseChangeOrientationTwoDeckShipTwo - 
      */
      function setOrientationTwoDeckShip(y, x, x2) {
         playerCellsMap[y][x] = null;
         playerCellsMap[y][x2] = null;

         playerMapDivs[y][x].classList.remove('activeTwoDeckShip');
         playerMapDivs[y][x2].classList.remove('activeTwoDeckShip');

         playerMapDivs[y][x].removeEventListener('click', changeOrientationTwoDeckShipOne);
         playerMapDivs[y][x2].removeEventListener('click', changeOrientationTwoDeckShipTwo);
      }

      function reverseChangeOrientationTwoDeckShipOne(event) {
         const coordinates = event.target.id.split("-"),
            y = Number(coordinates[1]),
            x = Number(coordinates[2]) - 1;

         playerCellsMap[y][x] = null;
         playerCellsMap[y + 1][x] = null;

         playerMapDivs[y][x].classList.remove('activeTwoDeckShip', 'vertical');
         playerMapDivs[y + 1][x].classList.remove('activeTwoDeckShip', 'vertical');

         playerMapDivs[y][x].removeEventListener('click', reverseChangeOrientationTwoDeckShipOne);

         placeShipToMap(x + 1, y, 2);
      }

      function reverseChangeOrientationTwoDeckShipTwo(event) {
         const coordinates = event.target.id.split("-"),
            y = Number(coordinates[1]),
            x = Number(coordinates[2]) - 1;

         playerCellsMap[y][x] = null;
         playerCellsMap[y + 1][x] = null;

         playerMapDivs[y][x].classList.remove('activeTwoDeckShip', 'vertical');
         playerMapDivs[y + 1][x].classList.remove('activeTwoDeckShip', 'vertical');

         playerMapDivs[y][x].removeEventListener('click', reverseChangeOrientationTwoDeckShipTwo);

         playerCellsMap[y][x - 1] = "ship2";
         playerCellsMap[y][x] = "ship2";

         playerMapDivs[y][x - 1].classList.add('activeTwoDeckShip');
         playerMapDivs[y][x].classList.add('activeTwoDeckShip');

         playerMapDivs[y][x - 1].classList.add('changeableOrientationTwoDeckShipOne');
         playerMapDivs[y][x].classList.add('changeableOrientationTwoDeckShipTwo');

         playerMapDivs[y][x - 1].addEventListener('click', changeOrientationTwoDeckShipOne);

         playerMapDivs[y][x].addEventListener('click', changeOrientationTwoDeckShipTwo);
      }

      function setOrientationThreeDeckShip(y, x, x2, x3) {
         playerCellsMap[y][x] = null;
         playerCellsMap[y][x2] = null;
         playerCellsMap[y][x3] = null;

         playerMapDivs[y][x].classList.remove('activeThreeDeckShip');
         playerMapDivs[y][x2].classList.remove('activeThreeDeckShip');
         playerMapDivs[y][x3].classList.remove('activeThreeDeckShip');

         playerMapDivs[y][x].removeEventListener('click', changeOrientationThreeDeckShipOne);
         playerMapDivs[y][x3].removeEventListener('click', changeOrientationThreeDeckShipThree);
      }

      const changeOrientationTwoDeckShipOne = (event) => {
         const coordinates = event.target.id.split("-"),
            y = Number(coordinates[1]),
            x = Number(coordinates[2]) - 1,
            x2 = x + 1;

         if (
            y === 5 &&
            x < 5 &&
            playerCellsMap[y + 1][x] === null &&
            playerCellsMap[y + 1][x2] === null
         ) {
            setOrientationTwoDeckShip(y, x, x2);

            placeShipToMap(x + 1, y, 2, orientationEnum[1]);

         } else if (
            y < 6 &&
            x > 0 &&
            playerCellsMap[y + 1][x] === null &&
            playerCellsMap[y + 2][x] === null &&
            playerCellsMap[y + 2][x2] === null &&
            playerCellsMap[y + 2][x - 1] === null
         ) {
            setOrientationTwoDeckShip(y, x, x2);

            placeShipToMap(x + 1, y, 2, orientationEnum[1]);

         } else if (
            y < 6 &&
            x === 0 &&
            playerCellsMap[y + 1][x] === null &&
            playerCellsMap[y + 2][x] === null &&
            playerCellsMap[y + 2][x2] === null
         ) {
            setOrientationTwoDeckShip(y, x, x2);

            placeShipToMap(x + 1, y, 2, orientationEnum[1]);

         } else {
            playerMapDivs[y][x].removeEventListener('click', changeOrientationTwoDeckShipOne);
         }

      };

      const changeOrientationTwoDeckShipTwo = (event) => {
         const coordinates = event.target.id.split("-"),
            y = Number(coordinates[1]),
            x = Number(coordinates[2]) - 2,
            x2 = x + 1,
            x3 = x + 2;

         if (
            y === 5 &&
            x2 > 0 &&
            playerCellsMap[y + 1][x2] === null &&
            playerCellsMap[y + 1][x] === null
         ) {
            setOrientationTwoDeckShip(y, x, x2);

            placeShipToMap(x + 2, y, 2, orientationEnum[1]);

         } else if (
            y < 6 &&
            x2 < 5 &&
            playerCellsMap[y + 1][x2] === null &&
            playerCellsMap[y + 2][x2] === null &&
            playerCellsMap[y + 2][x] === null &&
            playerCellsMap[y + 2][x3] === null
         ) {
            setOrientationTwoDeckShip(y, x, x2);

            placeShipToMap(x + 2, y, 2, orientationEnum[1]);

         } else if (
            y < 6 &&
            x2 === 5 &&
            playerCellsMap[y + 1][x2] === null &&
            playerCellsMap[y + 2][x2] === null &&
            playerCellsMap[y + 2][x] === null
         ) {
            setOrientationTwoDeckShip(y, x, x2);

            placeShipToMap(x + 2, y, 2, orientationEnum[1]);

         } else {
            playerMapDivs[y][x2].removeEventListener('click', changeOrientationTwoDeckShipTwo);
         }

      };

      function reverseChangeOrientationThreeDeckShipOne(event) {
         const coordinates = event.target.id.split("-"),
            y = Number(coordinates[1]),
            x = Number(coordinates[2]) - 1;

         playerCellsMap[y][x] = null;
         playerCellsMap[y + 1][x] = null;
         playerCellsMap[y + 2][x] = null;

         playerMapDivs[y][x].classList.remove('activeThreeDeckShip', 'vertical');
         playerMapDivs[y + 1][x].classList.remove('activeThreeDeckShip', 'vertical');
         playerMapDivs[y + 2][x].classList.remove('activeThreeDeckShip', 'vertical');

         playerMapDivs[y][x].removeEventListener('click', reverseChangeOrientationThreeDeckShipOne);

         placeShipToMap(x + 1, y, 3);
      }

      function reverseChangeOrientationThreeDeckShipThree(event) {
         const coordinates = event.target.id.split("-"),
            y = Number(coordinates[1]),
            x = Number(coordinates[2]) - 1;

         playerCellsMap[y][x] = null;
         playerCellsMap[y + 1][x] = null;
         playerCellsMap[y + 2][x] = null;

         playerMapDivs[y][x].classList.remove('activeThreeDeckShip', 'vertical');
         playerMapDivs[y + 1][x].classList.remove('activeThreeDeckShip', 'vertical');
         playerMapDivs[y + 2][x].classList.remove('activeThreeDeckShip', 'vertical');

         playerMapDivs[y][x].removeEventListener('click', reverseChangeOrientationThreeDeckShipThree);

         playerCellsMap[y][x - 1] = "ship2";
         playerCellsMap[y][x - 2] = "ship2";
         playerCellsMap[y][x] = "ship2";

         playerMapDivs[y][x - 1].classList.add('activeThreeDeckShip');
         playerMapDivs[y][x - 2].classList.add('activeThreeDeckShip');
         playerMapDivs[y][x].classList.add('activeThreeDeckShip');

         playerMapDivs[y][x - 2].classList.add('changeableOrientationThreeDeckShipOne');
         playerMapDivs[y][x].classList.add('changeableOrientationThreeDeckShipThree');

         playerMapDivs[y][x - 2].addEventListener('click', changeOrientationThreeDeckShipOne);

         playerMapDivs[y][x].addEventListener('click', changeOrientationThreeDeckShipThree);
      }

      const changeOrientationThreeDeckShipOne = (event) => {
         const coordinates = event.target.id.split("-"),
            y = Number(coordinates[1]),
            x = Number(coordinates[2]) - 1,
            x2 = x + 1,
            x3 = x + 2;

         if (y < 5 && playerCellsMap[y + 1][x] === null && playerCellsMap[y + 2][x] === null) {
            setOrientationThreeDeckShip(y, x, x2, x3);

            placeShipToMap(x + 1, y, 3, orientationEnum[1]);

         } else {
            playerMapDivs[y][x].removeEventListener('click', changeOrientationThreeDeckShipOne);
         }

      };

      const changeOrientationThreeDeckShipThree = (event) => {
         const coordinates = event.target.id.split("-"),
            y = Number(coordinates[1]),
            x = Number(coordinates[2]) - 3,
            x2 = x + 1,
            x3 = x + 2;

         if (y < 5 && playerCellsMap[y + 1][x3] === null && playerCellsMap[y + 2][x3] === null) {
            setOrientationThreeDeckShip(y, x, x2, x3);

            placeShipToMap(x + 3, y, 3, orientationEnum[1]);

         } else {
            playerMapDivs[y][x3].removeEventListener('click', changeOrientationThreeDeckShipThree);
         }


      };

      // drawShip - функция для рисования кораблей на игровом поле.
      function drawShip(x, y, shipType, orientation) {
         const x2 = x + 1,
            x3 = x + 2,
            y2 = y + 1,
            y3 = y + 2;

         if (shipType === 1) {
            playerCellsMap[y][x] = "ship1";

            playerMapDivs[y][x].classList.add('activeOneDeckShip');

            playerState.scoreOneShip = 0;

            arrayPlayerCells.forEach((ship) => {
               if (ship.classList.contains("activeOneDeckShip")) {
                  playerState.scoreOneShip++;
               }
            });

            if (playerState.scoreOneShip === 1) {
               scoreShipsOneDeck.innerHTML = '2 x';
            } else if (playerState.scoreOneShip === 2) {
               scoreShipsOneDeck.innerHTML = '1 x';
            } else if (playerState.scoreOneShip === 3) {
               scoreShipsOneDeck.innerHTML = '0 x';
            }

            disabledButtonStartGame();
            drawNumberShipsUser();

         } else if (shipType === 2 && orientation === 'h') {
            playerCellsMap[y][x] = "ship2";
            playerCellsMap[y][x2] = "ship2";

            playerMapDivs[y][x].classList.add('activeTwoDeckShip');
            playerMapDivs[y][x2].classList.add('activeTwoDeckShip');

            playerMapDivs[y][x].classList.add('changeableOrientationTwoDeckShipOne');
            playerMapDivs[y][x2].classList.add('changeableOrientationTwoDeckShipTwo');

            playerState.scoreTwoShip = 0;

            arrayPlayerCells.forEach((ship) => {
               if (ship.classList.contains("activeTwoDeckShip")) {
                  playerState.scoreTwoShip++;
               }
            });

            if (playerState.scoreTwoShip === 2) {
               scoreShipsTwoDeck.innerHTML = '1 x';
            } else if (playerState.scoreTwoShip === 4) {
               scoreShipsTwoDeck.innerHTML = '0 x';
            }

            playerMapDivs[y][x].addEventListener('click', changeOrientationTwoDeckShipOne);

            playerMapDivs[y][x2].addEventListener('click', changeOrientationTwoDeckShipTwo);

            disabledButtonStartGame();
            drawNumberShipsUser();

         } else if (shipType === 3 && orientation === 'h') {
            playerCellsMap[y][x] = "ship3";
            playerCellsMap[y][x2] = "ship3";
            playerCellsMap[y][x3] = "ship3";

            playerMapDivs[y][x].classList.add('activeThreeDeckShip');
            playerMapDivs[y][x2].classList.add('activeThreeDeckShip');
            playerMapDivs[y][x3].classList.add('activeThreeDeckShip');

            playerMapDivs[y][x].classList.add('changeableOrientationThreeDeckShipOne');
            playerMapDivs[y][x3].classList.add('changeableOrientationThreeDeckShipThree');

            arrayPlayerCells.forEach((ship) => {
               if (ship.classList.contains("activeThreeDeckShip")) {
                  playerState.scoreThreeShip++;
               }
            });

            if (playerState.scoreThreeShip === 3) {
               scoreShipsThreeDeck.innerHTML = '0 x';
            }

            playerMapDivs[y][x].addEventListener('click', changeOrientationThreeDeckShipOne);

            playerMapDivs[y][x3].addEventListener('click', changeOrientationThreeDeckShipThree);

            disabledButtonStartGame();
            drawNumberShipsUser();

         } else if (shipType === 2 && orientation === 'v') {
            playerCellsMap[y][x] = "ship2";
            playerCellsMap[y2][x] = "ship2";

            playerMapDivs[y][x].classList.add('activeTwoDeckShip');
            playerMapDivs[y2][x].classList.add('activeTwoDeckShip');

            playerMapDivs[y][x].classList.add('vertical');
            playerMapDivs[y2][x].classList.add('vertical');

            if (playerMapDivs[y][x].classList.contains('changeableOrientationTwoDeckShipOne')) {
               playerMapDivs[y][x].addEventListener('click', reverseChangeOrientationTwoDeckShipOne);
            } else if (playerMapDivs[y][x].classList.contains('changeableOrientationTwoDeckShipTwo')) {
               playerMapDivs[y][x].addEventListener('click', reverseChangeOrientationTwoDeckShipTwo);
            }


            playerState.scoreTwoShip = 0;

            arrayPlayerCells.forEach((ship) => {
               if (ship.classList.contains("activeTwoDeckShip")) {
                  playerState.scoreTwoShip++;
               }
            });

            if (playerState.scoreTwoShip === 2) {
               scoreShipsTwoDeck.innerHTML = '1 x';
            } else if (playerState.scoreTwoShip === 4) {
               scoreShipsTwoDeck.innerHTML = '0 x';
            }

            disabledButtonStartGame();
            drawNumberShipsUser();

         } else if (shipType === 3 && orientation === 'v') {
            playerCellsMap[y][x] = "ship3";
            playerCellsMap[y2][x] = "ship3";
            playerCellsMap[y3][x] = "ship3";

            playerMapDivs[y][x].classList.add('activeThreeDeckShip');
            playerMapDivs[y2][x].classList.add('activeThreeDeckShip');
            playerMapDivs[y3][x].classList.add('activeThreeDeckShip');

            playerMapDivs[y][x].classList.add('vertical');
            playerMapDivs[y2][x].classList.add('vertical');
            playerMapDivs[y3][x].classList.add('vertical');

            if (playerMapDivs[y][x].classList.contains('changeableOrientationThreeDeckShipOne')) {
               playerMapDivs[y][x].addEventListener('click', reverseChangeOrientationThreeDeckShipOne);
            } else if (playerMapDivs[y][x].classList.contains('changeableOrientationThreeDeckShipThree')) {
               playerMapDivs[y][x].addEventListener('click', reverseChangeOrientationThreeDeckShipThree);
            }

            playerState.scoreThreeShip = 0;

            arrayPlayerCells.forEach((ship) => {
               if (ship.classList.contains("activeThreeDeckShip")) {
                  playerState.scoreThreeShip++;
               }
            });

            if (playerState.scoreThreeShip === 3) {
               scoreShipsThreeDeck.innerHTML = '0 x';
            }

            disabledButtonStartGame();
            drawNumberShipsUser();

         }
      }

      /*
         @params 
         rawX - координата по горизонтали <number>
         y - координата по вертикали <number>
         shipType - колличество палуб корабля <number>
         orientation - горизонтальное либо вертикальное расположение корабля <string> ("h" или "v")
      */

      // placeShipToMap - функция проверки, на возможность выставления корабля на игровое поле.

      function placeShipToMap(rawX, y, shipType, orientation = "h") {
         const x = rawX - 1;

         if (playerCellsMap[y][x] !== null) {
            return;
         }

         // Горизонтальное положение

         if (orientation === orientationEnum[0]) {
            if (shipType === 1) {
               if (playerCellsMap[y][x] !== null) {
                  return;

               } else if (y > 1 && y < 6 && x > 0 && x < 5) {
                  if
                     (
                     playerCellsMap[y - 1][x - 1] === null &&
                     playerCellsMap[y - 1][x] === null &&
                     playerCellsMap[y - 1][x + 1] === null &&
                     playerCellsMap[y][x + 1] === null &&
                     playerCellsMap[y + 1][x + 1] === null &&
                     playerCellsMap[y + 1][x] === null &&
                     playerCellsMap[y + 1][x - 1] === null &&
                     playerCellsMap[y][x - 1] === null
                  ) {
                     drawShip(x, y, 1);
                  }

               } else if (y === 1 && x === 0) {
                  if
                     (
                     playerCellsMap[y][x + 1] === null &&
                     playerCellsMap[y + 1][x + 1] === null &&
                     playerCellsMap[y + 1][x] === null
                  ) {
                     drawShip(x, y, 1);
                  }

               } else if (y === 1 && x > 0 && x < 5) {
                  if
                     (
                     playerCellsMap[y][x + 1] === null &&
                     playerCellsMap[y + 1][x + 1] === null &&
                     playerCellsMap[y + 1][x] === null &&
                     playerCellsMap[y + 1][x - 1] === null &&
                     playerCellsMap[y][x - 1] === null
                  ) {
                     drawShip(x, y, 1);
                  }

               } else if (y === 1 && x === 5) {
                  if
                     (
                     playerCellsMap[y + 1][x] === null &&
                     playerCellsMap[y + 1][x - 1] === null &&
                     playerCellsMap[y][x - 1] === null
                  ) {
                     drawShip(x, y, 1);
                  }

               } else if (y > 1 && y < 6 && x === 5) {
                  if
                     (
                     playerCellsMap[y + 1][x] === null &&
                     playerCellsMap[y + 1][x - 1] === null &&
                     playerCellsMap[y][x - 1] === null &&
                     playerCellsMap[y - 1][x - 1] === null &&
                     playerCellsMap[y - 1][x] === null
                  ) {
                     drawShip(x, y, 1);
                  }

               } else if (y === 6 && x === 5) {
                  if
                     (
                     playerCellsMap[y][x - 1] === null &&
                     playerCellsMap[y - 1][x - 1] === null &&
                     playerCellsMap[y - 1][x] === null
                  ) {
                     drawShip(x, y, 1);
                  }

               } else if (y === 6 && x > 0 && x < 5) {
                  if
                     (
                     playerCellsMap[y][x - 1] === null &&
                     playerCellsMap[y - 1][x - 1] === null &&
                     playerCellsMap[y - 1][x] === null &&
                     playerCellsMap[y - 1][x + 1] === null &&
                     playerCellsMap[y][x + 1] === null
                  ) {
                     drawShip(x, y, 1);
                  }

               } else if (y === 6 && x === 0) {
                  if
                     (
                     playerCellsMap[y - 1][x] === null &&
                     playerCellsMap[y - 1][x + 1] === null &&
                     playerCellsMap[y][x + 1] === null
                  ) {
                     drawShip(x, y, 1);
                  }

               } else if (y > 1 && y < 6 && x === 0) {
                  if
                     (
                     playerCellsMap[y - 1][x] === null &&
                     playerCellsMap[y - 1][x + 1] === null &&
                     playerCellsMap[y][x + 1] === null &&
                     playerCellsMap[y + 1][x + 1] === null &&
                     playerCellsMap[y + 1][x] === null
                  ) {
                     drawShip(x, y, 1);
                  }
               }
            }


            if (shipType === 2) {
               if (playerCellsMap[y][x] !== null && playerCellsMap[y][x + 1] !== null) {
                  return;
               } else if (y > 1 && y < 6 && x > 0 && x < 4) {
                  if
                     (
                     playerCellsMap[y - 1][x - 1] === null &&
                     playerCellsMap[y - 1][x] === null &&
                     playerCellsMap[y - 1][x + 1] === null &&
                     playerCellsMap[y - 1][x + 2] === null &&
                     playerCellsMap[y][x + 2] === null &&
                     playerCellsMap[y + 1][x + 2] === null &&
                     playerCellsMap[y + 1][x + 1] === null &&
                     playerCellsMap[y + 1][x] === null &&
                     playerCellsMap[y + 1][x - 1] === null &&
                     playerCellsMap[y][x - 1] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  }

               } else if (y === 1 && x === 0) {
                  if
                     (
                     playerCellsMap[y][x + 2] === null &&
                     playerCellsMap[y + 1][x + 2] === null &&
                     playerCellsMap[y + 1][x + 1] === null &&
                     playerCellsMap[y + 1][x] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  }

               } else if (y === 1 && x > 0 && x < 4) {
                  if
                     (
                     playerCellsMap[y][x + 2] === null &&
                     playerCellsMap[y + 1][x + 2] === null &&
                     playerCellsMap[y + 1][x + 1] === null &&
                     playerCellsMap[y + 1][x] === null &&
                     playerCellsMap[y + 1][x - 1] === null &&
                     playerCellsMap[y][x - 1] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  }

               } else if (y === 1 && x === 4) {
                  if
                     (
                     playerCellsMap[y + 1][x + 1] === null &&
                     playerCellsMap[y + 1][x] === null &&
                     playerCellsMap[y + 1][x - 1] === null &&
                     playerCellsMap[y][x - 1] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  }

               } else if (y > 1 && y < 6 && x === 0) {
                  if
                     (
                     playerCellsMap[y - 1][x] === null &&
                     playerCellsMap[y - 1][x + 1] === null &&
                     playerCellsMap[y - 1][x + 2] === null &&
                     playerCellsMap[y][x + 2] === null &&
                     playerCellsMap[y + 1][x + 2] === null &&
                     playerCellsMap[y + 1][x + 1] === null &&
                     playerCellsMap[y + 1][x] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  }

               } else if (y > 1 && y < 6 && x === 4) {
                  if
                     (
                     playerCellsMap[y + 1][x + 1] === null &&
                     playerCellsMap[y + 1][x] === null &&
                     playerCellsMap[y + 1][x - 1] === null &&
                     playerCellsMap[y][x - 1] === null &&
                     playerCellsMap[y - 1][x - 1] === null &&
                     playerCellsMap[y - 1][x] === null &&
                     playerCellsMap[y - 1][x + 1] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  }

               } else if (y === 6 && x === 4) {
                  if
                     (
                     playerCellsMap[y][x - 1] === null &&
                     playerCellsMap[y - 1][x - 1] === null &&
                     playerCellsMap[y - 1][x] === null &&
                     playerCellsMap[y - 1][x + 1] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  }

               } else if (y === 6 && x > 0 && x < 4) {
                  if
                     (
                     playerCellsMap[y][x - 1] === null &&
                     playerCellsMap[y - 1][x - 1] === null &&
                     playerCellsMap[y - 1][x] === null &&
                     playerCellsMap[y - 1][x + 1] === null &&
                     playerCellsMap[y - 1][x + 2] === null &&
                     playerCellsMap[y][x + 2] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  }

               } else if (y === 6 && x === 0) {
                  if
                     (
                     playerCellsMap[y - 1][x] === null &&
                     playerCellsMap[y - 1][x + 1] === null &&
                     playerCellsMap[y - 1][x + 2] === null &&
                     playerCellsMap[y][x + 2] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  }
               }
            }

            if (shipType === 3) {
               if (playerCellsMap[y][x] !== null && playerCellsMap[y][x + 1] !== null && playerCellsMap[y][x + 2] !== null) {
                  return;
               } else if (y > 1 && y < 6 && x > 0 && x < 3) {
                  if
                     (
                     playerCellsMap[y - 1][x - 1] === null &&
                     playerCellsMap[y - 1][x] === null &&
                     playerCellsMap[y - 1][x + 1] === null &&
                     playerCellsMap[y - 1][x + 2] === null &&
                     playerCellsMap[y - 1][x + 3] === null &&
                     playerCellsMap[y][x + 3] === null &&
                     playerCellsMap[y + 1][x + 3] === null &&
                     playerCellsMap[y + 1][x + 2] === null &&
                     playerCellsMap[y + 1][x + 1] === null &&
                     playerCellsMap[y + 1][x] === null &&
                     playerCellsMap[y + 1][x - 1] === null &&
                     playerCellsMap[y][x - 1] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  }

               } else if (y === 1 && x === 0) {
                  if
                     (
                     playerCellsMap[y][x + 3] === null &&
                     playerCellsMap[y + 1][x + 3] === null &&
                     playerCellsMap[y + 1][x + 2] === null &&
                     playerCellsMap[y + 1][x + 1] === null &&
                     playerCellsMap[y + 1][x] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  }

               } else if (y === 1 && x > 0 && x < 3) {
                  if
                     (
                     playerCellsMap[y][x + 3] === null &&
                     playerCellsMap[y + 1][x + 3] === null &&
                     playerCellsMap[y + 1][x + 2] === null &&
                     playerCellsMap[y + 1][x + 1] === null &&
                     playerCellsMap[y + 1][x] === null &&
                     playerCellsMap[y + 1][x - 1] === null &&
                     playerCellsMap[y][x - 1] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  }

               } else if (y > 1 && y < 6 && x === 3) {
                  if
                     (
                     playerCellsMap[y + 1][x + 2] === null &&
                     playerCellsMap[y + 1][x + 1] === null &&
                     playerCellsMap[y + 1][x] === null &&
                     playerCellsMap[y + 1][x - 1] === null &&
                     playerCellsMap[y][x - 1] === null &&
                     playerCellsMap[y - 1][x - 1] === null &&
                     playerCellsMap[y - 1][x] === null &&
                     playerCellsMap[y - 1][x + 1] === null &&
                     playerCellsMap[y - 1][x + 2] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  }

               } else if (y === 1 && x === 3) {
                  if
                     (
                     playerCellsMap[y + 1][x + 2] === null &&
                     playerCellsMap[y + 1][x + 1] === null &&
                     playerCellsMap[y + 1][x] === null &&
                     playerCellsMap[y + 1][x - 1] === null &&
                     playerCellsMap[y][x - 1] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  }

               } else if (y === 6 && x === 3) {
                  if
                     (
                     playerCellsMap[y][x - 1] === null &&
                     playerCellsMap[y - 1][x - 1] === null &&
                     playerCellsMap[y - 1][x] === null &&
                     playerCellsMap[y - 1][x + 1] === null &&
                     playerCellsMap[y - 1][x + 2] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  }

               } else if (y === 6 && x > 0 && x < 3) {
                  if
                     (
                     playerCellsMap[y][x - 1] === null &&
                     playerCellsMap[y - 1][x - 1] === null &&
                     playerCellsMap[y - 1][x] === null &&
                     playerCellsMap[y - 1][x + 1] === null &&
                     playerCellsMap[y - 1][x + 2] === null &&
                     playerCellsMap[y - 1][x + 3] === null &&
                     playerCellsMap[y][x + 3] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  }

               } else if (y === 6 && x === 0) {
                  if
                     (
                     playerCellsMap[y - 1][x] === null &&
                     playerCellsMap[y - 1][x + 1] === null &&
                     playerCellsMap[y - 1][x + 2] === null &&
                     playerCellsMap[y - 1][x + 3] === null &&
                     playerCellsMap[y][x + 3] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  }

               } else if (y > 0 && y < 6 && x === 0) {
                  if
                     (
                     playerCellsMap[y + 1][x] === null &&
                     playerCellsMap[y + 1][x + 1] === null &&
                     playerCellsMap[y + 1][x + 2] === null &&
                     playerCellsMap[y + 1][x + 3] === null &&
                     playerCellsMap[y][x + 3] === null &&
                     playerCellsMap[y - 1][x + 3] === null &&
                     playerCellsMap[y - 1][x + 2] === null &&
                     playerCellsMap[y - 1][x + 1] === null &&
                     playerCellsMap[y - 1][x] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  }
               }
            }
         }

         // Вертикальное положение

         if (orientation === orientationEnum[1]) {
            if (shipType === 2) {
               if (playerCellsMap[y][x] !== null && playerCellsMap[y + 1][x] !== null) {
                  return;

               } else if (y > 1 && y < 5 && x > 0 && x < 5) {
                  if
                     (
                     playerCellsMap[y - 1][x - 1] === null &&
                     playerCellsMap[y - 1][x] === null &&
                     playerCellsMap[y - 1][x + 1] === null &&
                     playerCellsMap[y][x + 1] === null &&
                     playerCellsMap[y + 1][x + 1] === null &&
                     playerCellsMap[y + 2][x + 1] === null &&
                     playerCellsMap[y + 2][x] === null &&
                     playerCellsMap[y + 2][x - 1] === null &&
                     playerCellsMap[y + 1][x - 1] === null &&
                     playerCellsMap[y][x - 1] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  }

               } else if (y === 1 && x === 0) {
                  if
                     (
                     playerCellsMap[y][x + 1] === null &&
                     playerCellsMap[y + 1][x + 1] === null &&
                     playerCellsMap[y + 2][x + 1] === null &&
                     playerCellsMap[y + 2][x] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  }

               } else if (y === 1 && x > 0 && x < 5) {
                  if
                     (
                     playerCellsMap[y][x + 1] === null &&
                     playerCellsMap[y + 1][x + 1] === null &&
                     playerCellsMap[y + 2][x + 1] === null &&
                     playerCellsMap[y + 2][x] === null &&
                     playerCellsMap[y + 2][x - 1] === null &&
                     playerCellsMap[y + 1][x - 1] === null &&
                     playerCellsMap[y][x - 1] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  }

               } else if (y === 1 && x === 5) {
                  if
                     (
                     playerCellsMap[y][x - 1] === null &&
                     playerCellsMap[y + 1][x - 1] === null &&
                     playerCellsMap[y + 2][x - 1] === null &&
                     playerCellsMap[y + 2][x] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  }

               } else if (y > 1 && y < 5 && x === 5) {
                  if
                     (
                     playerCellsMap[y + 2][x] === null &&
                     playerCellsMap[y + 2][x - 1] === null &&
                     playerCellsMap[y + 1][x - 1] === null &&
                     playerCellsMap[y][x - 1] === null &&
                     playerCellsMap[y - 1][x - 1] === null &&
                     playerCellsMap[y - 1][x] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  }

               } else if (y === 5 && x === 5) {
                  if
                     (
                     playerCellsMap[y + 1][x - 1] === null &&
                     playerCellsMap[y][x - 1] === null &&
                     playerCellsMap[y - 1][x - 1] === null &&
                     playerCellsMap[y - 1][x] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  }

               } else if (y === 5 && x > 0 && x < 5) {
                  if
                     (
                     playerCellsMap[y + 1][x - 1] === null &&
                     playerCellsMap[y][x - 1] === null &&
                     playerCellsMap[y - 1][x - 1] === null &&
                     playerCellsMap[y - 1][x] === null &&
                     playerCellsMap[y - 1][x + 1] === null &&
                     playerCellsMap[y][x + 1] === null &&
                     playerCellsMap[y + 1][x + 1] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  }

               } else if (y === 5 && x === 0) {
                  if
                     (
                     playerCellsMap[y - 1][x] === null &&
                     playerCellsMap[y - 1][x + 1] === null &&
                     playerCellsMap[y][x + 1] === null &&
                     playerCellsMap[y + 1][x + 1] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  }

               } else if (y > 1 && y < 5 && x === 0) {
                  if
                     (
                     playerCellsMap[y - 1][x] === null &&
                     playerCellsMap[y - 1][x + 1] === null &&
                     playerCellsMap[y][x + 1] === null &&
                     playerCellsMap[y + 1][x + 1] === null &&
                     playerCellsMap[y + 2][x + 1] === null &&
                     playerCellsMap[y + 2][x] === null
                  ) {
                     drawShip(x, y, 2, orientation);
                  }
               }
            }

            if (shipType === 3) {
               if (playerCellsMap[y][x] !== null && playerCellsMap[y + 1][x] !== null && playerCellsMap[y + 2][x] !== null) {
                  return;
               } else if (y > 1 && y < 4 && x > 0 && x < 5) {
                  if
                     (
                     playerCellsMap[y - 1][x - 1] === null &&
                     playerCellsMap[y - 1][x] === null &&
                     playerCellsMap[y - 1][x + 1] === null &&
                     playerCellsMap[y][x + 1] === null &&
                     playerCellsMap[y + 1][x + 1] === null &&
                     playerCellsMap[y + 2][x + 1] === null &&
                     playerCellsMap[y + 3][x + 1] === null &&
                     playerCellsMap[y + 3][x] === null &&
                     playerCellsMap[y + 3][x - 1] === null &&
                     playerCellsMap[y + 2][x - 1] === null &&
                     playerCellsMap[y + 1][x - 1] === null &&
                     playerCellsMap[y][x - 1] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  }

               } else if (y === 1 && x === 0) {
                  if
                     (
                     playerCellsMap[y][x + 1] === null &&
                     playerCellsMap[y + 1][x + 1] === null &&
                     playerCellsMap[y + 2][x + 1] === null &&
                     playerCellsMap[y + 3][x + 1] === null &&
                     playerCellsMap[y + 3][x] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  }

               } else if (y === 1 && x > 0 && x < 5) {
                  if
                     (
                     playerCellsMap[y][x + 1] === null &&
                     playerCellsMap[y + 1][x + 1] === null &&
                     playerCellsMap[y + 2][x + 1] === null &&
                     playerCellsMap[y + 3][x + 1] === null &&
                     playerCellsMap[y + 3][x] === null &&
                     playerCellsMap[y + 3][x - 1] === null &&
                     playerCellsMap[y + 2][x - 1] === null &&
                     playerCellsMap[y + 1][x - 1] === null &&
                     playerCellsMap[y][x - 1] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  }

               } else if (y === 1 && x === 5) {
                  if
                     (
                     playerCellsMap[y + 3][x] === null &&
                     playerCellsMap[y + 3][x - 1] === null &&
                     playerCellsMap[y + 2][x - 1] === null &&
                     playerCellsMap[y + 1][x - 1] === null &&
                     playerCellsMap[y][x - 1] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  }

               } else if (y > 1 && y < 4 && x === 5) {
                  if
                     (
                     playerCellsMap[y + 3][x] === null &&
                     playerCellsMap[y + 3][x - 1] === null &&
                     playerCellsMap[y + 2][x - 1] === null &&
                     playerCellsMap[y + 1][x - 1] === null &&
                     playerCellsMap[y][x - 1] === null &&
                     playerCellsMap[y - 1][x - 1] === null &&
                     playerCellsMap[y - 1][x] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  }

               } else if (y === 4 && x === 5) {
                  if
                     (
                     playerCellsMap[y + 2][x - 1] === null &&
                     playerCellsMap[y + 1][x - 1] === null &&
                     playerCellsMap[y][x - 1] === null &&
                     playerCellsMap[y - 1][x - 1] === null &&
                     playerCellsMap[y - 1][x] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  }

               } else if (y === 4 && x > 0 && x < 5) {
                  if
                     (
                     playerCellsMap[y + 2][x - 1] === null &&
                     playerCellsMap[y + 1][x - 1] === null &&
                     playerCellsMap[y][x - 1] === null &&
                     playerCellsMap[y - 1][x - 1] === null &&
                     playerCellsMap[y - 1][x] === null &&
                     playerCellsMap[y - 1][x + 1] === null &&
                     playerCellsMap[y][x + 1] === null &&
                     playerCellsMap[y + 1][x + 1] === null &&
                     playerCellsMap[y + 2][x + 1] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  }

               } else if (y === 4 && x === 0) {
                  if
                     (
                     playerCellsMap[y - 1][x] === null &&
                     playerCellsMap[y - 1][x + 1] === null &&
                     playerCellsMap[y][x + 1] === null &&
                     playerCellsMap[y + 1][x + 1] === null &&
                     playerCellsMap[y + 2][x + 1] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  }

               } else if (y > 1 && y < 4 && x === 0) {
                  if
                     (
                     playerCellsMap[y - 1][x] === null &&
                     playerCellsMap[y - 1][x + 1] === null &&
                     playerCellsMap[y][x + 1] === null &&
                     playerCellsMap[y + 1][x + 1] === null &&
                     playerCellsMap[y + 2][x + 1] === null &&
                     playerCellsMap[y + 3][x + 1] === null &&
                     playerCellsMap[y + 3][x] === null
                  ) {
                     drawShip(x, y, 3, orientation);
                  }

               }
            }

         }

      }
      disabledButtonStartGame();

      buttonStartGame.addEventListener('click', () => {
         arrayPlayerCells.forEach(ship => {
            if (ship.classList.contains('changeableOrientationTwoDeckShipOne')) {
               ship.removeEventListener('click', changeOrientationTwoDeckShipOne);
               ship.removeEventListener('click', reverseChangeOrientationTwoDeckShipOne);
            } else if (ship.classList.contains('changeableOrientationTwoDeckShipTwo')) {
               ship.removeEventListener('click', changeOrientationTwoDeckShipTwo);
               ship.removeEventListener('click', reverseChangeOrientationTwoDeckShipTwo);
            } else if (ship.classList.contains('changeableOrientationThreeDeckShipOne')) {
               ship.removeEventListener('click', changeOrientationThreeDeckShipOne);
               ship.removeEventListener('click', reverseChangeOrientationThreeDeckShipOne);
            } else if (ship.classList.contains('changeableOrientationThreeDeckShipThree')) {
               ship.removeEventListener('click', changeOrientationThreeDeckShipThree);
               ship.removeEventListener('click', reverseChangeOrientationThreeDeckShipThree);
            }
         })
      })
   }
};
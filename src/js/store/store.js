export const playerGameCells = document.querySelectorAll('.player_cell'),
   computerGameCells = document.querySelectorAll('.computer_cell'),
   oneDeckShip = document.getElementById('1'),
   twoDeckShip = document.getElementById('2'),
   threeDeckShip = document.getElementById('3'),
   scoreShipsOneDeck = document.querySelector('.one_deck'),
   scoreShipsTwoDeck = document.querySelector('.two_deck'),
   scoreShipsThreeDeck = document.querySelector('.three_deck'),
   buttonStartGame = document.querySelector('.start_game'),
   countSingleDeckShipsPlayer = document.querySelector('.user_ship_1'),
   countDoubleDeckShipsPlayer = document.querySelector('.user_ship_2'),
   countThreeDeckShipsPlayer = document.querySelector('.user_ship_3'),
   countSingleDeckShipsComputer = document.querySelector('.computer_ship_1'),
   countDoubleDeckShipsComputer = document.querySelector('.computer_ship_2'),
   countThreeDeckShipsComputer = document.querySelector('.computer_ship_3'),
   playerField = document.querySelector('.user'),
   ComputerField = document.querySelector('.computer'),
   winnerWindow = document.querySelector('.winner'),
   loserWindow = document.querySelector('.loser'),
   closeWinnerWindow = document.querySelector('.close_winner'),
   closeLoserWindow = document.querySelector('.close_loser'),
   playerMove = document.querySelector('.move_user'),
   computerMove = document.querySelector('.move_computer');

const store = {
   _gameState: {
      userName: '',
      arrayPlayerCells: [...playerGameCells],
      arrayComputerCells: [...computerGameCells],
      orientationEnum: ['h', 'v'],

      literals: {
         NAME_QUERY: 'Как вас зовут?',
         DEFAULT_USER_NAME: 'Игрок без имени.',
         MOVE_USER: 'Ваш ход!',
         MOVE_COMPUTER: 'Ход компьютера!',
      },

      mechanicsFight: {
         randomPlayerCell: '',
         limitedArrayPlayerCells: [],
         limitedRandomCell: '',

         playerShips: {
            oneDeck: [],
            twoDeck: [],
            threeDeck: []
         },

         computerShips: {
            oneDeck: [],
            twoDeck: [],
            threeDeck: []
         },
      },

      playerState: {
         typeShip: '',
         scoreOneShip: 0,
         scoreTwoShip: 0,
         scoreThreeShip: 0
      },

      computerState: {
         randomShip: '',
         randomOrientation: '',
         counterFailedAttempt: 0
      },

      shipTypeComputer: {
         shipTypeOne: [],
         shipTypeTwo: [],
         shipTypeThree: []
      },

      emptyCellsMap: {
         1: [null, null, null, null, null, null],
         2: [null, null, null, null, null, null],
         3: [null, null, null, null, null, null],
         4: [null, null, null, null, null, null],
         5: [null, null, null, null, null, null],
         6: [null, null, null, null, null, null]
      }

   },

   getGameState() {
      return this._gameState;
   },

   getCopyEmptyCellsMap() {
      const { emptyCellsMap } = this.getGameState();
      return {
         ...emptyCellsMap,
         1: [...emptyCellsMap['1']],
         2: [...emptyCellsMap['2']],
         3: [...emptyCellsMap['3']],
         4: [...emptyCellsMap['4']],
         5: [...emptyCellsMap['5']],
         6: [...emptyCellsMap['6']]
      }
   }

}

export default store;
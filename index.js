'use strict';

import {PlacementShipsUser} from './src/js/placementShipsPlayer/PlacementShipsPlayer';
import {PlacementShipsComputer} from './src/js/placementShipsComputer/PlacementShipsComputer';
import {MechanicsFight} from './src/js/mechanicsFight/MechanicsFight';
import store from './src/js/store/store';

const buttonStartGame = document.querySelector('.start_game'),
      userNameDisplayWindow = document.querySelector('.user_name');

let {userName, literals} = store.getGameState()

const getResponseFromUser = () => {
   userName = prompt(literals.NAME_QUERY,'');

   if (userName === null || userName === '') {
      userNameDisplayWindow.innerHTML = `Имя: ${literals.DEFAULT_USER_NAME}`;
   } else {
      userNameDisplayWindow.innerHTML = `Имя: ${userName}.`;
   }
};

PlacementShipsUser.init();

buttonStartGame.addEventListener('click', () => {  
   getResponseFromUser();
   PlacementShipsComputer.init();
   MechanicsFight.init();
});
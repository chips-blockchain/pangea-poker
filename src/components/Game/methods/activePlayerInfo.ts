import {
    addToHandHistory,
    fold,
    setActivePlayer,
    setLastAction,
    updateStateValue,
  } from "../../../store/actions";
import sounds from "../../../sounds/sounds";
import arrayEquals from '../../../lib/arrayEquals'
import IMethodFunction from './types'
import playerIdToString from "../../../lib/playerIdToString";
import { getGUIid } from "../../../lib/playerIdDecoder";

const activePlayerInfo = (input: IMethodFunction) => {

    if (!arrayEquals(input.state.playerStatus, input.message.player_status)) {
      console.log('Current activePlayer is ', input.state.activePlayer)
        input.message.player_status.forEach((active: number, playerid: number) => {
          if (!active) {
            let guiPlayerId = getGUIid(playerid);
            let seat = playerIdToString(playerid);

            console.log('Current player is ', input.state.activePlayer)
            console.log('Inactive player is ', seat)

            // if the current player is the inactive player
            if (input.state.activePlayer === seat) {
              console.log('Player ', playerid, ' with GUI id ', guiPlayerId, ' is inactive and will fold');
              // send fold for the inactive player
              fold(seat, input.dispatch);
              setLastAction(playerid, "fold", input.dispatch);
              setActivePlayer(null, input.dispatch);
              addToHandHistory(`Player${guiPlayerId} folds.`, input.dispatch);
              sounds.fold.play();
              console.log('You are ', playerid, ' and you have been disconnected');
            }
          }
        });
        updateStateValue('playerStatus', input.message.player_status, input.dispatch);
      }
}

export default activePlayerInfo
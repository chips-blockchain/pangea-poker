import { IState } from "../../../store/initialState";
import { bet, setLastAction, addToHandHistory } from "../../../store/actions";
import log from "../../../lib/dev";
import palyerStringToId from "../../../lib/playerStringToId";

export const blind_bet = (
    type: string, 
    playerId: number, 
    amount: number,
    state: IState, 
    dispatch: (arg: object) => void
    ): void => {
    
    bet(playerId, amount, state, dispatch);
    setLastAction(playerId, `${type} Blind`, dispatch);
    log(`${type} Blind` + " has been posted.", "info");
    addToHandHistory(
        `Player${playerId + 1} posts the ${type} Blind of ${amount}.`,
        dispatch
    );
}

export const isCurrentPlayer = (
    playerid: number,
    state: IState
    ): boolean => {
        console.log('is Current Player', playerid);
        return playerid === palyerStringToId(state.userSeat)
    //     console.log('dealer', state.dealer);

    //     console.log('dealer + 3', state.dealer + 3);
    //     console.log(state.maxPlayers);
    //     console.log((state.dealer + 3) % state.maxPlayers)
    //    // big blind is the second to the left of the dealer
    //    // game starts with the guy on the left of him
    //    return ((state.dealer + 3) % state.maxPlayers) === playerid
}
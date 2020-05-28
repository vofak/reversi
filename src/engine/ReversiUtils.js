import PlayerEnum from "./player/PlayerEnum";

function getOpponent(player) {
    return player === PlayerEnum.white ? PlayerEnum.black : PlayerEnum.white;
}

export default getOpponent;
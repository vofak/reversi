import PlayerEnum from "./player/PlayerEnum";

/**
 * @param player {PlayerEnum} player
 * @returns {PlayerEnum} opponent of the given player
 */
function getOpponent(player) {
    return player === PlayerEnum.white ? PlayerEnum.black : PlayerEnum.white;
}

export default getOpponent;
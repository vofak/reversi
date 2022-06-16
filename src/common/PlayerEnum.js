import PieceEnum from "./PieceEnum";

const PlayerEnum = Object.freeze({
    white: {piece: PieceEnum.white, name: "White Player"},
    black: {piece: PieceEnum.black, name: "Black Player"}
});

export default PlayerEnum;
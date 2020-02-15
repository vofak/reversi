import React from "react";
import './Square.css';
import AspectRatio from '../../utils/AspectRatio'
import PieceEnum from "./PieceEnum";

class Square extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {piece: props.piece};
    }

    setPiece(piece) {
        this.setState({piece: piece});
    }

    render() {
        let piece;
        if (this.state.piece === PieceEnum.white) {
            piece = this.getPiece('white');
        } else if (this.state.piece === PieceEnum.black) {
            piece = this.getPiece('black');
        } else {
            piece = '';
        }

        return (
            <div className='SquareContainer'>
                <AspectRatio ratio={1}
                             children={
                                 <div className='Square' style={{backgroundColor: this.props.color}}>
                                     {piece}
                                 </div>
                             }>
                </AspectRatio>
            </div>
        )
    }

    getPiece(color) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className='Piece'>
                <circle r="50%" cx="50%" cy="50%" fill={color}/>
            </svg>
        )
    }
}

export default Square;
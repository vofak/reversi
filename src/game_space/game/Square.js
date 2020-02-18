import React from "react";
import './Square.css';
import AspectRatio from '../../utils/AspectRatio'
import PieceEnum from "./PieceEnum";

class Square extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {piece: this.props.piece, move: this.props.move, toReverse: false};
    }

    setPiece(piece) {
        this.setState({piece: piece});
    }

    setMove(move) {
        this.setState({move: move});
    }

    setToReverse(toReverse) {
        this.setState({toReverse: toReverse});
    }

    onClick = () => {
        this.props.onClick(this);
    };

    onMouseEnter = () => {
        this.props.onMouseEnter(this);
    };

    onMouseLeave = () => {
        this.props.onMouseLeave(this);
    };

    render() {
        let piece;
        if (this.state.piece === PieceEnum.white) {
            piece = this.getPiece('white');
        } else if (this.state.piece === PieceEnum.black) {
            piece = this.getPiece('black');
        } else {
            piece = '';
        }

        let color = this.state.move ? 'blue' : this.props.color;
        color = this.state.toReverse ? 'aqua' : color;

        return (
            <div className='SquareContainer'>
                <AspectRatio ratio={1}
                             children={
                                 <div className='Square'
                                      style={{backgroundColor: color}}
                                      onClick={this.onClick}
                                      onMouseEnter={this.onMouseEnter}
                                      onMouseLeave={this.onMouseLeave}
                                 >
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
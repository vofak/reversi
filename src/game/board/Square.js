import React from "react";
import './Square.css';
import AspectRatio from '../../utils/AspectRatio'
import PieceEnum from "./PieceEnum";

class Square extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {piece: props.piece, selected: false};
    }

    setPiece(piece) {
        this.setState({piece: piece});
    }

    setSelected(selected) {
        this.setState({selected: selected});
    }

    onClick = () => {
        this.props.onClick(this.props.key2);
    };

    onMouseEnter = () => {
        this.props.onMouseEnter(this.props.key2);
    };

    onMouseLeave = () => {
        this.props.onMouseLeave(this.props.key2);
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

        let color = this.state.selected ? 'blue' : this.props.color;

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
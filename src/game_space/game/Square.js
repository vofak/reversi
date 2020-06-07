import React, {cloneElement} from "react";
import './Square.css';
import PieceEnum from "./PieceEnum";
import SvgPaint from "../SvgPaint";

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
        if (this.state.piece === PieceEnum.empty) {
            piece = '';
        } else if (this.state.piece === PieceEnum.white) {
            piece = this.getSvgPiece('white');
        } else if (this.state.piece === PieceEnum.black) {
            piece = this.getSvgPiece('black');
        } else if (this.state.piece instanceof Image) {
            piece = this.getImgPiece(this.state.piece);
        } else {
            piece = this.getSvgPaintPiece(this.state.piece);
        }

        return (
            <div
                className={`Square ${this.state.toReverse ? 'ToReverseSquare' : ''} ${this.state.move ? 'MoveSquare' : ''}`}
                onClick={this.onClick}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                {piece}
            </div>
        )
    }

    getSvgPiece(color) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className='Piece'>
                <circle r="50%" cx="50%" cy="50%" fill={color}/>
            </svg>
        )
    }

    getImgPiece(src) {
        return (
            <div className={'Piece'}>
                <img src={src.src} alt={'piece'} style={{height: '100%'}}/>
            </div>
        )
    }

    getSvgPaintPiece(svgData) {

        return (
            <div className={'Piece'}>
                <svg viewBox='0 0 100 100'>
                    {
                        svgData.paths.map(path => {
                            return <path d={path.d} fill={path.fill} stroke={path.stroke} strokeWidth={path.strokeWidth}/>
                        })
                    }
                </svg>
            </div>
        )
    }
}

export default Square;
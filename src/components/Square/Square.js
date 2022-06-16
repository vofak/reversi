import React from "react";
import './Square.css';
import PieceEnum from "../../common/PieceEnum";

class Square extends React.Component {

    /**
     * Constructs the square component
     *
     * @param props
     * @param context
     */
    constructor(props, context) {
        super(props, context);
        this.state = {piece: this.props.piece, move: this.props.move, toReverse: false};
    }

    /**
     * Sets the piece
     *
     * @param piece {PieceEnum} piece
     */
    setPiece(piece) {
        this.setState({piece: piece});
    }

    /**
     * Sets the valid move indicator
     *
     * @param move {Boolean} is valid move indicator
     */
    setMove(move) {
        this.setState({move: move});
    }

    /**
     * Sets the to reverse square indicator
     *
     * @param toReverse {Boolean} is to reverse square indicator
     */
    setToReverse(toReverse) {
        this.setState({toReverse: toReverse});
    }

    /**
     * Handler for clicking the square
     */
    handleClick = () => {
        this.props.onClick(this);
    };

    /**
     * Handler for mouse entering the square
     */
    handleMouseEnter = () => {
        this.props.onMouseEnter(this);
    };

    /**
     * Handler for mouse leaving the square
     */
    onMouseLeave = () => {
        this.props.onMouseLeave(this);
    };

    render() {
        let piece;
        if (this.state.piece === PieceEnum.empty) {
            piece = '';
        }
        else if (this.state.piece === PieceEnum.white) {
            piece = this.getSvgPiece('white');
        }
        else if (this.state.piece === PieceEnum.black) {
            piece = this.getSvgPiece('black');
        }
        else if (this.state.piece instanceof Image) {
            piece = this.getImgPiece(this.state.piece);
        }
        else {
            piece = this.getSvgPaintPiece(this.state.piece);
        }

        return (
            <div
                className={`Square ${this.state.toReverse ? 'ToReverseSquare' : ''} ${this.state.move ? 'MoveSquare' : ''}`}
                onClick={this.handleClick}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                {piece}
            </div>
        )
    }

    /**
     * @param color {String} color string
     * @returns {*} svg element of the piece
     */
    getSvgPiece(color) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className='Piece'>
                <circle r="50%" cx="50%" cy="50%" fill={color}/>
            </svg>
        )
    }

    /**
     * @param src {String} src of the image
     * @returns {*} img element of the piece
     */
    getImgPiece(src) {
        return (
            <div className={'Piece'}>
                <img src={src.src} alt={'piece'} style={{height: '100%'}}/>
            </div>
        )
    }

    /**
     * @param svgData {*} structure representing the svg data
     * @returns {*} svg element of the piece
     */
    getSvgPaintPiece(svgData) {
        return (
            <div className={'Piece'}>
                <svg viewBox='0 0 100 100'>
                    {
                        svgData.paths.map(path => {
                            return <path d={path.d} fill={path.fill} stroke={svgData.color}
                                         strokeWidth={path.strokeWidth}/>
                        })
                    }
                </svg>
            </div>
        )
    }
}

export default Square;
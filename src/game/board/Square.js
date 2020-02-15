import React from "react";
import './Square.css';
import AspectRatio from '../../utils/AspectRatio'

class Square extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {piece: props.piece};
    }

    setPiece(piece) {
        this.setState({piece: piece});
    }

    render() {
        return (
            <div className='SquareContainer'>
                <AspectRatio ratio={1}
                             children={
                                 <div className='Square' style={{backgroundColor: this.props.color}}/>
                             }>
                </AspectRatio>
            </div>
        )
    }
}

export default Square;
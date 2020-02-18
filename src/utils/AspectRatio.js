import React from "react";
import './AspectRatio.css';

class AspectRatio extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        let padding = (1 / this.props.ratio) * 100;
        return (
            <div className='AspectRatioContainer' style={{paddingBottom: padding.toString() + '%'}}>
                <div className='AspectRatioInner'>
                    {this.props.children}
                </div>
            </div>
        )
    }

}

export default AspectRatio;
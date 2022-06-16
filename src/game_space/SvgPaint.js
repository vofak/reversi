import React from "react";

class SvgPaint extends React.Component {

    /**
     * Constructs the Svg paint component
     * @param props
     * @param context
     */
    constructor(props, context) {
        super(props, context);
        this.canvas = React.createRef()
        this.empty = !props.picture;
        this.state = props.picture
            ? this.state = {picture: props.picture}
            : {picture: {paths: [], color: 'black'}};
    }

    /**
     * @returns {*} the structure of the svg picture
     */
    getSvgData() {
        return this.state.picture;
    }

    /**
     * Handler for the click event
     *
     * @param e click event
     */
    handleClick = (e) => {
        if (e.shiftKey) {
            this.clearCanvas();
        } else if (e.ctrlKey || !this.state.picture.point) {
            this.startNewPath(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        } else {
            this.extendCurrPath(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        }
    }

    /**
     * Clears canvas
     */
    clearCanvas() {
        this.currPath = null;
        this.empty = true;
        this.setState({picture: {paths: [], color: 'black'}});
    }

    /**
     * Changes the stroke color of the drawn picture
     *
     * @param color new stroke color
     */
    setColor(color) {
        let pic = this.state.picture;
        pic.color = color;
        this.setState({picture: pic});
    }

    /**
     * Starts new path at position
     *
     * @param x {Number} x coordinate
     * @param y {Number} y coordinate
     */
    startNewPath(x, y) {
        let pic = this.state.picture;
        pic.paths.push({x: x, y: y, r: '5', fill: 'transparent', strokeWidth: '5', d: `M ${x} ${y} `})
        pic.point = {x: x, y: y, r: '2', fill: 'red'}
        this.setState({picture: pic})
    }

    /**
     * Extends an existing path
     *
     * @param x {Number} x coordinate
     * @param y {Number} y coordinate
     */
    extendCurrPath(x, y) {
        let pic = this.state.picture;
        let path = pic.paths[pic.paths.length - 1];
        path.d += `L ${x} ${y} `;
        pic.paths[pic.paths.length - 1].d = path.d;
        pic.point = {x: x, y: y, r: '2', fill: 'red'}
        this.setState({picture: pic})
        this.empty = false;
    }

    render() {
        return (
            <svg viewBox='0 0 100 100' ref={this.canvas} onClick={this.handleClick}>
                {
                    this.state.picture.paths.map(path => {
                        return <path d={path.d} fill={path.fill} stroke='black'
                                     strokeWidth={path.strokeWidth}/>
                    })

                }
                {
                    this.state.picture.point
                        ? <circle cx={this.state.picture.point.x} cy={this.state.picture.point.y} r='2' fill='red'/>
                        : null
                }
            </svg>
        )
    }
}

export default SvgPaint;
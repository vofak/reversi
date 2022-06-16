import React from "react";

class SvgPaint extends React.Component {

    /**
     * Constructs the Svg paint component
     * @param props
     * @param context
     */
    constructor(props, context) {
        super(props, context);
        this.currPath = null;
        this.canvas = React.createRef()
        this.empty = !props.picture;
        this.state = props.picture
            ? this.state = {picture: props.picture}
            : {picture: {points: [], paths: [], color: 'black'}};
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
        } else if (e.ctrlKey || !this.currPath) {
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
        this.canvas.current.innerHTML = "";
        this.empty = true;
        this.state = {picture: {points: [], paths: [], color: 'black'}}
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

        if (!this.currPath) {
            this.currPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            this.currPath.setAttributeNS(null, "stroke", 'black');
            this.currPath.setAttributeNS(null, "stroke-width", "5");
            this.currPath.setAttributeNS(null, "fill", "transparent");
            this.currPath.setAttributeNS(null, "d", "");
            this.canvas.current.appendChild(this.currPath);

            pic.paths.push({x: x, y: y, r: '5', fill: 'transparent', strokeWidth: '5', d: ''})
        }
        let d = this.currPath.getAttributeNS(null, "d");
        d += `M ${x} ${y} `;
        this.currPath.setAttributeNS(null, "d", d);


        let path = pic.paths[pic.paths.length - 1];
        path.d += `M ${x} ${y} `;
        pic.paths[pic.paths.length - 1].d = path.d;
        this.setState({picture: pic})

        this.drawPoint(x, y);
        this.empty = false;
    }

    /**
     * Extends an existing path
     *
     * @param x {Number} x coordinate
     * @param y {Number} y coordinate
     */
    extendCurrPath(x, y) {
        let d = this.currPath.getAttributeNS(null, "d");
        d += `L ${x} ${y} `;
        this.currPath.setAttributeNS(null, "d", d);


        let pic = this.state.picture;
        let path = pic.paths[pic.paths.length - 1];
        path.d += `L ${x} ${y} `;
        pic.paths[pic.paths.length - 1].d = path.d;
        this.setState({picture: pic})

        this.empty = false;
    }

    /**
     * Draws a point on the canvas
     *
     * @param x {Number} x coordinate
     * @param y {Number} y coordinate
     */
    drawPoint(x, y) {
        let point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        point.setAttributeNS(null, "cx", x);
        point.setAttributeNS(null, "cy", y);
        point.setAttributeNS(null, "r", "2");
        point.setAttributeNS(null, "fill", "red");
        this.canvas.current.appendChild(point);
        let pic = this.state.picture;
        pic.points.push({x: x, y: y, r: '2', fill: 'red'})
        this.setState({picture: pic});
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
            </svg>
        )
    }
}

export default SvgPaint;
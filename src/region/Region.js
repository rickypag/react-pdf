import React, { Component } from 'react';
import { PropTypes } from 'prop-types'; 
import objectAssign from 'object-assign';
import style from './style';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
//import Selection from './Selection'

class Region extends Component {
	constructor (props) {
		super(props);
	}

	renderHandles () {
		return (
			<div
				onMouseDown={this.props.onCropStart}
				onTouchStart={this.props.onCropStart}
			>
				<div data-dir='se' style={style.RegionHandleSE} />
				<div data-dir='sw' style={style.RegionHandleSW} />
				<div data-dir='nw' style={style.RegionHandleNW} />
				<div data-dir='ne' style={style.RegionHandleNE} />
			</div>
		);
	}
	
	onDragStart = (e,id,x,y,w,h) => {
	  //e.preventDefault();
	  //console.log("dragging: " + x + " " + y);
	  var di = new Image();
	  di.src = "image/png";
	  e.dataTransfer.setDragImage(di, 10, 10);
	  // Run in firefox
	  //e.dataTransfer.setData("text/plain", this.id);
	  e.dataTransfer.setData("id", id);
	  e.dataTransfer.setData("x", x);
	  e.dataTransfer.setData("y", y);
	  e.dataTransfer.setData("w", w);
	  e.dataTransfer.setData("h", h);
  }
	
	render () {	
		const localStyle = {
			width: this.props.width + '%',
			height: this.props.height + '%',
			left: `${this.props.x}%`,
			top: `${this.props.y}%`
		};
		const dataRenderArgs = {
			data: this.props.data,
			isChanging: this.props.changing,
			index: this.props.index
		};
		
		/*console.log(this.props.pageId);
		console.log(this.props.x / 100 * this.props.imageWidth)// - this.props.imageOffset.left;
		console.log(this.props.y / 100 * this.props.imageHeight)// - this.props.imageOffset.top;
		console.log(this.props.width / 100 * this.props.imageWidth);
		console.log(this.props.height / 100 * this.props.imageHeight);*/
		const page = this.props.pageJSON
		
		let startX = (page.x)?page.x:0;
		let startY = (page.y)?page.y:0;
		
		const x = (this.props.x / 100 * this.props.imageWidth) + startX // - this.props.imageOffset.left;
		const y = (this.props.y / 100 * this.props.imageHeight) + startY // - this.props.imageOffset.top;
		const w = this.props.width / 100 * this.props.imageWidth;
		const h = this.props.height / 100 * this.props.imageHeight;
		
		/*console.log(x)
		console.log(y)
		console.log(page.pageid)*/
		
		return (
		<ContextMenuTrigger id="some_unique_identifier">
			<div
				draggable={true}
				onDragStart = {(e) => this.onDragStart(e,page.pageid,x,y,w,h)}
				style={objectAssign({}, style.Region, localStyle, this.props.customStyle, this.props.data.regionStyle)}
				//onMouseDown={this.props.onCropStart}
				//onTouchStart={this.props.onCropStart}
				data-wrapper="wrapper"
				>
				{this.props.handles ? this.renderHandles() : null}
				{this.props.dataRenderer ? this.props.dataRenderer(dataRenderArgs) : null}
			</div>
		</ContextMenuTrigger>
		);
	}
}

Region.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	index: PropTypes.number.isRequired,
	onCropStart: PropTypes.func.isRequired,
	handles: PropTypes.bool,
	changing: PropTypes.bool,
	dataRenderer: PropTypes.func,
	data: PropTypes.object,
	customStyle: PropTypes.object
};

module.exports = Region;

import React, { Component } from "react";
import objectAssign from 'object-assign';
import RegionSelect from '../region/RegionSelect';

export default class Overlay extends Component {
	 constructor (props) {
		super(props);
		console.log("w: " + JSON.stringify(props.style))
		this.onChange = this.onChange.bind(this);
		this.state = {
			regions: [],
			numPages: null,
			pageNumber: 1,
			style: props.style,
		};
	}
			
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  onChange (regions) {
		this.setState({
			regions: regions
		});
	}


  render() {
		const regionStyle = {
			background: 'rgba(255, 0, 0, 0)',
			'position': 'absolute',
			//'width': 1000000,
			'z-index': 1000000,
		};

    const { pageNumber, numPages, width, height } = this.state;


    return (
		<RegionSelect
			maxRegions={1}
			regions={this.state.regions}
			regionStyle={regionStyle}
			constraint
			onChange={this.onChange}
			style={{ border: '1px solid black', position: 'absolute' }}
		>				 
			<div style={this.state.style}>	
				<img src="prova.jpeg" />
			</div>
		</RegionSelect>
    );
  }
	
}

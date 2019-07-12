import React, { Component } from "react";
import objectAssign from 'object-assign';
import RegionSelect from 'react-region-select';

export default class Overlay extends Component {
	 constructor (props) {
		super(props);
		this.regionRenderer = this.regionRenderer.bind(this);
		this.onChange = this.onChange.bind(this);
		this.state = {
			regions: [],
			numPages: null,
			pageNumber: 1,
			height: this.props.height,
			width: this.props.width,
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
	
  	changeRegionData (index, event) {
		const region = this.state.regions[index];
		let color;
		switch (event.target.value) {
		case '1':
			color = 'rgba(0, 255, 0, 0.5)';
			break;
		case '2':
			color = 'rgba(0, 0, 255, 0.5)';
			break;
		case '3':
			color = 'rgba(255, 0, 0, 0.5)';
			break;
		default:
			color = 'rgba(0, 0, 0, 0.5)';
		}

		region.data.regionStyle = {
			background: color
		};
		this.onChange([
			...this.state.regions.slice(0, index),
			objectAssign({}, region, {
				data: objectAssign({}, region.data, { dataType: event.target.value })
			}),
			...this.state.regions.slice(index + 1)
		]);
	}
	
	regionRenderer (regionProps) {
		if (!regionProps.isChanging) {
			return (
				<div style={{ position: 'absolute', right: 0, bottom: '-1.5em' }}>
					<select onChange={(event) => this.changeRegionData(regionProps.index, event)} value={regionProps.data.dataType}>
						<option value='1'>Green</option>
						<option value='2'>Blue</option>
						<option value='3'>Red</option>
					</select>
				</div>
			);
		}
	}

  render() {
		const regionStyle = {
			background: 'rgba(255, 0, 0, 0)',
			'position': 'absolute',
			//'width': 1000000,
			'z-index': 1000000,
		};

    const { pageNumber, numPages } = this.state;

    return (
		<RegionSelect
			maxRegions={1}
			regions={this.state.regions}
			regionStyle={regionStyle}
			constraint
			onChange={this.onChange}
			regionRenderer={this.regionRenderer}
			style={{ border: '1px solid black', 'width': '500', position: 'absolute' }}
		>				 
			<canvas
				style={{
					display: 'block',
					userSelect: 'none',
					position: 'absolute',
					width: `${this.state.width}px`,
					height: `${this.state.height}px`,
				}}
			/>
		</RegionSelect>
    );
  }
	
}

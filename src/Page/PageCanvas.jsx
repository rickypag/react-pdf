import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import PageContext from '../PageContext';

import Overlay from './Overlay';

import RegionSelect from '../region/RegionSelect';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import '../react-contextmenu.css';

import {
  callIfDefined,
  errorOnDev,
  getPixelRatio,
  isCancelException,
  makePageCallback,
} from '../shared/utils';

import { isPage, isRotate } from '../shared/propTypes';

export class PageCanvasInternal extends PureComponent {
  constructor (props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.setParentDimensions = props.setDimensions;
		this.state = {
			regions: [],
			numPages: null,
			pageNumber: 1,
			display: props.display,
		};
  }
	
  componentDidMount() {
    this.drawPageOnCanvas();
  }

  componentDidUpdate(prevProps) {
    const { page, renderInteractiveForms } = this.props;
    if (renderInteractiveForms !== prevProps.renderInteractiveForms) {
      // Ensures the canvas will be re-rendered from scratch. Otherwise all form data will stay.
      page.cleanup();
      this.drawPageOnCanvas();
    }
  }

  componentWillUnmount() {
    this.cancelRenderingTask();

    /**
     * Zeroing the width and height cause most browsers to release graphics
     * resources immediately, which can greatly reduce memory consumption.
     */
    if (this.canvasLayer) {
      this.canvasLayer.width = 0;
      this.canvasLayer.height = 0;
      this.canvasLayer = null;
    }
  }

  cancelRenderingTask() {
    /* eslint-disable no-underscore-dangle */
    if (this.renderer && this.renderer._internalRenderTask.running) {
      this.renderer._internalRenderTask.cancel();
    }
    /* eslint-enable no-underscore-dangle */
  }

  /**
   * Called when a page is rendered successfully.
   */
  onRenderSuccess = () => {
    this.renderer = null;

    const { onRenderSuccess, page, scale } = this.props;

    callIfDefined(
      onRenderSuccess,
      makePageCallback(page, scale),
    );
  }

  /**
   * Called when a page fails to render.
   */
  onRenderError = (error) => {
    if (isCancelException(error)) {
      return;
    }

    errorOnDev(error);

    const { onRenderError } = this.props;

    callIfDefined(
      onRenderError,
      error,
    );
  }

  get renderViewport() {
    const { page, rotate, scale } = this.props;

    const pixelRatio = getPixelRatio();

    return page.getViewport({ scale: scale * pixelRatio, rotation: rotate });
  }

  get viewport() {
    const { page, rotate, scale } = this.props;

    return page.getViewport({ scale, rotation: rotate });
  }

  drawPageOnCanvas = () => {
    const { canvasLayer: canvas } = this;

    if (!canvas) {
      return null;
    }

    const { renderViewport, viewport } = this;
    const { page, renderInteractiveForms } = this.props;

    canvas.width = renderViewport.width;
    canvas.height = renderViewport.height;
    
    const w = Math.floor(viewport.width);
    const h = Math.floor(viewport.height);

    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    
    this.setState({
		height: h,
		width: w,
	});
	
	this.setParentDimensions(h, w);
	
    const renderContext = {
      get canvasContext() {
        return canvas.getContext('2d');
      },
      viewport: renderViewport,
      renderInteractiveForms,
    };

    // If another render is in progress, let's cancel it
    this.cancelRenderingTask();

    this.renderer = page.render(renderContext);

    return this.renderer.promise
      .then(this.onRenderSuccess)
      .catch(this.onRenderError);
  }
  
    onChange (regions) {
		this.setState({
			regions: regions
		});
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
		};
		
		const {display} = this.props;
		
    return (
    <Fragment>
      <canvas
        className="react-pdf__Page__canvas"
        style={{
          display: 'inline',
          userSelect: 'none',
        }}
        ref={(ref) => { this.canvasLayer = ref; }}
      />
		<RegionSelect
			maxRegions={1}
			regions={this.state.regions}
			regionStyle={regionStyle}
			constraint
			onChange={this.onChange}
			regionRenderer={this.regionRenderer}
			style={{
				border: '1px solid black',
				position: 'absolute',
				display: `${display}`,	
				width: `${this.state.width}px`,
				height: `${this.state.height}px`,
			}}
		>
			<img
				src='prova.jpega'
				width={`${this.state.width}px`}
				height={`${this.state.height}px`}
				style={{
					
				}}
			/>
		</RegionSelect>
	<ContextMenu id="some_unique_identifier">
        <MenuItem style={{'background-color': 'red'}} data={{foo: 'bar'}} onClick={this.handleClick}>
          ContextMenu Item 1
        </MenuItem>
        <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
          ContextMenu Item 2
        </MenuItem>
        <MenuItem divider />
        <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
          ContextMenu Item 3
        </MenuItem>
      </ContextMenu>
     </Fragment>
      
    );
  }
}

PageCanvasInternal.propTypes = {
  onRenderError: PropTypes.func,
  onRenderSuccess: PropTypes.func,
  page: isPage.isRequired,
  renderInteractiveForms: PropTypes.bool,
  rotate: isRotate,
  scale: PropTypes.number,
};

export default function PageCanvas(props) {
  return (
    <PageContext.Consumer>
      {context => <PageCanvasInternal {...context} {...props} />}
    </PageContext.Consumer>
  );
}

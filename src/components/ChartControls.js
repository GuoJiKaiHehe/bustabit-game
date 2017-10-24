import React, { Component } from 'react';
import  GraphicsContainer from './GraphicsContainer'
class ChartControls extends Component{


	render(){
		return (
				<div id="chart-controls-inner-container" className="big">
					<div id="chart-container" className="big">
						<GraphicsContainer/>
					</div>
				</div>
			);
	}
}

export default ChartControls;
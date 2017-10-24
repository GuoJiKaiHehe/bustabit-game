import React,{Component} from 'react'
import _ from 'lodash'
import Clib from '../game-logic/clib'
import Engine from '../game-logic/engine'
import GameSettingsStore from '../stores/GameSettingsStore'
import ChartStore from '../stores/ChartStore'
import GraphicDisplayClass from  '../components/GraphicDisplay'
import TextDisplay from '../components/TextDisplay'

import reactDOM from 'react-dom'
import '../less/main.less'

function getState(){
    return _.merge({}, ChartStore.getState(), GameSettingsStore.getState());
}

var GraphicDisplay = new GraphicDisplayClass();

class GraphicsContainer extends Component {
	constructor(props) {
		super(props);
		this.state=getState();
		this.state.nyan=false;
		
		// console.log(this.state)
	}
	getThisElementNode(){
		// console.log(this)
		return this.refs.container;
	}
	componentDidMount(){

		Engine.on({
                game_started: this._onChange.bind(this), //当游戏已经开始的时候；
                game_crash: this._onChange.bind(this), //当游戏崩溃的时候； 
                game_starting: this._onChange.bind(this),//当游戏，正在开始的时候；
                lag_change: this._onChange.bind(this), //
                nyan_cat_animation: this._onNyanAnim.bind(this) //开始动画；
            });
            GameSettingsStore.addChangeListener(this._onChange.bind(this));

            if(this.state.graphMode === 'graphics')
                GraphicDisplay.startRendering(this.refs.canvas, this.getThisElementNode.bind(this));
	}
	componentWillUnmount() {
        Engine.off({
            game_started: this._onChange.bind(this),
            game_crash: this._onChange.bind(this),
            game_starting: this._onChange.bind(this),
            lag_change: this._onChange.bind(this),
            nyan_cat_animation: this._onNyanAnim.bind(this)
        });
        GameSettingsStore.removeChangeListener(this._onChange);

        if(this.state.graphMode === 'graphics')
            GraphicDisplay.stopRendering();
    }
	_onChange(){
		// console.log('--------------------');
		// this.state.nyan=true;
		// console.log(this)
		if(this.state.nyan==true && Engine.gameState!='IN_PROGRESS'){
			this.setState({nyan:false})
		}
		var state=getState();
		if(this.state.graphMode !== state.graphMode) {
            if(this.state.graphMode === 'text')
                GraphicDisplay.startRendering(this.refs.canvas.getDOMNode(), this.getThisElementNode);
            else
                GraphicDisplay.stopRendering();
        }

            // if(this.isMounted())
                this.setState(state);
	}
	componentDidUpdate(prevProps, prevState) {
            //Detect changes on the controls size to trigger a window resize to resize the canvas of the graphics display
         if(this.state.graphMode === 'graphics' &&  this.state.controlsSize !== prevState.controlsSize)
                    GraphicDisplay.onWindowResize();
    }

    _onNyanAnim() {
        this.setState({ nyan: true });
    }

	render(){
		var textDisplay = (this.state.graphMode === 'text')? <TextDisplay/>:null
		return (
				<div id="chart-inner-container" className="big" ref="container">
					<div className="anim-count">
						<div className="nyan"></div>
					</div>
					<div className="max-profit">
						Max profit:{' '} {Engine.maxWin/1e8.toFixed(4)} {' '}'BTC'
					</div>
					<canvas ref="canvas" className=""></canvas>
					<textDisplay/>
				</div>
			);
	}
}

export default GraphicsContainer;
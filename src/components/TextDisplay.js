import React,{Component} from 'react'
import Engine from '../game-logic/engine'
import StateLib from '../game-logic/stateLib'
import Clib from '../game-logic/clib'
import GameSettingsStore from '../stores/GameSettingsStore'

class TextDisplay extends Component{
	constructor(props) {
		super(props);
		this.state={
			size:{
				inProgress: '60px',
                ended: '60px',
                starting: '60px'
			},
			theme: GameSettingsStore.getCurrentTheme()
		}
	}

	componentDidMount() {
		GameSettingsStore.addChangeListener(this._onChange);
        window.addEventListener("resize", this._calcTextValues);
        this._calcTextValues();

        var self = this;
        setTimeout(function() {
            self._update();
        }, REFRESH_TIME);
	}

	componentWillUnmount() {
		GameSettingsStore.removeChangeListener(this._onChange);
        window.removeEventListener("resize", this._calcTextValues);
	}

	_onChange(){
		if(this.isMounted())
                this.setState({ theme: GameSettingsStore.getCurrentTheme() });
	}
	_calcTextValues(){
		var onePercent = this.getDOMNode().clientWidth/100;

        function fontSizePx(times) {
            var fontSize = onePercent * times;
            return fontSize.toFixed(2) + 'px';
        }

        this.setState({
           size: {
               inProgress: fontSizePx(20),
               ended: fontSizePx(15),
               starting: fontSizePx(5)
           }
        });
	}


	_update() {
	    var self = this;

	    if(this.isMounted()) {
	        this.forceUpdate();

	        setTimeout(function() {
	            self._update();
	        }, REFRESH_TIME);
	    }
	}

	render(){
		var cId = 'text-display-container', content, color;
		switch(Engine.gameState){
			case 'IN_PROGRESS':
				if (StateLib.currentlyPlaying(Engine))
                    color = '#7cba00';
                else
                    color = (this.state.theme === 'white'? "black" : "#b0b3c1");
                content=(<div id={cId} className="in-progress" style={{fontSize:this.state.size.inProgress,color:color}}>
                			<span>{StateLib.getGamePayoutv(Engine).toFixed(2)+'x'}</span>
                		</div>)
               
               break;
            case 'ENDED':
            	content=(<div id={cId} className="ended" style={{fontSize:this.state.size.ended,color:'red'}}>
            				<span className='busted'>Busted</span>
            				<span className="at">@{Clib.formatDecimals(Engine.tableHistory[0].game_crash/100, 2)}x</span>
            			</div>)
            	break;
            case 'STARTING':
            	var timeLeft = ((Engine.startTime - Date.now())/1000).toFixed(1);
            	content=(<div id={cId} className="starting" style={{fontSize:this.state.size.starting,color:'grey'}}>
            				<span>Next round in   {timeLeft}  s</span>
            			</div>) 
            	break;

		}
		return content
	}

}



export default TextDisplay;
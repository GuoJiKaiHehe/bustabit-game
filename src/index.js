import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Mousetrap from 'mousetrap'

import registerServiceWorker from './registerServiceWorker';

Mousetrap.bind("backspace",(e)=>{
	if(!window.confirm("are you sure?")){
		if (e.preventDefault) {
            e.preventDefault();
        } else {
            // internet explorer
            e.returnValue = false;
        }
	}
})



ReactDOM.render(
			<App />,
	document.getElementById('root'));
registerServiceWorker();

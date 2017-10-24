import _ from 'lodash'

import  Dispatcher from './Dispatcher'
import AppConstants from '../constants/AppConstants'

var AppDispatcher = _.extend(new Dispatcher(),{ 
	handleViewAction: function(action) {
            this.dispatch({ //这一执行，就把dispatcher 这个类下的注册的所有函数，会在执行一遍；
                source: AppConstants.PayloadSources.VIEW_ACTION,
                action: action
            });
        }
})

export default AppDispatcher;
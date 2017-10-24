export default {
	ActionTypes:{
		//Game Actions
        PLACE_BET: null,
        PLACE_BET_SUCCESS: null,
        PLACE_BET_ERROR: null,
        CANCEL_BET: null,
        CASH_OUT: null,
        SAY_CHAT: null,

        //Strategy Actions
        RUN_STRATEGY: null,
        STOP_SCRIPT: null,
        UPDATE_SCRIPT: null,
        SELECT_STRATEGY: null,
        SET_WIDGET_STATE: null,

         //Tab Selector
        SELECT_TAB: null,

         //Controls Selector
        SELECT_CONTROL: null,
        TOGGLE_CONTROL: null,

        //Controls
        SET_BET_SIZE: null,
        SET_AUTO_CASH_OUT: null,

        //Chat
        SET_CHAT_INPUT_TEXT: null,
        SET_CHAT_HEIGHT: null,
        IGNORE_USER: null,
        CLIENT_MESSAGE: null,
        APPROVE_USER: null,
        LIST_MUTED_USERS: null,
        SET_BOTS_DISPLAY_MODE: null,
        JOIN_CHANNEL: null,

        //Game Settings
        TOGGLE_THEME: null,
        SET_CONTROLS_SIZE: null,
        SET_GRAPH_MODE: null,
        SET_CONTROLS_POSITION: null,
        SET_LEFT_WIDGET: null,
        TOGGLE_HOYTKEYS_STATE: null,

        //Hotkeys
        DOUBLE_BET: null,
        HALF_BET: null,
        //PLACE_BET (GAME ACTIONS)

        //Chart
        SELECT_CHART: null
	},
	Engine: {
	    STOP_PREDICTING_LAPSE: 300,
	    HOST: 'guojikai.cn:3842',
	    CHAT_HOST: window.document.location.host,
	    MAX_BET: 100000000 /** Max bet per game 1,000,000 Bits, this will be calculated dynamically in the future, based on the invested amount in the casino **/
	},
        PayloadSources:{
                VIEW_ACTION:null,
        },
        Animations: {
            NYAN_CAT_TRIGGER_MS: 115129 //115129ms ~ 1000x // 11552ms ~ 2x
        }
}
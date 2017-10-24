import Clib from '../game-logic/clib'
import AppConstants from '../constants/AppConstants'

export default {
	currentPlay(engine){
		if (!engine.username)
                return null;
            else
                return engine.playerInfo[engine.username];
    },
    currentlyPlaying: function(engine) {
        var currentPlay = this.currentPlay(engine);
        return currentPlay && currentPlay.bet && !currentPlay.stopped_at;
    },
    getGamePayout: function(engine) {
        if(!(engine.gameState === 'IN_PROGRESS'))
            return null;

        var elapsed;
        if((Date.now() - engine.lastGameTick) < AppConstants.Engine.STOP_PREDICTING_LAPSE) {
            elapsed = Date.now() - engine.startTime;
        } else {
            elapsed = engine.lastGameTick - engine.startTime + AppConstants.Engine.STOP_PREDICTING_LAPSE; //+ STOP_PREDICTING_LAPSE because it looks better
        }
        var gamePayout = Clib.growthFunc(elapsed);
        console.assert(isFinite(gamePayout));
        return gamePayout;
    },
     /** True if are not playing in the current game or already cashed out */
    notPlaying: function(engine) {
        var currentPlay = this.currentPlay(engine);
        return !(engine.gameState === 'IN_PROGRESS' && currentPlay && !currentPlay.stopped_at);
    },

    /** To Know if the user is betting **/
    isBetting : function(engine) {
        if (!engine.username) return false;
        if (engine.nextBetAmount) return true;
        for (var i = 0 ; i < engine.joined.length; ++i) {
            if (engine.joined[i] == engine.username)
                return true;
        }
        return false;
    },

    ///** Not playing and not betting **/
    //ableToBet: function(engine) {
    //    return this.notPlaying(engine) && !this.isBetting(engine);
    //},

    /** ====== Controls Store ====== **/


    /** Parse the bet string in bits and returns a integer **/
    parseBet: function(betStringBits) {
      return parseInt(betStringBits.replace(/k/g, '000')) * 100;
    },

    /** Convert the cash out string into an integer **/
    parseCashOut: function(cashOutString) {
        var cashOut = parseFloat(cashOutString);
        cashOut = Math.round(cashOut * 100);
        return cashOut;
    },


    /** ====== Mixed ====== **/

    canUserBet: function(balanceSatoshis, betStringBits, betInvalid, autoCashOutInvalid) {
        var betAmountSatoshis = this.parseBet(betStringBits);

        if(balanceSatoshis < 100)
            return new Error('Not enough bits to play');
        if(betInvalid)
            return new Error(betInvalid);
        if(autoCashOutInvalid)
            return new Error(autoCashOutInvalid);
        if(balanceSatoshis < betAmountSatoshis)
            return new Error('Not enough bits');

        return true;
    }
}
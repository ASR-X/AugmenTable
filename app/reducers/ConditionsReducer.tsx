import { combineReducers } from 'redux';
import { ADD_CONDITION, ADD_MODAL } from '../types';
import {conditions} from './constants'

const INITIAL_STATE = {
    current: [
     ],
    possible: conditions,
    modal: ''
  };

const conditionsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ADD_CONDITION:
        // Pulls current and possible out of previous state
        // We do not want to alter state directly in case
        // another action is altering it at the same time
        
        let possible = state.possible.slice()
        let current = state.current.slice()
        let modal = (' ' + state.modal).slice(1)

        const addedCondition = possible.splice(action.payload, 1);
        current.push(addedCondition[0]);
  
        const newState = { current, possible, modal };
  
        return newState;
      
      case ADD_MODAL:
        let mpossible = state.possible.slice()
        let mcurrent = state.current.slice()
        let mmodal = action.payload

        const mState = { current: mcurrent, possible: mpossible, modal: mmodal };
        return mState;

      default:
        return state
    }
  };

export default combineReducers({
    conditions: conditionsReducer
});
  
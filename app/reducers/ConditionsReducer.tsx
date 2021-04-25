import { combineReducers } from 'redux';
import { ADD_CONDITION, ADD_MODAL } from '../types';

const INITIAL_STATE = {
    current: [
     ],
    possible: [
      ['Nut Allergies', 'Nut allergies are caused by an immunological reaction to a protein in nuts, which can lead to severe physical reactions if there is exposure.'],
      ['Vegan', 'Veganism is a type of vegetarian diet that excludes meat, eggs, dairy products, and all other animal-derived ingredients.'],
      ['Gluten Free', 'Gluten Free is a diet that excludes gluten, a protein found in grains such as wheat, barley and rye.'],
      ['Kosher', 'Kosher foods are those that conform to the Jewish dietary regulations of kashrut, primarily derived from Leviticus and Deuteronomy.']
    ],
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
  
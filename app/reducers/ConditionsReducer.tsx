import { combineReducers } from 'redux';
import { ADD_CONDITION } from '../types'

const INITIAL_STATE = {
    current: [ 
      ['Vegan', 'Veganism is a type of vegetarian diet that excludes meat, eggs, dairy products, and all other animal-derived ingredients.'],
      ['Gluten Free', 'Gluten Free is a diet that excludes gluten, a protein found in grains such as wheat, barley and rye.']
     ],
    possible: [
      'Alice',
      'Bob',
      'Sammy',
    ],
  };

const conditionsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ADD_CONDITION:
        // Pulls current and possible out of previous state
        // We do not want to alter state directly in case
        // another action is altering it at the same time
        const {
          current,
          possible,
        } = state;
  

        const addedCondition = possible.splice(action.payload, 1);

        current.push(addedCondition);
  
        const newState = { current, possible };
  
        return newState;
  
      default:
        return state
    }
  };

export default combineReducers({
    conditions: conditionsReducer
});
  
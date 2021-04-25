import { createStore } from 'redux';
import conditionsReducer from './reducers/ConditionsReducer';


export const store = createStore(conditionsReducer);
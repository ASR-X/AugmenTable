import { ADD_CONDITION } from '../types'
export const addCondition = conditionsIndex => (
    {
      type: ADD_CONDITION,
      payload: conditionsIndex,
    }
  );
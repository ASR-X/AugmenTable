import { ADD_CONDITION, ADD_MODAL } from '../types'
export const addCondition = conditionsIndex => (
    {
      type: ADD_CONDITION,
      payload: conditionsIndex,
    }
  );
export const addModal = modalItem => (
  {
    type: ADD_MODAL,
    payload: modalItem
  }
)

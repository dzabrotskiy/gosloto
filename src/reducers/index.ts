// import { combineReducers } from 'redux';
import { initialState, State } from '../store';

const mainReducer = (state: State = initialState, action): State => {
  switch (action.type) {
    case 'ADD_NUMBER':
      const { field, number } = action;
      return {
        ...state,
        selectedNumbers: {...state.selectedNumbers,
            [field]: !state.selectedNumbers[field].includes(number) ?
                [...state.selectedNumbers[field], number] : [...state.selectedNumbers[field]]
        }
      };
    case 'ADD_ALL_NUMBERS':
        return {
            ...state,
            selectedNumbers: {...action.data}
        }
    case 'CLEAR':
        return {
            ...initialState
        }
    default:
      return state;
  }
};

export const rootReducer = mainReducer;

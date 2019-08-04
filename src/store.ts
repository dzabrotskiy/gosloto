import { createStore, compose } from 'redux';
import { rootReducer } from './reducers';

export interface State {
  selectedNumbers: {
    ['1']: Array<number>,
    ['2']: Array<number>
  },
};

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  //@ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  //@ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const configureStore = (initState) => (
  createStore(
    rootReducer,
    initState,
    composeEnhancers()
  )
);

export const initialState: State = {
  selectedNumbers: {
    '1': [],
    '2': []
  }
}

export const store = configureStore(initialState);
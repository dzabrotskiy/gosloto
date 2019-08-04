import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from './containers/app';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store';

const rootElement = document.getElementById('root');

const app = (
    <Provider store={store}>
        <AppContainer />
    </Provider>
);

render(app, rootElement);
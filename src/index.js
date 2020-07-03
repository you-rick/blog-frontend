import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.scss';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import store, {history} from './store/store';
import {Provider} from 'react-redux';
import {ConnectedRouter} from "connected-react-router";

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <CssBaseline/>
            <App/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);



import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.scss';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import store from './store/store';
import {Provider} from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <CssBaseline/>
        <App/>
    </Provider>,
    document.getElementById('root')
);



import './assets/scss/common.scss';
import './index.scss';

import React from 'react';
import { render } from 'react-dom';

import App from './App';

const rootEL = document.getElementById('root');

const AppEl =
    process.env.NODE_ENV !== 'production' ? (
        <React.StrictMode>
            <App />
        </React.StrictMode>
    ) : (
        <App />
    );

if (localStorage.getItem('persist:app-verpaar-store')) {
    render(AppEl, rootEL);
} else {
    window.setTimeout(() => render(AppEl, rootEL), 1500);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
process.env.NODE_ENV !== 'production' && import('./reportWebVitals').then((v) => v.default());

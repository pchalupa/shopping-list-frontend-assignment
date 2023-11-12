import React from 'react';
import ReactDOM from 'react-dom/client';

import '@services/i18n';

import { App } from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
import React from 'react';
import ReactDOM from 'react-dom/client';

import { enableMocking } from '@mocks/index.ts';
import '@services/i18n';

import { App } from './App.tsx';
import './index.css';

enableMocking()
    .then(() => {
        ReactDOM.createRoot(document.getElementById('root')!).render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
        );
    })
    .catch((error) => console.error(error));

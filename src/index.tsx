import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { store } from './store';
import AuthListener from './auth/AuthListener';
import LaunchGate from './components/LaunchGate';
import AuthModal from './components/AuthModal';
import './config/firebase';
import './i18n';
import './styles/tokens.css';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthListener />
        <LaunchGate>
          <App />
        </LaunchGate>
        <AuthModal />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

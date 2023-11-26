import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import DatasContextProvider from './data/DataContextProvider';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

defineCustomElements(window)
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <DatasContextProvider>
      <App />
    </DatasContextProvider>
  </React.StrictMode>
);
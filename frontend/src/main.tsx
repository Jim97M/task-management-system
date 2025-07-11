// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import { DragDropContainer } from './utils/DragDropContainer';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <DragDropContainer>
        <App />
      </DragDropContainer>
    </Provider>
  </React.StrictMode>
);

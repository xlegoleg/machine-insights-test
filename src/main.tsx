import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './index.css'
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
);
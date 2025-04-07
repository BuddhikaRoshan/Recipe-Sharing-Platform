import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import ThemeWrapper from './theme/ThemeContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeWrapper> {/* Wrap your app with dynamic theme provider */}
        <App />
      </ThemeWrapper>
    </Provider>
  </React.StrictMode>
);

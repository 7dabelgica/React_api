import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import History from './services';

import store, { persistor } from './store';
import Routes from './routes';
import Global from './styles/global';
import Header from './components/header';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={History}>
          <Header />
          <Routes />
          <Global />
          <ToastContainer autoClose={20000} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;

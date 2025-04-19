import React, { useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from './router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/main.css'
import './css/tablet.css'
import './css/mobile.css'
import './css/special.css'
import i18n from "./i18n";
import { DataContextProvider } from './dataContext';
import 'antd/dist/reset.css';
import { useSelector } from 'react-redux';

const App = () => {
  const { lang } = useSelector((state) => state.lang);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <>
      <DataContextProvider>
        <Router>
          <AnimatedRoutes />
        </Router>
        <ToastContainer />
      </DataContextProvider>
    </>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import AssemblyManuelPage from '../pages/assembly-manuel';
import ProductPage from '../pages/product';
import AssemblySuccessPage from '../pages/assembly-manuel/assembly-success';
import AssemblyFailurePage from '../pages/assembly-manuel/assembly-failure';
import AssemblyNotePage from '../pages/assembly-manuel/assembly-note';
import EmployeePage from '../pages/employee';

const AnimatedRoutes = () => {
    const location = useLocation();
    const [load, setLoad] = useState(false)
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        var auth = localStorage.getItem("auth")
        if (auth !== null) {
            auth = JSON.parse(auth)
            if (auth.accessToken) setIsAuth(true)
            else setIsAuth(false)
        }
        setTimeout(() => {
            setLoad(true)
        }, 500)
    }, [])

    return (
        <AnimatePresence>
            <Routes key={location.pathname} location={location}>
                <Route path='/' element={isAuth ? <HomePage /> : <LoginPage />} />
                <Route path='/assembly-manual' element={isAuth ? <AssemblyManuelPage /> : <LoginPage />} />
                <Route path='/assembly-success/:id' element={isAuth ? <AssemblySuccessPage /> : <LoginPage />} />
                <Route path='/assembly-note/:id' element={isAuth ? <AssemblyNotePage /> : <LoginPage />} />
                <Route path='/assembly-failure/:id' element={isAuth ? <AssemblyFailurePage /> : <LoginPage />} />
                <Route path='/employee' element={isAuth ? <EmployeePage /> : <LoginPage />} />
                <Route path='/login' element={isAuth ? <HomePage /> : <LoginPage />} />
                <Route path='/product' element={isAuth ? <ProductPage /> : <LoginPage />} />
                <Route path='/*' element={isAuth ? <HomePage /> : <LoginPage />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;

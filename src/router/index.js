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
import TechnicalDrawingPage from '../pages/technical-drawing';
import TechnicalDrawingSuccessPage from '../pages/technical-drawing/technical-drawing-success';
import TechnicalDrawingNotePage from '../pages/technical-drawing/technical-drawing-note';
import TechnicalDrawingFailurePage from '../pages/technical-drawing/technical-drawing-failure';
import TechnicalDrawingVisualNotePage from '../pages/technical-drawing/technical-drawing-visual-note';
import AssemblyVisualNotePage from '../pages/assembly-manuel/assembly-visual-note';
import UserPage from '../pages/user';
import DepartmentPage from '../pages/department';
import ProfilePage from '../pages/profile';
import AssemblyQualityPage from '../pages/assembly-quality';
import AssemblyQualityManualPage from '../pages/assembly-quality/manual';
import TechnicalDrawingQualityPage from '../pages/technical-drawing-quality';
import TechnicalDrawingQualityDrawingPage from '../pages/technical-drawing-quality/manual';
import RolePage from '../pages/role';
import CMMPage from '../pages/cmm';
import CMMModulePage from '../pages/cmm/cmm-module';
import CMMSuccessPage from '../pages/cmm/cmm-success';
import CMMNotePage from '../pages/cmm/cmm-note';
import CMMFailurePage from '../pages/cmm/cmm-failure';

const AnimatedRoutes = () => {
    const location = useLocation();
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        var auth = localStorage.getItem("auth")
        if (auth !== null) {
            auth = JSON.parse(auth)
            if (auth.accessToken) setIsAuth(true)
            else setIsAuth(false)
        }
    }, [])

    return (
        <AnimatePresence>
            <Routes key={location.pathname} location={location}>
                <Route path='/' element={isAuth ? <HomePage /> : <LoginPage />} />
                <Route path='/assembly-manual' element={isAuth ? <AssemblyManuelPage /> : <LoginPage />} />
                <Route path='/assembly-success/:id' element={isAuth ? <AssemblySuccessPage /> : <LoginPage />} />
                <Route path='/assembly-note/:id' element={isAuth ? <AssemblyNotePage /> : <LoginPage />} />
                <Route path='/assembly-visual-note/:id' element={isAuth ? <AssemblyVisualNotePage /> : <LoginPage />} />
                <Route path='/assembly-failure/:id' element={isAuth ? <AssemblyFailurePage /> : <LoginPage />} />
                <Route path='/assembly-manual/quality' element={isAuth ? <AssemblyQualityPage /> : <LoginPage />} />
                <Route path='/assembly-manual/quality/:id' element={isAuth ? <AssemblyQualityManualPage /> : <LoginPage />} />
                <Route path='/cmm' element={isAuth ? <CMMPage /> : <LoginPage />} />
                <Route path='/cmm-list' element={isAuth ? <CMMModulePage /> : <LoginPage />} />
                <Route path='/cmm-success/:id' element={isAuth ? <CMMSuccessPage /> : <LoginPage />} />
                <Route path='/cmm-note/:id' element={isAuth ? <CMMNotePage /> : <LoginPage />} />
                <Route path='/cmm-failure/:id' element={isAuth ? <CMMFailurePage /> : <LoginPage />} />
                <Route path='/department' element={isAuth ? <DepartmentPage /> : <LoginPage />} />
                <Route path='/user' element={isAuth ? <UserPage /> : <LoginPage />} />
                <Route path='/login' element={isAuth ? <HomePage /> : <LoginPage />} />
                <Route path='/product' element={isAuth ? <ProductPage /> : <LoginPage />} />
                <Route path='/profile' element={isAuth ? <ProfilePage /> : <LoginPage />} />
                <Route path='/role' element={isAuth ? <RolePage /> : <LoginPage />} />
                <Route path='/technical-drawing' element={isAuth ? <TechnicalDrawingPage /> : <LoginPage />} />
                <Route path='/technical-drawing-success/:id' element={isAuth ? <TechnicalDrawingSuccessPage /> : <LoginPage />} />
                <Route path='/technical-drawing-note/:id' element={isAuth ? <TechnicalDrawingNotePage /> : <LoginPage />} />
                <Route path='/technical-drawing-visual-note/:id' element={isAuth ? <TechnicalDrawingVisualNotePage /> : <LoginPage />} />
                <Route path='/technical-drawing-failure/:id' element={isAuth ? <TechnicalDrawingFailurePage /> : <LoginPage />} />
                <Route path='/technical-drawing/quality' element={isAuth ? <TechnicalDrawingQualityPage /> : <LoginPage />} />
                <Route path='/technical-drawing/quality/:id' element={isAuth ? <TechnicalDrawingQualityDrawingPage /> : <LoginPage />} />
                <Route path='/*' element={isAuth ? <HomePage /> : <LoginPage />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;

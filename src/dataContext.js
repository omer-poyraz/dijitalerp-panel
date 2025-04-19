import React, { createContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem('auth');
        if (storedData) {
            setAuthData(JSON.parse(storedData));
        }
    }, []);

    const updateAuthData = (newData) => {
        setAuthData(newData);
        localStorage.setItem('auth', JSON.stringify(newData));
    };

    return (
        <DataContext.Provider value={{ authData, updateAuthData }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;

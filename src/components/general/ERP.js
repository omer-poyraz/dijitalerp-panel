import React from 'react'
import Header from '../header'

const ERP = ({ children, className }) => {
    return (
        <div className='main'>
            <Header />
            <div className={`${className} cms-container page`}>
                {children}
            </div>
        </div>
    )
}

export default ERP

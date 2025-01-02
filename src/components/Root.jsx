import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer/Footer'

const Root = () => {
    return (
        <div className='light'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Root
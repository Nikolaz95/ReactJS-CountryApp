import React from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer/Footer'

const Root = () => {
    return (
        <div className='app'>
            <Header />
            <main className='app-main'>
                <Outlet />
            </main>
            <Footer />
            {/* Keyed by pathname so changing filters or pages on the home page does not jump to the top */}
            <ScrollRestoration getKey={(location) => location.pathname} />
        </div>
    )
}

export default Root

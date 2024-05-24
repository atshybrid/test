import React from 'react'
import { Outlet } from "react-router-dom";
import Footer from '../../components/Footer';

const BaseView = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default BaseView
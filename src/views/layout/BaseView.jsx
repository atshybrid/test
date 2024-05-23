import React from 'react'
import { Outlet } from "react-router-dom";
import Footer from '../../components/Footer';

const BaseView = () => {
    return (
        <main>
            <Outlet />
            <Footer />
        </main>
    )
}

export default BaseView
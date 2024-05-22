import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from "react-router-dom";
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const BaseView = () => {
    const settings = useSelector(state => state.ePaper.settings)
    return (
        <main className='relative'>
            <Header />
            <Navbar data={settings?.edition_list} />
            <div className='padding'>
                <Outlet />
            </div>
            <Footer />
        </main>
    )
}

export default BaseView
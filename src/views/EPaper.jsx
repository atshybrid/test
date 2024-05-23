import React from 'react'
import Slider from '../components/Slider'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'

const EPaper = () => {
    const settings = useSelector(state => state.ePaper.settings)
    return (
        <>
            <Header />
            <Navbar data={settings?.edition_list} />
            <div className='padding w-full xl:w-[75%]'>
                <p className='text-xl md:text-2xl xl:text-3xl text-blue-800 font-semibold mb-4'>{'MAIN EDITIONS'}</p>
                <Slider label='epaper' />
            </div>
        </>
    )
}

export default EPaper
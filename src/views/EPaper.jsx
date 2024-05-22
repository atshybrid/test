import React from 'react'
import Slider from '../components/Slider'

const EPaper = () => {
    return (
        <div className='w-full xl:w-[75%]'>
            <p className='text-xl md:text-2xl lg:text-3xl text-blue-800 font-semibold mb-4'>{'MAIN EDITIONS'}</p>
            <Slider label='epaper' />
        </div>
    )
}

export default EPaper
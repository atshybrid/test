import React, { useState } from 'react'
import { BsX } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SideBar = ({ data, isVisible, onBackdropPress, onSideMenuClose }) => {
    const settings = useSelector(state => state.ePaper.settings)
    const color = settings?.epaper_sitetheme.primary_color_code;
    return (
        <nav>
            <div
                className={`fixed z-20 h-full w-full bg-black/50 -translate-x-full transition-all ${isVisible && 'translate-x-0'}`}
                onClick={() => onBackdropPress(!isVisible)}
            >
                <section className="bg-white flex flex-col absolute left-0 top-0 h-screen min-w-[280px]">
                    <div className='flex h-16 px-2 items-center justify-between border-b border-gray-400'>
                        <img src={settings?.sitelogo} alt="Site Logo" className='h-12 object-contain border-2 border-black' />
                        <BsX
                            onClick={() => onSideMenuClose(!isVisible)}
                            className="text-3xl text-slate-500 cursor-pointer"
                        />
                    </div>
                    <div className="flex flex-col ">
                        {data?.map((item, i) => (
                            <Link key={i} className={`text-slate-500 ${color ? '' : 'hover:text-yellow-500'}  uppercase font-semibold hover:font-bold p-4 border-b border-gray-400`} onClick={item.link}>
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </nav>
    )
}

export default SideBar
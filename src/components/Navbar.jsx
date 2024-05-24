import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { BsCaretDownFill, BsFacebook, BsInstagram, BsList, BsTwitter, BsYoutube } from "react-icons/bs";

const Navbar = ({ data }) => {
    const settings = useSelector(state => state.ePaper.settings)
    const color = settings?.epaper_sitetheme.primary_color_code;

    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const [openListIndex, setOpenListIndex] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleDropdown = (index) => {
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    };

    const toggleList = (index) => {
        setOpenListIndex(openListIndex === index ? null : index);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    if (data?.length == 0) {
        return null;
    }

    const renderSocial = () => (
        <>
            <div className='bg-white p-2 shadow-sm rounded-full cursor-pointer'>
                <BsFacebook className={`size-6 ${color ? '' : 'text-blue-500'}`} style={{ color: color ? color : undefined }} />
            </div>
            <div className='bg-white p-2 shadow-sm rounded-full cursor-pointer'>
                <BsInstagram className={`size-6 ${color ? '' : 'text-blue-500'}`} style={{ color: color ? color : undefined }} />
            </div>
            <div className='bg-white p-2 shadow-sm rounded-full cursor-pointer'>
                <BsTwitter className={`size-6 ${color ? '' : 'text-blue-500'}`} style={{ color: color ? color : undefined }} />
            </div>
            <div className='bg-white p-2 shadow-sm rounded-full cursor-pointer'>
                <BsYoutube className={`size-6 ${color ? '' : 'text-blue-500'}`} style={{ color: color ? color : undefined }} />
            </div>
        </>
    );

    return (
        <nav className={`${color ? '' : 'bg-blue-500'} border-gray-200 p-4`} style={color ? { backgroundColor: color } : {}}>
            <div className="flex flex-col w-full" id="navbar-dropdown">
                <div className='flex xl:flex-row items-center justify-between'>
                    <div className='hidden xl:flex flex-1 padding-r justify-between'>
                        <ul className="flex space-x-8">
                            {data?.map((item, i) => (
                                <li key={i} className='relative'>
                                    <div className='flex items-center py-4 cursor-pointer' onClick={() => toggleDropdown(i)}>
                                        <span className="text-lg font-medium text-white uppercase">{item.edition_name}</span>
                                        <BsCaretDownFill className='ml-1 size-4 text-white' />
                                    </div>
                                    {openDropdownIndex === i && (
                                        <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                            <ul className="py-2">
                                                <li>
                                                    <a href="#" className="block text-gray-600 px-4 py-2 font-normal hover:bg-gray-100">Item 1</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="block text-gray-600 px-4 py-2 font-normal hover:bg-gray-100">Item 2</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="block text-gray-600 px-4 py-2 font-normal hover:bg-gray-100">Item 3</a>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex max-xl:flex-row max-xl:w-full max-xl:justify-between max-xl:items-center">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search..."
                            className="p-2 rounded-md"
                        />
                        <div className='hidden xl:flex space-x-4 ml-4'>
                            {renderSocial()}
                        </div>
                        <div className='hidden max-xl:block p-1 rounded-lg border-2 border-slate-500 cursor-pointer'>
                            <BsList className='size-8 text-white' onClick={() => setOpenMenu(!openMenu)} />
                        </div>
                    </div>
                </div>
                {openMenu && (
                    <>
                        <div className='flex xl:hidden flex-1 padding-r justify-between'>
                            <ul className="flex flex-col w-full">
                                {data?.map((item, i) => (
                                    <li key={i} className='w-full'>
                                        <div className='flex items-center py-4 cursor-pointer' onClick={() => toggleList(i)}>
                                            <span className="text-lg font-medium text-white uppercase">{item.edition_name}</span>
                                            <BsCaretDownFill className='ml-1 size-4 text-white' />
                                        </div>
                                        {openListIndex === i && (
                                            <ul className="bg-white w-full py-2 rounded-lg">
                                                <li>
                                                    <a href="#" className="block text-gray-600 px-4 py-2 font-normal hover:bg-gray-100 border-b border-gray-400">Item 1</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="block text-gray-600 px-4 py-2 font-normal hover:bg-gray-100 border-b border-gray-400">Item 2</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="block text-gray-600 px-4 py-2 font-normal hover:bg-gray-100">Item 3</a>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='flex xl:hidden space-x-4 mt-2'>
                            {renderSocial()}
                        </div>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar
import React, { useState } from 'react'
import { BsChevronDown } from "react-icons/bs";

const Navbar = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    if (data?.length == 0) {
        return null;
    }

    return (
        <nav className="bg-blue-700 border-gray-200 p-4">
            <div className="max-w-screen-xl flex flex-wrap items-center">
                <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 md:flex-row md:mt-0 md:border-0">
                        {data?.map((item, i) => (
                            <li key={i}>
                                <a href="#" className="block py-2 px-3 text-white bg-blue-700 capitalize" aria-current="page">{item.edition_name}</a>
                            </li>
                        ))}
                        {/* <li>
                            <a href="#" class="block py-2 px-3 text-white bg-blue-700" aria-current="page">Home</a>
                        </li>
                        <li>
                            <button onClick={toggleDropdown} class="flex items-center justify-between w-full py-2 px-3 text-white rounded hover:text-gray-100">
                                Dropdown
                                <BsChevronDown className='text-white ml-1' />
                            </button>
                            {isOpen && (
                                <div class="absolute z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                    <ul class="py-2 text-sm text-gray-700">
                                        <li>
                                            <a href="#" class="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="#" class="block px-4 py-2 hover:bg-gray-100">Settings</a>
                                        </li>
                                        <li>
                                            <a href="#" class="block px-4 py-2 hover:bg-gray-100">Earnings</a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>
                        <li>
                            <a href="#" class="block py-2 px-3 text-white hover:text-gray-100">Services</a>
                        </li>
                        <li>
                            <a href="#" class="block py-2 px-3 text-white hover:text-gray-100">Pricing</a>
                        </li>
                        <li>
                            <a href="#" class="block py-2 px-3 text-white hover:text-gray-100">Contact</a>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
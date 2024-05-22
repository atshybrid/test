import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = () => {
    const settings = useSelector(state => state.ePaper.settings)
    return (
        <header className='flex items-center max-lg:justify-center lg:padding-x py-2 lg:py-4 bg-yellow-500'>
            <Link to={'/'}>
                <img src={settings?.sitelogo} alt="Site Logo" className='h-12 sm:h-16 md:h-24 lg:h-32 object-contain border-2 border-white' />
            </Link>
        </header>
    )
}

export default Header
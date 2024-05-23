import React from 'react'
import { BsCrop, BsList } from 'react-icons/bs';
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

const Header = ({ onMenuPress, onCropPress }) => {
    const location = useLocation();
    const currentPath = location.pathname.split('/');
    const extractedPath = currentPath[1];
    const settings = useSelector(state => state.ePaper.settings)
    const color = settings?.epaper_sitetheme.primary_color_code;
    return (
        <header className={`flex items-center ${extractedPath == 'pdf-view' ? 'max-xl:justify-between' : 'max-xl:justify-center'} padding-x py-2 xl:py-4 ${color ? '' : 'bg-yellow-500'}`} style={color ? { backgroundColor: color } : {}}>
            {extractedPath == 'pdf-view' && (<BsList className='hidden text-white max-xl:block size-6' onClick={onMenuPress} />)}
            <Link to={'/'}>
                <img src={settings?.sitelogo} alt="Site Logo" className='h-12 sm:h-16 md:h-20 lg:24 xl:h-28 object-contain border-2 border-white' />
            </Link>
            {extractedPath == 'pdf-view' && (<BsCrop className='hidden text-white max-xl:block size-6' onClick={onCropPress} />)}
        </header>
    )
}

export default Header
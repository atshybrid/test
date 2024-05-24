import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-700 py-2">
            <div className="flex justify-center mx-auto">
                <div className="flex-col">
                    <p className="text-base font-medium text-slate-500 text-center mb-2">© 2024 All Rights Reserved.</p>
                    <p className="text-base font-medium text-slate-500 text-center">
                        Powered by <span className='italic text-slate-300 cursor-pointer'>Kaburllu.net</span>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-700 py-2">
            <div className="flex justify-center mx-auto">
                <div className="flex-col">
                    <p className="text-base font-medium text-slate-500 text-center mb-2">Copyright © 2024 | All Rights Reserved.</p>
                    <p className="text-base italic font-medium text-slate-300 text-center cursor-pointer">Privacy Policy</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
import React from 'react'
import { BsX } from 'react-icons/bs';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
        padding: 0,
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: 'none',
        border: 'none'
    },
};

const ModalDatePicker = ({ isModalOpen, onModalClose, selectedDate, onChangeDate }) => {
    return (
        <Modal
            isOpen={isModalOpen}
            style={customStyles}
            onRequestClose={onModalClose}
        >
            <div className='flex py-2 items-center bg-black'>
                <h1 className='flex flex-1 text-xl justify-center text-white font-bold'>Select Date</h1>
                <div className="mr-1">
                    <BsX
                        onClick={onModalClose}
                        className="text-3xl text-white cursor-pointer"
                    />
                </div>
            </div>
            <div className='p-4 pb-3'>
                <DatePicker selected={selectedDate} onChange={onChangeDate} inline />
            </div>
        </Modal>
    )
}

export default ModalDatePicker
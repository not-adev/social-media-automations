"use client"
import React,{useState} from 'react'
import { ToastContainer,toast,er } from 'react-toastify';


const SchedulePostDialogbox = ({ isOpen, onClose, onConfirm }) => {
   
    const [dateTime, setDateTime] = useState('');
    const errorToast =(e)=> toast.error(e)
    const [useNow, setUseNow] = useState(false);

    const handleConfirm = () => {

        const value = useNow ? 'now': dateTime;
        if(!value){
            errorToast("please select any one of the following ")
            return
        }
        console.log(value)
        onConfirm(value);
        onClose();  
    };

    if (!isOpen) return null;

    return (
        <div className="fixed w-full inset-0 text-black z-50 bg-black/70 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Select Date & Time</h2>

                <div className="space-y-4">
                    <label className="block">
                        <input
                            type="datetime-local"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={dateTime}
                            onChange={(e) => {
                                setDateTime(e.target.value);
                                setUseNow(false);
                            }}
                            disabled={useNow}
                        />
                    </label>

                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={useNow}
                            onChange={() => {
                                setUseNow(!useNow);
                                if (!useNow) setDateTime('');
                            }}
                        />
                        <span>Use current time (Now)</span>
                    </label>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Confirm
                    </button>
                </div>
            </div>
         
        </div>
    )
}

export default SchedulePostDialogbox



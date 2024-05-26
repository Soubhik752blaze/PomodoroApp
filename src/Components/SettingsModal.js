import React, { useState } from 'react'
import ReactSlider from 'react-slider'

function SettingsModal({ setSettingsModal, settingsInfo, setSettingsInfo }) {
    // console.log(settingsInfo)
    const [newWorkMinutes, setNewWorkMinutes] = useState(settingsInfo.workMinutes);
    const [newBreakMinutes, setNewBreakMinutes] = useState(settingsInfo.breakMinutes);
    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="w-11/12 max-w-[400px] rounded-lg border flex flex-col gap-4 border-richblack-400 bg-richblack-600 p-10">
                <div className='flex flex-col gap-2 font-semibold'>
                    <label>Work Duration : {newWorkMinutes}</label>
                    <ReactSlider className='slider'
                        thumbActiveClassName='thumb'
                        trackClassName='track'
                        value={newWorkMinutes}
                        onChange={(newValue) => setNewWorkMinutes(newValue)}
                        // value={1}
                        min={1}
                        max={60} />
                </div>

                <div className='flex flex-col gap-2 font-semibold'>
                    <label>Break Duration : {newBreakMinutes}</label>
                    <ReactSlider className='slider green'
                        thumbActiveClassName='thumb green'
                        trackClassName='track '
                        value={newBreakMinutes}
                        onChange={(newValue) => setNewBreakMinutes(newValue)}
                        // value={1}
                        min={1}
                        max={20} />
                </div>

                <div className='flex justify-end gap-4 mt-4'>
                    <button
                        className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900"
                        onClick={() => setSettingsModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className={`rounded-md py-2 px-5 font-semibold bg-yellow-100 text-richblack-800`}
                        onClick={() => {
                            setSettingsInfo({workMinutes: newWorkMinutes , breakMinutes: newBreakMinutes})
                            setSettingsModal(false)
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>


        </div>
    )
}

export default SettingsModal
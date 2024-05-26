import React from 'react'
import { IoSettingsSharp } from "react-icons/io5";
function Settings({setSettingsModal}) {
    return (
        <div className="settingsBtn mx-auto md:mt-3 p-3 flex gap-2 items-center justify-center rounded-md text-xl text-richblack-100 hover:text-richblack-800 cursor-pointer"
            onClick={() => setSettingsModal(true)}>
            <IoSettingsSharp style={{ fontSize: "1.5rem" }} />
            <p className="text-base">Settings</p>
        </div>
    )
}

export default Settings
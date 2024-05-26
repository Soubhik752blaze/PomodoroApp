import React, { useState } from "react";
import Timer from "../Components/Timer"
import Settings from "../Components/Settings";
import SettingsModal from "../Components/SettingsModal";

export default function MainScreen() {
    const [settingsModal, setSettingsModal] = useState(false);
    const [settingsInfo, setSettingsInfo] = useState({workMinutes: 25, breakMinutes: 5})

    return (
        <div className="text-richblack-200 flex justify-center items-center pt-6">
            <div className="w-3/5 mt-10 md:mt-5 md:w-[400px] flex flex-col gap-6 md:gap-4 justify-center items-center">
                <Timer settingsInfo={settingsInfo} />
                <Settings setSettingsModal={setSettingsModal} />
            </div>
            {settingsModal && <SettingsModal setSettingsModal={setSettingsModal} settingsInfo={settingsInfo} setSettingsInfo={setSettingsInfo} />}
        </div>
    )
}
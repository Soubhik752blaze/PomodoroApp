import React, { useEffect, useState, useRef } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { IoPauseSharp } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";

function Timer({ settingsInfo }) {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [mode, setMode] = useState('work');
  const [isPaused, setIsPaused] = useState(true);

  //ref is needed because in time apis, state wise updates dont happen so have to use ref 
  const secondsLeftRef = useRef(secondsLeft);
  const modeRef = useRef(mode);
  const isPausedRef = useRef(isPaused);

  Notification.requestPermission();
  const red = '#f54e4e';
  const green = '#4aec8c';
  const workStatement = 'TIME TO HUSTLE: POMODORO MODE ENGAGED! ';
  const pauseStatement = 'TIME IS TICKING! LETS GET BACK ON THE TRACK '
  const breakStatement = 'ITS BREAK TIME! TIME TO GET REFRESHED! '

  async function showNotifications() {
    let permission = await Notification.requestPermission();
    // console.log(permission);
    if (permission === 'granted') {
      const notification = new Notification('Pomodoro App', {
        body: mode === "work" ? "Session is over! Time to take a break" : "Break Time Up! Lets get back to work",
      });

      notification.onclick = function (e) {
        e.preventDefault();
      };

      setTimeout(() => {
        notification.close();
      }, 6 * 1000);
    }
  }

  function initiateTimer() {
    setMode('work');
    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);
  }

  function switchMode() {
    const newMode = modeRef.current === 'work' ? 'break' : 'work';
    const nextSeconds = newMode === 'work' ? settingsInfo.workMinutes * 60 : settingsInfo.breakMinutes * 60;

    setMode(newMode);
    modeRef.current = newMode;

    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }

  function ticktock() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    initiateTimer();

    const timer = setInterval(() => {
      if (isPausedRef.current === true) {
        return;
      }

      if (secondsLeftRef.current === 0) {
        switchMode();
        setIsPaused(true);
        isPausedRef.current = true;
        showNotifications();
      }

      else ticktock();
    }, 1000);

    return () => clearInterval(timer);
  },
    // eslint-disable-next-line
    [settingsInfo]
  )

  const totalSecondsLeft = (mode === 'work' ? settingsInfo.workMinutes * 60 : settingsInfo.breakMinutes * 60);
  const Percentage = Math.round(secondsLeft / totalSecondsLeft * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;

  if (seconds < 10)
    seconds = '0' + seconds;

  return (
    <div className='flex flex-col justify-center items-center gap-2 md:gap-1 w-full'>
      <span className='w-[150%] flex justify-center items-center text-sm md:text-lg'>
        <p className=' font-semibold text-richblack-5 mb-3
                    text-transparent bg-clip-text bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]'>
          {isPaused ? pauseStatement : mode === 'work' ? workStatement : breakStatement}
        </p>
        <p className=' font-semibold mb-3 pl-1'>
          {isPaused ? ' 😮‍💨' : mode === 'work' ? ' 😃' : ' 🥳'}
        </p>
      </span>
      <div className='md:mt-2 mt-6'>
        <CircularProgressbar
          value={Percentage}
          text={`${minutes} : ${seconds}`}
          styles={buildStyles({
            pathColor: mode === 'work' ? red : green,
            tailColor: 'rgba(255,255,255,.2)',
            textColor: '#fff',
          })}
        />
      </div>

      <div className="mx-auto mt-4 flex gap-6 items-center justify-center">
        <div className="p-3 bg-richblack-100 rounded-full text-xl text-richblack-700 cursor-pointer"
          onClick={() => {
            const ispaused = isPaused;
            setIsPaused(!ispaused);
            isPausedRef.current = !ispaused
          }}>
          {isPaused ?
            <FaPlay /> :
            <IoPauseSharp />}
        </div>

      </div>
    </div>



  )
}

export default Timer
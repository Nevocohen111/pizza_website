import React from "react";
import "../App.css";


export default function Timer() {
    const [milliseconds, setMilliseconds] = React.useState(0);
    const [timer, setTimer] = React.useState(0);
    const [minutes, setMinutes] = React.useState(0);
    const [hours, setHours] = React.useState(0);
    const [resumeTimerFlag, setResumeTimerFlag] = React.useState(false);
    const intervalRef = React.useRef();

    React.useEffect(() => {
        intervalRef.current = setInterval(() => {
            setMilliseconds((milliseconds) => milliseconds + 1);
            window.localStorage.setItem("milliseconds", milliseconds + 1);
            if (milliseconds === 99) {
                setMilliseconds(0);
                setTimer((timer) => timer + 1);
                window.localStorage.setItem("milliseconds", 0);
                window.localStorage.setItem("timer", timer + 1);
            }

            if (timer === 60) {
                setTimer(0);
                setMinutes((minutes) => minutes + 1);
                window.localStorage.setItem('timer', 0);
                window.localStorage.setItem("minutes", minutes + 1);
            }

            if (minutes === 60) {
                setMinutes(0);
                setHours((hours) => hours + 1);
                window.localStorage.setItem('minutes', 0);
                window.localStorage.setItem("hours", hours + 1);
            }
        }, 10);
        return () => {
            clearInterval(intervalRef.current);
        };
    }, [timer, minutes, hours, milliseconds]);

    React.useEffect(() => {
        setMilliseconds(JSON.parse(Number(window.localStorage.getItem("milliseconds"))));
        setTimer(JSON.parse(Number(window.localStorage.getItem("timer"))));
        setMinutes(JSON.parse(Number(window.localStorage.getItem("minutes"))));
        setHours(JSON.parse(Number(window.localStorage.getItem("hours"))));
    }, []);

    const resumeTimer = () => {
        if (resumeTimerFlag === true) {
            intervalRef.current = setInterval(() => {
                setTimer((timer) => timer + 1);
            }, 1000);
            return () => {
                clearInterval(intervalRef.current);
            }
        }else {
            console.log("Timer is already running");
        }
    }

    return (
        <div className="containerMT">
            <div className="myTimer" style={{position:'relative',top:"10rem"}}>
            <div id="countdownn">
                <div id="tilesn">
                <span>Timer</span>
                </div>
                </div>
            </div>
            <div id="countdown">
                <div id='tiles'>
                    <span style={{ position: 'relative', top: '0.4rem' }}>{hours < 10 ? 0 : null}{hours}</span>
                    <span style={{ position: 'relative', top: '0.4rem' }}>{minutes < 10 ? 0 : null}{minutes}</span>
                    <span style={{ position: 'relative', top: '0.4rem' }}>{timer < 10 ? 0 : null}{timer}</span>
                    <span style={{ position: 'relative', top: '0.4rem' }}>{milliseconds < 10 ? 0 : null}{milliseconds}</span>
                </div>
                <div className="labels">
                    <button onClick={() => { window.location.reload() }}>Refresh</button>
                    <button onClick={() => { clearInterval(intervalRef.current); setResumeTimerFlag(true) }}>Stop</button>
                    <button onClick={() => { resumeTimer(); setResumeTimerFlag(false) }}>Resume</button>
                    <button onClick={() => { setTimer(0); setMinutes(0); setHours(0); setMilliseconds(0); window.localStorage.removeItem("timer"); window.localStorage.removeItem("minutes"); window.localStorage.removeItem("milliseconds"); window.localStorage.removeItem("hours") }}>Reset</button>
                </div>
            </div>
        </div>
    )
}
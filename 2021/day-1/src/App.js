import { useState } from 'react';
import gear from './images/gear.svg';
import './App.css';

function App() {
  const [edit, setEdit] = useState(false);
  const [start, setStart] = useState(false);
  const [minutes, setMinutes] = useState(15);
  const [seconds, setSeconds] = useState(0);
  const [end, setEnd] = useState(false);

  const handleEdit = () => {
    setEdit((prev) => !prev);
  };

  const handleStartStop = () => {
    setStart((prev) => !prev);
    // stuff to do on go
    const timer = setInterval(() => {
      if (!start) clearInterval(timer);
      // if (seconds === 0) setSeconds(59);
      setSeconds((prev) => {
        if (prev === 0) {
          setMinutes((prev) => {
            if (prev === 0) return;
            return prev - 1;
          });
          return 59;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="wrapper">
      <div className={end ? 'ring ending' : 'ring'}>
        <svg width="518" height="518" viewBox="0 0 518 518">
          <circle strokeWidth="9px" x="0" y="y" cx="259" cy="259" r="254" />
        </svg>
      </div>

      <div className="timer">
        <div className="time">
          <div className="minutes">
            <input
              type="text"
              value={minutes.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
              onChange={(e) => setMinutes(e.target.value)}
              disabled={!edit}
            />
          </div>
          <div className="colon">:</div>
          <div className="seconds">
            <input
              type="text"
              value={seconds.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
              onChange={(e) => setSeconds(e.target.value)}
              disabled={!edit}
            />
          </div>
        </div>
        <button className="start" onClick={handleStartStop}>
          {start ? 'pause' : 'start'}
        </button>
        <button onClick={handleEdit} className="settings">
          <img src={gear} alt="Settings" />
        </button>
      </div>
    </div>
  );
}

export default App;

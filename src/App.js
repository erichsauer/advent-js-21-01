import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div class="wrapper">
      <div class="ring">
        <svg width="518" height="518" viewBox="0 0 518 518">
          <circle stroke-width="9px" x="0" y="y" cx="259" cy="259" r="254" />
        </svg>
      </div>

      <div class="timer">
        <div class="time">
          <div class="minutes">
            <input type="text" value="15" disabled />
          </div>
          <div class="colon">:</div>
          <div class="seconds">
            <input type="text" value="00" disabled />
          </div>
        </div>
        <button class="start">start</button>
        <button class="settings">
          <img src="images/gear.svg" alt="Settings" />
        </button>
      </div>
    </div>
  );
}

export default App;

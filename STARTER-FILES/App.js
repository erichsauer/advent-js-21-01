const minutesDisplay = document.querySelector('.minutes > input');
const secondsDisplay = document.querySelector('.seconds > input');
const start = document.querySelector('.start');
const settings = document.querySelector('.settings');
const ring = document.querySelector('.ring');

let minutes;
let seconds;

function localify(number) {
  return number.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

settings.addEventListener('click', () => {
  if (minutesDisplay.disabled) {
    minutesDisplay.disabled = false;
    secondsDisplay.disabled = false;
  } else {
    minutesDisplay.disabled = true;
    secondsDisplay.disabled = true;

    minutes = +minutesDisplay.value;
    seconds = +secondsDisplay.value;

    minutesDisplay.value = localify(minutes);
    secondsDisplay.value = localify(seconds);
  }
});

let timer;
start.addEventListener('click', () => {
  minutesDisplay.disabled = true;
  secondsDisplay.disabled = true;

  minutes = +minutesDisplay.value;
  seconds = +secondsDisplay.value;

  minutesDisplay.value = localify(minutes);
  secondsDisplay.value = localify(seconds);

  if (start.textContent === 'start') {
    start.textContent = 'pause';

    minutes = +minutesDisplay.value;
    seconds = +secondsDisplay.value;

    timer = setInterval(() => {
      if (seconds > 0) {
        seconds--;
        secondsDisplay.value = localify(seconds);
      } else {
        if (minutes > 1) {
          seconds = 59;
          minutes--;

          secondsDisplay.value = localify(seconds);
          minutesDisplay.value = localify(minutes);
        } else {
          ring.classList.add('ending');
          alert(`time's up!`);
          clearInterval(timer);
        }
      }
    }, 1000);
  } else {
    start.textContent = 'start';
    clearInterval(timer);
  }
});

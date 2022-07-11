import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const TIMER_DEADLINE = selectedDates[0];
const timerRef = document.querySelector('.timer');
const startBtn = document.querySelector('[data-start]');

const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
let timerId = null;

startBtn.setAttribute('disabled', true);
// const timer = {
//     timerId: null,
//     start(rootSelector, deadLine) {
//         let delta = deadLine - Date.now();
//         if (delta <= 0) {
//         Notify.failure('Please choose a date in the future');
//         return;
//         }
//         this.timerId = setInterval(() => {
//             now = Date.now();
//             let delta = deadLine - Date.now();
//             if (delta <= 0) {
//                 Notify.success('Time is over');
//                 clearInterval(this.timerId);
//                 return;
//             }
//         });
//     }
// }
function convertMs(diff) {
const days = Math.floor(diff / 1000 / 60 / 60  / 24);
const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
const minutes = Math.floor(diff / 1000 / 60) % 60;
const seconds = Math.floor(diff / 1000) % 60;

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => String(value).padStart(2, 0);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    startBtn.removeAttribute('disabled');

    const showTimer = () => {
      const now = new Date();
      localStorage.setItem('selectedData', selectedDates[0]);
      const selectData = new Date(localStorage.getItem('selectedData'));

      if (!selectData) return;

      const diff = selectData - now;
      const { days, hours, minutes, seconds } = convertMs(diff);
      daysRef.textContent = days;
      hoursRef.textContent = addLeadingZero(hours);
      minutesRef.textContent = addLeadingZero(minutes);
      secondsRef.textContent = addLeadingZero(seconds);

      if (
        daysRef.textContent === '0' &&
        hoursRef.textContent === '00' &&
        minutesRef.textContent === '00' &&
        secondsRef.textContent === '00'
      ) {
        clearInterval(timerId);
      }
    };

    const onClick = () => {
      if (timerId) {
        clearInterval(timerId);
      }
      showTimer();
      timerId = setInterval(showTimer, 1000);
    };

    startBtn.addEventListener('click', onClick);
  },
};

flatpickr('#datetime-picker', { ...options });
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const btnStartRef = document.querySelector('[data-start]');
const spanDaysRef = document.querySelector('[data-days]');
const spanHoursRef = document.querySelector('[data-hours]');
const spanMinutesf = document.querySelector('[data-minutes');
const spanSecondsRef = document.querySelector('[data-seconds]');

let userSelectedTime = null;
let idInterval = null;

btnStartRef.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    
    onClose(selectedDates) {
        userSelectedTime = selectedDates[0].getTime();
        if (userSelectedTime <= new Date()) {
            Notify.failure('Please choose a date in the future.')
            btnStartRef.disabled = true;
            return;
        }
        btnStartRef.disabled = false;
    },
};

flatpickr("#datetime-picker", options);

let object = {};

const onCountTime = () => {
    idInterval = setInterval(() => {
        const diff = userSelectedTime - new Date().getTime();
        if (diff <= 0) {
            clearTimeout(idInterval);
            btnStartRef.removeEventListener("click", onCountTime);
            // Notify.success('Time is over!')
            return;
        };
    object = convertMs(diff);
    onChangeContent(addLeadingZero(object));
    }, 1000)
}
function addLeadingZero(values) {
    const newValues = { ...values };
    
    const keys = Object.keys(newValues);
    for (const key of keys) {
        newValues[key] = String(newValues[key]).padStart(2, 0)
    } 
    return newValues;
}
function onChangeContent({ days, hours, minutes, seconds }) {
    spanDaysRef.textContent = days;
    spanHoursRef.textContent = hours;
    spanMinutesf.textContent = minutes;
    spanSecondsRef.textContent = seconds;
}


function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
}

btnStartRef.addEventListener("click", onCountTime);


// ----------------------Чернетка-------------------------------------------------------------
// const startBtn = document.querySelector('[data-start]');
// const daysRef = document.querySelector('[data-days]');
// const hoursRef = document.querySelector('[data-hours]');
// const minutesRef = document.querySelector('[data-minutes]');
// const secondsRef = document.querySelector('[data-seconds]');
// let timerId = null;

// startBtn.setAttribute('disabled', true);

// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = Math.floor(ms / day);
//   const hours = Math.floor((ms % day) / hour);
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// const addLeadingZero = value => String(value).padStart(2, 0);

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//     onClose(selectedDates) {
//     if (selectedDates[0] <= new Date()) {
//         Notify.failure('Please choose a date in the future');
//         startBtn.setAttribute('disabled', true);
//       return;
//     }
//     startBtn.removeAttribute('disabled');

//     const showTimer = () => {
//       const now = new Date();
//       localStorage.setItem('selectedData', selectedDates[0]);
//       const selectData = new Date(localStorage.getItem('selectedData'));

//       if (!selectedDates[0]) return;

//       const diff = selectData - now;
//       const { days, hours, minutes, seconds } = convertMs(diff);
//       daysRef.textContent = addLeadingZero(days);
//       hoursRef.textContent = addLeadingZero(hours);
//       minutesRef.textContent = addLeadingZero(minutes);
//       secondsRef.textContent = addLeadingZero(seconds);

//       if (
//         daysRef.textContent === '00' &&
//         hoursRef.textContent === '00' &&
//         minutesRef.textContent === '00' &&
//         secondsRef.textContent === '00'
//       ) {
//         clearInterval(this.timerId);
//       }
//     };

//     const onClick = () => {
//       if (timerId) {
//         clearInterval(timerId);
//       }
//       showTimer();
//       timerId = setInterval(showTimer, 1000);
//     };

//     startBtn.addEventListener('click', onClick);
//   },
// };

// flatpickr('#datetime-picker', { ...options });
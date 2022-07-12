
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Отримуємо посилання на форму для додавання слухача
const formRef = document.querySelector('.form');
// Функція для створення проміса, приймає два параметри: номер створеного проміса (position) та затримку (delay)
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(onSuccess)
      } else {
        reject(onError)
      }
    }, delay * position);
  });
};
// Функція-колбек (виклик при натісканні submit)
function onSubmit(event) {
  event.preventDefault();
  // const form = event.currentTarget;
  const dataForm = new FormData(formRef);
  for (const [key, value] of dataForm.entries()) {
    dataForm[key] = Number(value);
  }
  // Очищення форми
  formRef.reset();
  // В циклі for викликаемо функцію яка створює проміс
  for (let position = 1; position <= dataForm.amount; position += 1) {
    createPromise(position, dataForm.delay).then(onSuccess).catch(onError);
    dataForm.delay += dataForm.step;
  };
};
// Функція викликається: для метода catch, коли проміс повертає reject
function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
};
// Функція викликається: для метода then, коли проміс повертає resolve
function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};
// Додаємо слухача на форму при натисканні submit
formRef.addEventListener('submit', onSubmit);
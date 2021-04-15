console.log('Client side JavaScript file is loaded!');

// This is a client-side request and cannot be used in node
/*
fetch('http://puzzle.mead.io/puzzle')
  .then((res) => res.json())
  .then((data) => console.log(data));
*/

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch(`http://localhost:3000/weather?address=${location}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        const { forecast, location } = data;
        messageOne.textContent = forecast;
        messageTwo.textContent = location;
      }
    });
});

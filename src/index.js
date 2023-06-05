import debounce from '../node_modules/lodash/debounce'
import { alert, error, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';

defaultModules.set(PNotifyMobile, {});

const inputEl = document.querySelector('.input')
const listEl = document.querySelector('.list')

inputEl.addEventListener('input', debounce(onSearch, 1000))

function onSearch(e) {
  e.preventDefault()
  console.log(e.target.value)
  const nameOfCountry = e.target.value
  
  fetch(`https://restcountries.com/v3.1/name/${nameOfCountry}`)
  .then(response => response.json())
  .then(data => {
    const countries = data.map(country => country.name.common);
    const countCountries = countries.length;

    if (countCountries > 1) {
      listEl.innerHTML = countries.map(name => `<p>${name}</p>`).join('');
      listEl.classList.add('list-1')
    }
    
    if (countCountries === 1) {
      const country = data[0];
      listEl.classList.add('list-1')
      listEl.innerHTML = `
      <img src="${country.flags.png}" alt="${country.name.common} flag">
        <h1>${data[0].name.common}</h1>
        <p>Capital: ${data[0].capital}</p>
        <p>Population: ${data[0].population}</p>
        <p>Region: ${data[0].region}</p>
      `;
    }
  })
.catch(error=> { alert("❗️Ведіть щось❗️")} )
}

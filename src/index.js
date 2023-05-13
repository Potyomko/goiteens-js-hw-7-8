import debounce from '../node_modules/lodash/debounce'
import { alert, error, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});
 
const inputEl = document.querySelector('.input')
const listEl = document.querySelector('.list')

inputEl.addEventListener('input', debounce(onSearch, 500))

function onSearch(event) {
  event.preventDefault()
  console.log(event.target.value)
  const countryName = event.target.value
  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
  .then(response => response.json())
  .then(data => {
    const countries = data.map(country => country.name.common);
    const numCountries = countries.length;
    if (numCountries > 1) {
      listEl.innerHTML = countries.map(name => `<p>${name}</p>`).join('');
      listEl.classList.add('list-1')
    }
    if (numCountries === 1) {
      const country = data[0];
      listEl.classList.add('list-1')
      listEl.innerHTML = `
        <img src="${country.flags.png}" alt="${country.name.common} flag">
        <h1>${country.name.common}</h1>
        <p>Capital: ${country.capital[0]}</p>
        <p>Population: ${country.population}</p>
        <p>Region: ${country.region}</p
      `;
    }
  })
.catch(error=> { alert("❗️Ведіть країну❗️")} )
}
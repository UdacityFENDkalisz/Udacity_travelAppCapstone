// Webpack entry point

// Import functions 
import { submitted } from './js/app'
import { updateUI } from './js/updateUI'
import { checkLocalStorage } from './js/localStorage'
import { clearLocalStorage } from './js/localStorage'
import { apiCalls } from './js/apiCalls'
import { extractCityData } from './js/dataExtract'
import { extractForecastData } from './js/dataExtract'
import { extractMostLikedPhoto } from './js/dataExtract'
import { extractRandomPhoto } from './js/dataExtract'
import { createinfoCard } from './js/infoCard'

// Import styles 
import './styles/main.scss'
import './styles/form.scss'
import './styles/card.scss'

// Import weather icons
import './media/icons/a01d.png'
import './media/icons/a02d.png'
import './media/icons/a03d.png'
import './media/icons/a04d.png'
import './media/icons/a05d.png'
import './media/icons/a06d.png'
import './media/icons/c01d.png'
import './media/icons/c02d.png'
import './media/icons/c03d.png'
import './media/icons/c04d.png'
import './media/icons/d01d.png'
import './media/icons/d02d.png'
import './media/icons/d03d.png'
import './media/icons/f01d.png'
import './media/icons/r01d.png'
import './media/icons/r02d.png'
import './media/icons/r03d.png'
import './media/icons/r04d.png'
import './media/icons/r05d.png'
import './media/icons/r06d.png'
import './media/icons/s01d.png'
import './media/icons/s02d.png'
import './media/icons/s03d.png'
import './media/icons/s04d.png'
import './media/icons/s05d.png'
import './media/icons/s06d.png'
import './media/icons/t01d.png'
import './media/icons/t02d.png'
import './media/icons/t03d.png'
import './media/icons/t04d.png'
import './media/icons/t05d.png'
import './media/icons/u00d.png'

// Export functions to Client library
export {
    submitted,
    updateUI,
    checkLocalStorage,
    clearLocalStorage,
    apiCalls,
    extractCityData,
    extractForecastData,
    extractMostLikedPhoto,
    extractRandomPhoto,
    createinfoCard
}

// An IIFE to immediately set limits on date-picker 
// Runs as soon as page loads, earliest date is today
// Forcast API limits departure calendar to 15 days from today
(function () {
    // Get today's date
    const d = new Date()
    let minMonth = (d.getMonth() + 1).toString()
    let minDate = d.getDate().toString()
    const minYear = d.getFullYear().toString()
    // Add 0 to months and days that are < 10
    if (minMonth.length == 1) {
        minMonth = "0" + minMonth
    }
    if (minDate.length == 1) {
        minDate = "0" + minDate
    }

    // Maximum date to start forecast
    d.setDate(d.getDate() + 15)
    let maxMonth = (d.getMonth() + 1).toString()
    let maxDate = d.getDate().toString()
    const maxYear = d.getFullYear().toString()
    // Add 0 to months and days that are < 10
    if (maxMonth.length == 1) {
        maxMonth = "0" + maxMonth
    }
    if (maxDate.length == 1) {
        maxDate = "0" + maxDate
    }

    // Set minimum and maximum dates in calendar
    const formattedMinDate = `${minYear}-${minMonth}-${minDate}`
    const formattedMaxDate = `${maxYear}-${maxMonth}-${maxDate}`
    const departureDate = document.getElementById('departure-date')
    departureDate.setAttribute("min", formattedMinDate)
    departureDate.setAttribute("max", formattedMaxDate)
    const returnDate = document.getElementById('return-date')
    returnDate.setAttribute("min", formattedMinDate)

    // Add click listener on submit button
    const submitButton = document.getElementById('submit-button')
    submitButton.addEventListener('click', submitted)

    // Add listener to update the UI from local storage if it exists
    window.addEventListener('load', checkLocalStorage)

    // Add click listener to Clear Data button to erase local storage
    const clearButton = document.getElementById('clear-button')
    clearButton.addEventListener('click', clearLocalStorage)

})()
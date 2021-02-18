// Calculates the time between now and another date/time
const countdown = require('countdown')

/**
 * Responds to user input form submit button click
 * Processes initial data, calls apiCalls function and updateUI function
 * @param {click event} event User presses submit button on form
 */
export async function submitted(event) {
    // Prevents page reloading when button is clicked
    event.preventDefault()
    console.log('Event listener connected')

    // Initialise error and result fields
    const errorMessage = document.getElementById('error-message')
    errorMessage.innerHTML = ""
    document.getElementById('forecast-card-container').innerHTML = ""
    document.getElementById('how-many-sleeps').innerHTML = ""
    document.getElementById('location-image-container').innerHTML = ""
    document.getElementById('forecast-title').innerHTML = ""

    // Destination city
    const destinationCity = document.getElementById('destination-city').value
    console.log(`City: ${destinationCity}`)
    if (destinationCity == "") {
        errorMessage.innerHTML = "Please enter a destination city"
        return
    }

    // Departure date
    const departureDate = document.getElementById('departure-date').value
    if (departureDate == "") {
        errorMessage.innerHTML = "Please enter a departure date"
        return
    }
    console.log(`Departure date: ${departureDate}`)

    // Return date (not required)
    const returnDate = document.getElementById('return-date').value
    if (returnDate == "") {
        errorMessage.innerHTML = "Please enter a return date"
        return
    }
    console.log(`Return date: ${returnDate}`)

    const timeUntilTrip = getTimeUntilDate(departureDate)
    console.log(`Days until departure: ${timeUntilTrip}`)

    const timeUntilReturn = getTimeUntilDate(returnDate)
    console.log(`Days until return: ${timeUntilReturn}`)

    const tripDuration = timeUntilReturn - timeUntilTrip
    console.log(`Trip duration: ${tripDuration}`)
    if (tripDuration < 0) {
        errorMessage.innerHTML = "Return date must be after departure date"
        return
    }

    // User can select metric or imperial units
    const unitsInput = document.querySelector('input[name="units"]:checked').value
    let units = "M"
    if (unitsInput == "imperial") {
        units = "I"
    }

    // Initialise allData object with user's input and calculations above
    let allData = {}
    allData["userData"] = { destinationCity, departureDate, returnDate, timeUntilTrip, timeUntilReturn, tripDuration, units }
    console.log(allData)

    // Calls the API function, then updates the UI
    allData = await Client.apiCalls(allData)
    // If connection unsuccessful, null is returned, check for null
    if (allData != null) {
        Client.updateUI(allData)

        // Add all data to local storage
        localStorage.setItem('allData', JSON.stringify(allData))
    }
}


/**
 * Trip countdown. Checks return is after departure.
 * Set each hour to prevent rounding error. 
 * @param {string} date Date format yyyy-mm-dd
 */
function getTimeUntilDate(date) {
    const todayMilliseconds = (new Date()).setHours(1)

    const dateMilliseconds = (new Date(date)).setHours(1)
    const timeUntilDate = countdown(todayMilliseconds, dateMilliseconds, countdown.DAYS).days
    return timeUntilDate
}
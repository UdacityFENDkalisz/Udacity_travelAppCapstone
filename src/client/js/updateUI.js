/**
 * Updates the UI elements
 * @param {object} allData data acquired so far from user and APIs
 */
export function updateUI(allData) {

    // Countdown display
    let messageEnd;
    if (allData.userData.timeUntilTrip == 0) {
        messageEnd = "is today! Have a great trip!"
    } else if (allData.userData.timeUntilTrip == 1) {
        messageEnd = "is tomorrow! Have you packed?"
    } else {
        messageEnd = `is coming up in ${allData.userData.timeUntilTrip} days!`
    }
    document.getElementById('how-many-sleeps').innerHTML = `Your ${allData.userData.tripDuration + 1}-day trip to ${allData.userData.destinationCity}, ${allData.cityData.country} ${messageEnd}`

    document.getElementById('forecast-title').innerHTML = "Forecast:"


    // Image of the location
    const locationImage = document.createElement('img')
    locationImage.src = allData.photo
    locationImage.alt = `Photo taken in ${allData.userData.destinationCity}`
    locationImage.height = 225
    locationImage.width = 300
    const imageContainer = document.getElementById('location-image-container')

    // Clears previous image and adds new one
    imageContainer.innerHTML = ""

    // Create document fragment to add to DOM at once
    // Improves performance, less DOM additions
    let fragment = document.createDocumentFragment()
    fragment.append(locationImage)

    // Create the button to change the image
    const changeImageButton = document.createElement('button')
    changeImageButton.innerHTML = "Reset Image"
    changeImageButton.classList.add('change-image-button')

    // Add the click listener
    changeImageButton.addEventListener('click', () => {
        // Get photo, clear storage, set storage again
        // The reset ensures sure that same photo is available at page reload
        allData.photo = Client.extractRandomPhoto(allData.photoData)
        locationImage.src = allData.photo
        localStorage.clear()
        localStorage.setItem('allData', JSON.stringify(allData))
    })
    fragment.append(changeImageButton)
    imageContainer.append(fragment)


    fragment = document.createDocumentFragment()

    // Make a card with message if difference in date means no forecast available
    if (allData.departTimeDifference) {
        // Create the card div, data will append to this
        console.log("Making card for today with departure date finished")
        const infoCard = document.createElement('div')
        infoCard.classList.add('forecast-card')
        infoCard.innerHTML = "<h4>No forecast can be provided for this date due to the time change to your destination.</h4>"
        fragment.append(infoCard)
    }
    if (allData.arriveTimeDifference) {
        console.log("Adding card for return date")
        const infoCardContainer = document.getElementById('forecast-card-container')
        infoCardContainer.innerHTML = ""
        infoCardContainer.append(fragment)
        return
    }
    const forecasts = allData.forecastData

    // Create a forecast card for each day in the trip
    for (const forecast of forecasts) {
        const infoCard = Client.createinfoCard(forecast, allData.userData.units)

        // Append the card to the fragment for now, leave the DOM alone
        fragment.append(infoCard)
    }

    // Clear any old data from the card container and add new cards to true DOM
    const infoCardContainer = document.getElementById('forecast-card-container')
    infoCardContainer.innerHTML = ""
    infoCardContainer.append(fragment)
}
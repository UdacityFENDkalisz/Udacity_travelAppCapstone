const fetch = require('node-fetch')

/**
 * Calls each API, adds their output to allData 
 * @param {object} allData data acquired so far from user and APIs
 */
export async function apiCalls(allData) {

    // Error message DOM element and message for failure to connect
    const errorMessage = document.getElementById('error-message')
    const serverError = "Sorry, can't connect to the server."

    // Calls the Geonames API, checks for connection, input city matches
    // Assigns result to cityData key in allData 
    const geonamesData = await callServer('callgeo', allData)
    if (geonamesData == null) {
        errorMessage.innerHTML = serverError
        return null
    } else if (geonamesData.geonames.length == 0) {
        errorMessage.innerHTML = `We can't find ${allData.userData.destinationCity}. Please check the spelling and try again.`
        return null
    }
    allData["cityData"] = Client.extractCityData(geonamesData)
    console.log(allData.cityData)

    // Calls the Weatherbit API, checks for connection
    // Assigns result to forecastData key in allData 
    const weatherData = await callServer('callweather', allData)
    if (weatherData == null) {
        errorMessage.innerHTML = serverError
        return null
    }
    allData["forecastData"] = Client.extractForecastData(weatherData, allData)
    console.log(allData.forecastData)

    // Calls the Pixabay API, checks for connection
    // Assigns result URL to photo key in allData object
    const photoData = await callServer('callphoto', allData)
    if (photoData == null) {
        errorMessage.innerHTML = serverError
        return null
    }
    allData["photo"] = Client.extractMostLikedPhoto(photoData)
    allData["photoData"] = photoData
    console.log(allData.photo)

    // Calls the storedata route to store allData in server variable
    const storeMessage = await callServer('storedata', allData)
    console.log(storeMessage)

    // Return modified allData object
    return allData
}

/**
 * Calls the server side routes
 * @param {string} url Contains the route to server
 * @param {object} allData data acquired so far from user and APIs
 */
export async function callServer(url, allData) {
    try {
        const response = await fetch(`http://localhost:8087/${url}`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            // Body data type must match "Content-Type" header        
            body: JSON.stringify(allData)
        })
        // Return null if server route was not found
        if (!response.ok) {
            console.log(`Error connecting to http://localhost:8087/${url}. Response status ${response.status}`)
            return null
        }
        const responseJSON = await response.json()
        return responseJSON
        // Return null if can't connect to server 
    } catch (error) {
        console.log(`Error connecting to server: ${error}`)
        return null
    }
}
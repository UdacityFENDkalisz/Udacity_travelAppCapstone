/**
 * Extracts information from Geonames API 
 * @param {object} geonameData Data returned from Geonames API
 */
export function extractCityData(geonamesData) {
    const longitude = geonamesData.geonames[0].lng
    const latitude = geonamesData.geonames[0].lat
    const country = geonamesData.geonames[0].countryName
    const population = geonamesData.geonames[0].population

    return { latitude, longitude, country, population }
}

/**
 * Extracts forecast information from Weatherbit API data
 * @param {object} weatherbitData Data returned from Weatherbit API
 * @param {integer} timeUntilTrip Number of days until trip start date
 * @param {integer} timeUntilReturn Number of days until trip end date
 */
export function extractForecastData(weatherbitData, allData) {

    // An array to hold objects each representing 1 day of forecast data
    const forecastData = []

    let timeUntilTrip = allData.userData.timeUntilTrip
    let timeUntilReturn = allData.userData.timeUntilReturn
    const departureDate = allData.userData.departureDate

    // Checks for time differences of local and destination times and adjusts 
    allData["departTimeDifference"] = false
    allData["arriveTimeDifference"] = false
    if (!(departureDate == weatherbitData.data[timeUntilTrip].valid_date)) {
        console.log(`Date difference between user and destination detected!`)
        // If departure date matches the next element in the forecast array, 
        // start at next element in the array
        if (departureDate == weatherbitData.data[timeUntilTrip + 1].valid_date) {
            console.log(`Destination current local date is 1 day behind user's date`)
            timeUntilTrip += 1
            timeUntilReturn += 1
            // Otherwise current local date must be 1 date after user's date
        } else {
            console.log(`Destination current local date is 1 day ahead of user's date`)
            if (timeUntilTrip > 0) {
                timeUntilTrip -= 1
            } else {
                // User departs today, but today's date is finished at destination
                allData.departTimeDifference = true
                console.log("departTimeDifference is true")
            }
            if (timeUntilReturn > 0) {
                timeUntilReturn -= 1
            } else {
                // User returns today but today's date is finished at destination
                allData.arriveTimeDifference = true
                console.log("FinishedAtDestination is true")
            }
        }
    }

    // counter max is 15 (API returns max 16 days data)
    let lastForecastDay = 15
    if (timeUntilReturn < 15) {
        lastForecastDay = timeUntilReturn
    }
    // Grab the weather information
    for (let i = timeUntilTrip; i <= lastForecastDay; i++) {
        const date = weatherbitData.data[i].valid_date
        const windSpeed = weatherbitData.data[i].wind_spd
        const windDirection = weatherbitData.data[i].wind_dir
        const highTemperature = weatherbitData.data[i].high_temp
        const lowTemperature = weatherbitData.data[i].low_temp
        const chancePrecipitation = weatherbitData.data[i].pop
        const precipitation = weatherbitData.data[i].precip
        const snow = weatherbitData.data[i].snow
        const humidity = weatherbitData.data[i].rh
        const description = weatherbitData.data[i].weather.description
        const icon = weatherbitData.data[i].weather.icon

        // Add an object containing all extracted weather information for this data to array
        forecastData.push({ date, windSpeed, windDirection, highTemperature, lowTemperature, chancePrecipitation, precipitation, snow, humidity, description, icon })
    }
    return forecastData
}

/**
 * Extracts the most-liked photo 
 * @param {object} photoData Data from Pixabay API
 */
export function extractMostLikedPhoto(photoData) {
    // Holds the most number of likes so far
    let topLikes = 0
    let chosenPhoto = ""
    // Largest value of a "page" in returned photo results
    let count = 100
    // Set count lower if fewer than count results were returned
    if (photoData.totalHits < count) {
        count = photoData.totalHits
    }
    // Check number of likes, compare with most liked and replace as necessary
    for (let i = 0; i < count; i++) {
        if (photoData.hits[i].likes > topLikes) {
            chosenPhoto = photoData.hits[i].webformatURL
            topLikes = photoData.hits[i].likes
        }
    }
    console.log(`Top photo had ${topLikes} likes`)
    return chosenPhoto
}

/**
 * Extracts a random photo from the list
 * @param {object} photoData Data returned from Pixabay API
 */
export function extractRandomPhoto(photoData) {
    // Largest value of a "page" in returned photo results
    let count = 100
    // Set count lower if fewer than count results were returned
    if (photoData.totalHits < count) {
        count = photoData.totalHits
    }
    // Use numberOfPhotos-1 because this will be an array index
    const randomNumber = Math.round(Math.random() * (count - 1))
    console.log(`Random photo chosen #${randomNumber + 1} of ${count}`)
    const randomPhoto = photoData.hits[randomNumber].webformatURL

    return randomPhoto
}
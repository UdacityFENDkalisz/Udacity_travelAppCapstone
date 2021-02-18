/**
 * Creates a card for each day of the forecast
 * @param {object} forecast Contains info about single day 
 * @param {string} units M or I
 */
export function createinfoCard(forecast, units) {

    // Assign units of measure
    let temperatureUnit = "C"
    let speedUnit = "m/s"
    let depthUnit = "mm"
    if (units == "I") {
        temperatureUnit = "F"
        speedUnit = "mph"
        depthUnit = "in"
    }

    // Create the card div, data appends here
    const infoCard = document.createElement('div')
    infoCard.classList.add('forecast-card')

    // Create the date div, calculate day of week
    const dateDiv = document.createElement('div')
    dateDiv.classList.add('date')
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dayOfWeekNumber = new Date(forecast.date).getDay()
    const dayOfWeek = days[dayOfWeekNumber]
    dateDiv.innerHTML = `<h3 class="card-date">${forecast.date}<br>${dayOfWeek}</h3>`

    // Create icon div for image
    const icon = document.createElement('img')
    icon.classList.add('icon')
    icon.src = `./media/icons/${forecast.icon}.png`
    icon.alt = ""

    // Create weather description div
    const descriptionDiv = document.createElement('div')
    descriptionDiv.classList.add('description')
    descriptionDiv.innerHTML = forecast.description

    // Create high temperature div
    const highTemperatureDiv = document.createElement('div')
    highTemperatureDiv.classList.add('high-temperature')
    highTemperatureDiv.classList.add('size')
    highTemperatureDiv.innerHTML = `High temperature: ${forecast.highTemperature}°${temperatureUnit}`

    // Create low temperature div
    const lowTemperatureDiv = document.createElement('div')
    lowTemperatureDiv.classList.add('low-temperature')
    lowTemperatureDiv.classList.add('size')
    lowTemperatureDiv.innerHTML = `Low temperature: ${forecast.lowTemperature}°${temperatureUnit}`

    // Create precipitation % div
    const chancePrecipitationDiv = document.createElement('div')
    chancePrecipitationDiv.classList.add('chance-precipitation')
    chancePrecipitationDiv.classList.add('size')
    chancePrecipitationDiv.innerHTML = `Precipitation: ${forecast.chancePrecipitation}%`

    // Create amount of precipitation div
    const precipitationDiv = document.createElement('div')
    precipitationDiv.classList.add('precipitation')
    precipitationDiv.classList.add('size')
    precipitationDiv.innerHTML = `Precipitation amount: ${forecast.precipitation.toFixed(1)}${depthUnit}`

    // Create amount of snow div
    const snowDiv = document.createElement('div')
    snowDiv.classList.add('snow')
    snowDiv.classList.add('size')
    snowDiv.innerHTML = `Snow: ${forecast.snow.toFixed(1)}${depthUnit}`

    // Create humidity div
    const humidityDiv = document.createElement('div')
    humidityDiv.classList.add('humidity')
    humidityDiv.classList.add('size')
    humidityDiv.innerHTML = `Humidity: ${forecast.humidity}%`

    // Create wind speed div
    const windDiv = document.createElement('div')
    windDiv.classList.add('wind-speed')
    windDiv.classList.add('size')
    windDiv.innerHTML = `Windspeed: ${forecast.windSpeed.toFixed(1)}${speedUnit}`

    // Append all data to the card element created above
    infoCard.append(dateDiv)
    infoCard.append(icon)
    infoCard.append(descriptionDiv)
    infoCard.append(highTemperatureDiv)
    infoCard.append(lowTemperatureDiv)
    infoCard.append(humidityDiv)
    infoCard.append(chancePrecipitationDiv)
    infoCard.append(precipitationDiv)
    infoCard.append(snowDiv)
    infoCard.append(windDiv)

    return infoCard
}
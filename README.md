# Travel App

## Description
This is the capstone project for Udacity's Front End Nanodegree. The project takes a user's destination location and travel dates to return a weather forecast for their trip. The app uses 3 APIs:

* [Geonames API](http://www.geonames.org/) - gets latitude and longitude for location
* [Weatherbit API](https://www.weatherbit.io/) - gets weather forecast for the latitude and longitude
* [Pixabay API](https://pixabay.com/)  - gets photo for the location

Local server running on *Node* and *Express* is used.

## Prerequisite
This project runs on a local server. It uses *Node*. If you don't have *Node* already installed on your machine, you can download it [**here**](https://nodejs.org/en/download/).

You must have an API key for each of the 3 APIs listed above.

After you get your API keys, locate the *.env-infoRequired* file and add your personal API information, as below:

```
GEONAMES_USERNAME = {your key here}
WEATHERBIT_KEY = {your key here}
PIXABAY_KEY = {your key here}
```
Once you have added your keys to the template file, change its name to *.env*

## Installation & Running the Application
If *Node* is installed, then you can use the *Node Package Manager (npm)* to install the packages needed to run this program. In the terminal, use this command:

```
npm install
```
After the packages are installed, the following commands can be used to to run the development server, build the production, and start the express server. Note hot-loading is enabled when running the *dev* command.

```
npm run dev (Builds the application for development.)
npm run build (Builds the application for production.)
npm run start (Starts the node server AFTER the production application is built)
```

## Using the App
The server is set to **port 8087**. Start the server with the command as described in the previous section.

To load the page, set your browser's address bar to:

```
http://localhost:8087/
```
The app should now be ready to use! Enter:

* **Destination city (required)** - The city/location where you'll travel to. App will return an error if the API can't find it. Spelling is important. If your entry is returning a city with the same name in a different location, you can add the country or state, for example:

```
Sydney Canada
```

* **Departure date (required)** - You can choose any date from today until 15 days from now. The weather forecast API is limited to showing dates in the next 16 days, so if your trip departs after this, please check back closer to your departure date.
* **Return date (required)** - You can enter any date on or after your departure date. The limit for the weather forecast API is 16 days, so your forecast will not be shown if your trip continues further out than that. 
* **Units (required)** - You can choose metric or imperial units:
    * metric:
        * **℃** for temperature
        * **m/s** for wind speed
        * **mm** for precipitation amount
    * imperial:
        * **℉** for temperature
        * **mph** for wind speed
        * **in** for precipitation amount

Press the **Submit** button after all data have been entered.

The app returns an image for the destination location. If it can't find one for that particular location, it will choose one for the country instead. You can change the image randomly by clicking the **Change Image** button.

The app returns a forecast card for each date of the trip, up until a maximum of 15 days after today. Each card contains the following information:

* date
* icon for the weather condition
* text for the weather condition
* high temperature
* low temperature
* relative humidity
* chance of precipitation
* precipitation amount
* snow amount
* wind speed

The app uses the browser's local storage to save the last set of data that was entered. The information should load when you come back to the page. You can overwrite the data with a new submission, or, if you want to clear the storage and start fresh, click the **Reset** button, which will clear local storage and reload the page.


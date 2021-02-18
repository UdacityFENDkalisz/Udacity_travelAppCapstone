import { callServer } from '../src/client/js/apiCalls'

describe("Test API call", () => {

    it("returns good data", async () => {
        const lotsOfData = {
            userData: {
                departureDate: "2021-02-24",
                destinationCity: "London",
                returnDate: "2021-02-27",
                timeUntilReturn: 9,
                timeUntilTrip: 6,
                tripDuration: 3,
                units: "M"
            }
        }
        const response = await callServer('callgeo', lotsOfData)
        expect(response.geonames[0].countryName).toBe('United Kingdom')
    })

})
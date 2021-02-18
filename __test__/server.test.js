//check explanation at https://zellwk.com/blog/endpoint-testing/

const app = require('../src/server/server')
const supertest = require('supertest')
const request = supertest(app)

describe("Tests function storeData", () => {

    it("returns a message to confirm data storage", async () => {
        const response = await request.post('/storedata', "testData")
        expect(response.body.message).toBe("Data successfully received and stored")
    })

    it("confirms status 200", async () => {
        const response = await request.post('/storedata', "testData")
        expect(response.status).toBe(200)
    })
})
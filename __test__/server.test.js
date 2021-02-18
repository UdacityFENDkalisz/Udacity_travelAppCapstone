//check explanation at https://zellwk.com/blog/endpoint-testing/

const app = require('../src/server/server')
const supertest = require('supertest')
const request = supertest(app)

describe("Tests the endpoint", () => {
    it('Gets the test endpoint', async done => {
        const res = await request.get('/retrieve')
        done()
    })
})
const request = require("supertest")("https://kasir-api.belajarqa.com")
const expect = require("chai").expect;
const { login } = require('../../../helper/auth');

let accessToken;

before(async () => {
    try {
        accessToken = await login();
        } catch (error) {
            throw error;
        }
}); 

describe('GET /units Positive', function() {
    it('Get Unit List with valid data', async function() {
        const response = await request
                        .get('/units')
                        .set('Authorization', `Bearer ${accessToken}`);
        console.log(await response.body);
        expect(await response.status).to.equal(200);
        expect(await response.body.status).to.eql("success");
        //expect(await response.body.data.unit.description).to.include("satuannya adalah kilogram");
    });
});

describe("GET /units Negative", () => {
    it('Get Unit List without Access Token', async function() {
        const response = await request
                        .get(`/units/xx`)
            console.log((await response).body)
            expect((await response).status).to.equal(401);     
            expect((await response).body.message).to.equal("Missing authentication"); 
    });
});
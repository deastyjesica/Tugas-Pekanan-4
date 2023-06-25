const request = require("supertest")("https://kasir-api.belajarqa.com")
const expect = require("chai").expect;
const { login } = require('../../../helper/auth');
const { unittIdd } = require("../../../helper/unittIdd");
let accessToken;
let unitId;

before(async () => {
    try {
        accessToken = await login();
        unitId = await unittIdd();
        } catch (error) {
            throw error;
        }
}); 

describe('GET /units/{unitId} Positive', function() {
    it('Get Unit Detail with valid data', async function() {
        const response = await request
                        .get(`/units/${unitId}`)
                        .set('Authorization', `Bearer ${accessToken}`);
        console.log(await response.body);
        expect(await response.status).to.equal(200);
        expect(await response.body.data.unit.name).to.eql("kilogram");
        expect(await response.body.data.unit.description).to.include("satuannya adalah kilogram");
    });
});

describe("GET /units/{unitId} Negative", () => {
    it('Nama tidak sesuai', async function() {
        const response = await request
                        .get(`/units/xx`)
                        .set('Authorization', `Bearer ${accessToken}`);
            console.log((await response).body)
            expect((await response).status).to.equal(404);     
            expect((await response).body.status).to.equal("fail");
            expect((await response).body.message).to.equal("id tidak valid"); 
    });
});
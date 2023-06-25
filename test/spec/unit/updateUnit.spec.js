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

describe('put /units/{unitId} Positive', function() {
    it('Update Unit with valid data', async function() {
        const addUnit = {
            "name": 'newton',
            "description": 'satuannya adalah newton (N)',
        };
        const response = await request
                        .put(`/units/${unitId}`)
                        .set('Authorization', `Bearer ${accessToken}`)
                        .send(addUnit);
        console.log(await response.body);
        expect(await response.status).to.equal(200);
        expect(await response.body.status).to.eql("success");
        //expect(await response.body.data.unit.description).to.include("satuannya adalah newton (N)");
    });
});

describe("put /units/{unitId} Negative", () => {
    it('Update Unit Invalid Data', async function() {
        const addUnit = {
            "name": 'newton',
            "description": 'satuannya adalah newton (N)',
        };
        const response = await request
                        .put(`/units/xx`)
                        .set('Authorization', `Bearer ${accessToken}`)
                        .send(addUnit);
            console.log((await response).body)
            expect((await response).status).to.equal(404);     
            expect((await response).body.status).to.equal("fail");
            expect((await response).body.message).to.equal("id tidak valid"); 
    });
});
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

describe("POST /units Positive", () => {
    it('Add Unit with valid accessToken', async function() {
        const addUnit = {
            "name": 'kilogram',
            "description": 'satuannya adalah kilogram',
        };
        const response = await request
                        .post('/units')
                        .set('Authorization', `Bearer ${accessToken}`)
                        .send(addUnit);
          
        console.log(await response.body)
        expect(await response.statusCode).to.eql(201);
        expect(await response.body.status).to.equal("success");
        expect(await response.body.data.name).to.eql("kilogram");
        unitId = await response.body.data.unitId;
        //console.log(response);
    });
});

describe("POST /units Negative", () => {
    it('Add Unit with invalid accessToken', async function() {
        const addUnit = {
            "name": 'kilogram',
            "description": 'satuannya adalah kilogram',
        };
        const response = await request
                        .post('/units')
                        .send(addUnit);
        console.log(await response.body)
        expect((await response).status).to.equal(401);
        expect((await response).body.error).to.equal("Unauthorized"); 
    });
});
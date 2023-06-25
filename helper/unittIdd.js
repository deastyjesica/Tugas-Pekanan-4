const request = require('supertest');
const { login } = require('./auth');
const baseUrl = 'https://kasir-api.belajarqa.com';

let accessToken;
let unitId;

async function unittIdd() {
    try {
        accessToken = await login();
    
        const addUnit = {
            name: 'kilogram',
            description: 'satuannya adalah kilogram',
        };
  
        const createResponse = await request(baseUrl)
            .post('/units')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(addUnit);
    
        unitId = createResponse.body.data.unitId;
  
        return unitId;
    } catch (error) {
        throw error;
    }
}
  
module.exports = {
    unittIdd,
};
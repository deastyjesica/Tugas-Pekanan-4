const request = require('supertest');
const baseUrl = 'https://kasir-api.belajarqa.com';

async function login() {
  try {
    const loginResponse = await request(baseUrl)
      .post('/authentications')
      .send({
        email: 'dsty89@gmail.com',
        password: 'Qwerty89!',
      });

    return loginResponse.body.data.accessToken;
  } catch (error) {
    throw error;
  }
}

module.exports = {
    login,
}
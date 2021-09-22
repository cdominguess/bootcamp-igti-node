const request = require('supertest');
const app = require('../src/app');

describe('Testes de integração', () => {
    test('Responder http 200 na raiz', () => {
        return request(app).get('/').then(
            res => expect(res.status).toBe(200)
        )
    });

    test('Responder http 200 na raiz (com async)', async () => {
        const res = await request(app).get('/');

        expect(res.status).toBe(200);
    });
});
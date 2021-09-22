const supertest = require('supertest');

const request = supertest('http://localhost:5678');

test('Servidor iniciado na porta 5678', async() => {
    const response = await request.get('/');
    
    expect(response.status).toBe(200);
});
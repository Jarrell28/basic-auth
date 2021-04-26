'use strict';

//3rd party libs
const supertest = require('@code-fellows/supergoose');
const base64 = require('base-64');

//Internal files
const server = require('../src/server.js');
const authMiddleware = require('../src/auth/authMiddleware.js');

const mockRequest = supertest(server);

describe("Web Server", () => {

    it('should create a new user', async () => {
        const response = await mockRequest.post('/signup').send({ username: 'jarrell28', password: 'password' });

        expect(response.status).toBe(201);

    })

    it('should signin users using basic auth', async () => {
        await mockRequest.post('/signup').send({ username: 'jarrell2', password: 'password' });

        const encodedString = base64.encode('jarrell2:password');
        const response = await mockRequest.post('/signin').set('authorization', `Basic ${encodedString}`);

        expect(response.status).toBe(200);
    })
});

describe('Auth Middleware', () => {
    const encodedString = base64.encode('jarrell2:password');

    let req = {
        headers: {
            authorization: encodedString
        }
    }

    let res = {};
    let next = jest.fn();

    it('should test auth middleware processing basic auth header', async () => {
        await authMiddleware(req, res, next);
        expect(next).toHaveBeenCalledWith();
    })
})

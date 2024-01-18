import { app } from '@/app';
import request from 'supertest';

describe('Auth Router', () => {
    describe('POST /register', () => {
        it('should register a new user successfully', async () => {
            const userData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@doe.com',
                password: '123456',
                role: 'seller'
            };

            const response = await request(app).post('/v1/auth/register').send(userData);

            expect(response.body).toHaveProperty('token');
            expect(response.body).toHaveProperty('user');
            expect(response.statusCode).toBe(201);
        });
    });

    describe('POST /login', () => {
        it('should login a user successfully', async () => {
            const userData = {
                email: 'john@doe.com',
                password: '123456'
            };

            const response = await request(app).post('/v1/auth/login').send(userData);

            expect(response.body).toHaveProperty('token');
            expect(response.body).toHaveProperty('user');
            expect(response.statusCode).toBe(200);
        });
    });
});

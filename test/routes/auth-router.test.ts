import { app } from '@/app';
import { faker } from '@faker-js/faker';
import { users } from '@test/jest-setup';
import request from 'supertest';

describe('Auth Router', () => {
    describe('POST /register', () => {
        it('should register a new user successfully', async () => {
            const userData = {
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
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
                email: users.seller.email,
                password: users.seller.password
            };

            const response = await request(app).post('/v1/auth/login').send(userData);

            expect(response.body).toHaveProperty('token');
            expect(response.body).toHaveProperty('user');
            expect(response.statusCode).toBe(200);
        });
    });
});

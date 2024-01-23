import { app } from '@/app';
import { users } from '@test/jest-setup';
import request from 'supertest';

describe('Company Router', () => {
    describe('GET /v1/companies', () => {
        it('should return 401 if authorization header is missing', async () => {
            const response = await request(app).get('/v1/companies');
            expect(response.statusCode).toBe(401);
        });

        it('should return 403 if user is not an admin', async () => {
            const response = await request(app)
                .get('/v1/companies')
                .set('Authorization', `Bearer ${users.seller.token}`);
            expect(response.statusCode).toBe(403);
        });

        it('should get all companies successfully', async () => {
            const response = await request(app)
                .get('/v1/companies')
                .set('Authorization', `Bearer ${users.admin.token}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });
    });

    describe('POST /v1/companies', () => {
        it('should return 401 if authorization header is missing', async () => {
            const response = await request(app).post('/v1/companies');
            expect(response.statusCode).toBe(401);
        });

        it('should create a new company successfully', async () => {
            const response = await request(app)
                .post('/v1/companies')
                .set('Authorization', `Bearer ${users.sellerWithoutCompany.token}`)
                .send({ name: 'Test Company' });
            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('_id');
            expect(response.body).toHaveProperty('name', 'Test Company');
        });
    });
});

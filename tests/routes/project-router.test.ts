import { app } from '@/app';
import { users } from '@test/jest-setup';
import request from 'supertest';

describe('Project Router', () => {
    describe('GET /v1/projects', () => {
        it('should return 401 if authorization header is missing', async () => {
            const response = await request(app).get('/v1/projects');
            expect(response.statusCode).toBe(401);
        });

        it('should get all projects successfully', async () => {
            const response = await request(app)
                .get('/v1/projects')
                .set('Authorization', `Bearer ${users.seller.token}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });
    });

    describe('POST /v1/projects', () => {
        it('should return 401 if authorization header is missing', async () => {
            const response = await request(app).post('/v1/projects');
            expect(response.statusCode).toBe(401);
        });

        it('should return 403 if user is not a seller', async () => {
            const response = await request(app)
                .post('/v1/projects')
                .set('Authorization', `Bearer ${users.buyer.token}`);
            expect(response.statusCode).toBe(403);
        });

        it('should return 404 if user does not have a company', async () => {
            const response = await request(app)
                .post('/v1/projects')
                .set('Authorization', `Bearer ${users.sellerWithoutCompany.token}`);
            expect(response.statusCode).toBe(404);
        });

        it('should create project successfully', async () => {
            const response = await request(app)
                .post('/v1/projects')
                .set('Authorization', `Bearer ${users.seller.token}`)
                .send({ name: 'Test Project' });
            expect(response.statusCode).toBe(201);
            expect(response.body).toBeInstanceOf(Object);
        });
    });

    // describe('GET /v1/projects/:_id', () => {
    //     const projectId = '5f9d88d3f4d1a9a6d1a9a6d1';
    //     it('should return 401 if authorization header is missing', async () => {
    //         const response = await request(app).get(`/v1/projects/${projectId}`);
    //         expect(response.statusCode).toBe(401);
    //     });

    //     it('should return 400 if project id is missing', async () => {
    //         const response = await request(app)
    //             .get('/v1/projects/')
    //             .set('Authorization', `Bearer ${users.seller.token}`);
    //         expect(response.statusCode).toBe(400);
    //     });

    //     it('should return 404 if project does not exist', async () => {
    //         const response = await request(app)
    //             .get('/v1/projects/5f9d88d3f4d1a9a6d1a9a6d1')
    //             .set('Authorization', `Bearer ${users.seller.token}`);
    //         expect(response.statusCode).toBe(404);
    //     });

    //     // it('should get project successfully', async () => {
    //     //     const response = await request(app)
    //     //         .get('/v1/projects/1')
    //     //         .set('Authorization', `Bearer ${users.seller.token}`);
    //     //     expect(response.statusCode).toBe(200);
    //     //     expect(response.body).toBeInstanceOf(Object);
    //     // });
    // });
});

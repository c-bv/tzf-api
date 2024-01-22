import { app } from '@/app';
import { users } from '@test/jest-setup';
import request from 'supertest';

describe('User Router', () => {
    describe('GET /v1/users', () => {
        it('should return 401 if authorization header is missing', async () => {
            const response = await request(app).get('/v1/users');
            expect(response.statusCode).toBe(401);
        });

        it('should return 403 if user is not an admin', async () => {
            const response = await request(app).get('/v1/users').set('Authorization', `Bearer ${users.seller.token}`);
            expect(response.statusCode).toBe(403);
        });

        it('should get all users successfully', async () => {
            const response = await request(app).get('/v1/users').set('Authorization', `Bearer ${users.admin.token}`);
            expect(response.statusCode).toBe(200);
        });
    });

    describe('GET /v1/users/me', () => {
        it('should return 401 if authorization header is missing', async () => {
            const response = await request(app).get('/v1/users/me');
            expect(response.statusCode).toBe(401);
        });

        it('should get user successfully', async () => {
            const response = await request(app)
                .get('/v1/users/me')
                .set('Authorization', `Bearer ${users.seller.token}`);
            expect(response.statusCode).toBe(200);
        });
    });

    describe('GET /v1/users/:_id', () => {
        it('should return 401 if authorization header is missing', async () => {
            const response = await request(app).get(`/v1/users/${users.seller._id}`);
            expect(response.statusCode).toBe(401);
        });

        it('should return 403 if user is not an admin or the user itself', async () => {
            const response = await request(app)
                .get(`/v1/users/${users.buyer._id}`)
                .set('Authorization', `Bearer ${users.seller.token}`);
            expect(response.statusCode).toBe(403);
        });

        it('should get user successfully', async () => {
            const response = await request(app)
                .get(`/v1/users/${users.seller._id}`)
                .set('Authorization', `Bearer ${users.seller.token}`);
            expect(response.statusCode).toBe(200);
        });
    });

    describe('DELETE /v1/users/:_id', () => {
        it('should return 401 if authorization header is missing', async () => {
            const response = await request(app).delete(`/v1/users/${users.seller._id}`);
            expect(response.statusCode).toBe(401);
        });

        it('should return 403 if user is not an admin', async () => {
            const response = await request(app)
                .delete(`/v1/users/${users.buyer._id}`)
                .set('Authorization', `Bearer ${users.seller.token}`);
            expect(response.statusCode).toBe(403);
        });

        it('should delete user successfully', async () => {
            const response = await request(app)
                .delete(`/v1/users/${users.buyer._id}`)
                .set('Authorization', `Bearer ${users.admin.token}`);
            expect(response.statusCode).toBe(200);
        });
    });

    describe('PATCH /v1/users/:_id/verify', () => {
        it('should return 401 if authorization header is missing', async () => {
            const response = await request(app).patch(`/v1/users/${users.seller._id}/verify`);
            expect(response.statusCode).toBe(401);
        });

        it('should return 403 if user is not an admin', async () => {
            const response = await request(app)
                .patch(`/v1/users/${users.seller._id}/verify`)
                .set('Authorization', `Bearer ${users.seller.token}`);
            expect(response.statusCode).toBe(403);
        });

        it('should toggle user verification status successfully', async () => {
            const response = await request(app)
                .patch(`/v1/users/${users.seller._id}/verify`)
                .set('Authorization', `Bearer ${users.admin.token}`);
            expect(response.statusCode).toBe(200);
        });
    });

    describe('PATCH /v1/users/:_id/activate', () => {
        it('should return 401 if authorization header is missing', async () => {
            const response = await request(app).patch(`/v1/users/${users.seller._id}/activate`);
            expect(response.statusCode).toBe(401);
        });

        it('should return 403 if user is not an admin', async () => {
            const response = await request(app)
                .patch(`/v1/users/${users.seller._id}/activate`)
                .set('Authorization', `Bearer ${users.seller.token}`);
            expect(response.statusCode).toBe(403);
        });

        it('should toggle user activation status successfully', async () => {
            const response = await request(app)
                .patch(`/v1/users/${users.seller._id}/activate`)
                .set('Authorization', `Bearer ${users.admin.token}`);
            expect(response.statusCode).toBe(200);
        });
    });
});

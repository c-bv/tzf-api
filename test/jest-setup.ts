import { faker } from '@faker-js/faker';
import { TUser } from '@models';
import { tokenService, userService } from '@services';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer: MongoMemoryServer;

const ROLES = ['admin', 'seller', 'buyer'];

export const users: Record<string, any> = {
    admin: null,
    seller: null,
    buyer: null
};

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    await Promise.all(
        ROLES.map(async role => {
            const user = await userService.createUser({
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                role: role as TUser['role']
            });
            const token = tokenService.generateAuthToken(user);
            // @ts-expect-error - toObject() is not defined on UserDocument
            const userobj = user.toObject();
            users[role] = { ...userobj, token };
        })
    );
});

afterAll(async () => {
    try {
        if (mongoose.connection.readyState !== 0) {
            const { collections } = mongoose.connection;
            for (const key in collections) {
                const collection = collections[key];
                await collection.deleteMany({});
            }
            await mongoose.disconnect();
        }
        if (mongoServer) await mongoServer.stop();
    } catch (error) {
        console.error('Error during test teardown:', error);
    }
});

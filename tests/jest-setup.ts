import { faker } from '@faker-js/faker';
import { TUser } from '@models';
import { companyService, projectService, tokenService, userService } from '@services';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer: MongoMemoryServer;

const USERS = ['admin', 'seller', 'sellerWithoutCompany', 'buyer'];

export const users: Record<string, any> = {
    admin: null,
    seller: null,
    sellerWithoutCompany: null,
    buyer: null
};

export const projets: Record<string, any> = {
    project: null
};

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    await Promise.all(
        USERS.map(async user => {
            const newUser = await userService.createUser({
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                role: user === 'sellerWithoutCompany' ? ('seller' as TUser['role']) : (user as TUser['role'])
            });
            if (user === 'seller' || user === 'buyer') {
                const newCompany = await companyService.createCompany({
                    name: faker.company.name(),
                    users: [newUser._id]
                });
                await userService.updateUser(newUser._id, { company: newCompany._id });
            }
            const token = tokenService.generateAuthToken(newUser);
            // @ts-expect-error - toObject() is not defined on UserDocument
            const userobj = newUser.toObject();
            users[user] = { ...userobj, token };
        })
    );
    const newProject = await projectService.createProject({
        name: faker.commerce.productName(),
        company: new mongoose.Types.ObjectId(users.seller.company)
    });
    projets.project = newProject.toObject();
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

import { pathsToModuleNameMapper, type JestConfigWithTsJest } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const jestConfig: JestConfigWithTsJest = {
    testTimeout: 10000,
    verbose: true,
    preset: 'ts-jest/presets/js-with-ts-esm',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['dotenv/config', '<rootDir>/tests/jest-setup.ts'],
    roots: ['<rootDir>'],
    modulePaths: [compilerOptions.baseUrl],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' })
};

export default jestConfig;

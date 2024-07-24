import type {Config} from 'jest';

const config: Config = {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.tsx?$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    moduleNameMapper: {
        '\\.module\\.css$': '<rootDir>/__mocks__/styleMock.ts',
        '\\.css$': '<rootDir>/__mocks__/styleMock.ts',
    },
    setupFiles: ['<rootDir>/setupTests.ts']
};

export default config;
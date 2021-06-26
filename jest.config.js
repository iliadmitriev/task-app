module.exports = {

    verbose: true,

    testEnvironment: 'jsdom',

    moduleFileExtensions: [
        'js',
        'json',
        'vue'
    ],

    moduleNameMapper: {
        "^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
        // enable import beginning with @/ - as reference to <root>/src/ folder
        "^@/(.*)$": "<rootDir>/src/$1"
    },

    modulePathIgnorePatterns: [
        '<rootDir>/build/',
        '<rootDir>/dist/',
        '<rootDir>/coverage/'
    ],

    transform: {
        '.*\\.(vue)$': 'vue-jest',
        '.*\\.(js)$': 'babel-jest'
    },

    // By default Jest doesn't transform node_modules
    // Assuming that they are valid JS files
    // But sometimes authors doesn't compile their sources,
    // implying that you will do it
    // So you have to tell jest to transform specific node_modules
    // even though they are should be compiled already
    transformIgnorePatterns: [
        'node_modules/(?!register-service-worker)'
    ],

    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,vue}', '!**/node_modules/**'],
    coveragePathIgnorePatterns: ['src/registerServiceWorker.js'],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    },

}
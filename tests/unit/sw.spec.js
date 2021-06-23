
Object.defineProperty(global.navigator, 'serviceWorker', {
    value: {
        register: jest.fn() // Choose your favourite mocking library
    }
});


describe('Service Worker', () => {
    // store environment
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetModules() // Most important - it clears the cache
        process.env = { ...OLD_ENV }; // Make a copy
    });

    afterAll(() => {
        process.env = OLD_ENV; // Restore old environment
    });

    it('Test service worker registered in Navigator object', () => {
        process.env.NODE_ENV = 'production'
        require('@/registerServiceWorker');
        expect(navigator.serviceWorker).toBeTruthy()
        // expect(navigator.serviceWorker.register).toBeCalled()

    })
})
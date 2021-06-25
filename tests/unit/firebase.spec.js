import {httpFirebase} from "@/store/firebase";

global.fetch = jest.fn()

describe('Firebase API', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('Check Firebase API returned 404', async () => {
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                status: 404,
                json: () => Promise.resolve({}),
            })
        );

        const result = await httpFirebase(undefined, '/')
        expect(result).toBe(null)

    })
})
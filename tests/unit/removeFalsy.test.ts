import { Extarray } from '../../src/index';

describe('Extarray#removeFalsy', () => {
    test('is valid', () => {
        const origin = [
            -1,
            -0,
            0,
            +0,
            1,
            2,
            3,
            NaN,
            true,
            false,
            'hello',
            '',
            null,
            undefined,
        ];
        const target = new Extarray(...origin);
        expect(target.removeFalsy().shorten()).toEqual(
            origin.filter(
                (value) =>
                    value !== false && value !== null && value !== undefined
            )
        );
    });

    test('case bigInt', () => {
        const origin = [0n, 1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n, 9n];
        const target = new Extarray(...origin);
        expect(target.removeFalsy().length).toBe(10);
    });
});

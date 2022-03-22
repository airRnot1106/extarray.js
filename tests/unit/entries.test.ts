import { Extarray } from '../../src/index';

describe('Extarray#entries', () => {
    test('is valid', () => {
        const origin = [0, 1, 2, 3, 4];
        const target = new Extarray(...origin);
        expect([...target.entries()].map((entry) => entry.shorten())).toEqual([
            ...origin.entries(),
        ]);
    });
});

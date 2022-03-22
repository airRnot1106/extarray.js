import { Extarray } from '../../src/index';

describe('Extarray#reverse', () => {
    test('is valid', () => {
        const origin = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const target = new Extarray(...origin);
        expect(target.reverse().shorten()).toEqual(origin.reverse());
        expect(target.shorten()).toEqual(origin);
    });
});

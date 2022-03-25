import { Extarray } from '../../src/index';

describe('Extarray#push', () => {
    test('is valid', () => {
        const origin = [0, 1, 2, 3, 4];
        const target = new Extarray(...origin);
        expect(target.push(5, 6)).toEqual(origin.push(5, 6));
        expect(target.shorten()).toEqual(origin);
    });
});

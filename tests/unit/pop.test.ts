import { Extarray } from '../../src/index';

describe('Extarray#pop', () => {
    test('is valid', () => {
        const origin = [0, 1, 2, 3, 4];
        const target = new Extarray(...origin);
        expect(target.pop()).toEqual(origin.pop());
        expect(target.shorten()).toEqual(origin);
    });
});

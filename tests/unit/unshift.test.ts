import { Extarray } from '../../src/index';

describe('Extarray#unshift', () => {
    test('is valid', () => {
        const origin = [0, 1, 2, 3];
        const target = new Extarray(...origin);
        expect(target.unshift(4, 5)).toEqual(origin.unshift(4, 5));
        expect(target.shorten()).toEqual(origin);
    });
});

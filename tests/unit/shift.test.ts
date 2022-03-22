import { Extarray } from '../../src/index';

describe('Extarray#shift', () => {
    test('is valid', () => {
        const origin = [0, 1, 2, 3, 4];
        const target = new Extarray(...origin);
        expect(target.shift()).toEqual(origin.shift());
        expect(target.shorten()).toEqual(origin);
    });
});

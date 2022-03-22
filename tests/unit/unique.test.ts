import { Extarray } from '../../src/index';

describe('Extarray#unique', () => {
    test('is valid', () => {
        const origin = [0, 1, 1, 2, 3, 1, 4, 2, 5, 6, 7, 4, 8, 1, 2, 9, 0];
        const target = new Extarray(...origin);
        expect(target.unique().shorten()).toEqual([...new Set(origin)]);
    });
});

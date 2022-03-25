import { Extarray } from '../../src/index';

describe.each([
    [new Extarray(0, 1, 2), true],
    [[0, 1, 2], false],
    [new Extarray('a', 'b', 'c'), true],
    [['a', 'b', new Extarray('c')], false],
])('Extarray.isExtarray', (target, expected) => {
    test('is valid', () => {
        expect(Extarray.isExtarray<unknown, unknown>(target)).toBe(expected);
    });
});

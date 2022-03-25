import { Extarray } from '../../src/index';

describe.each([
    [0],
    [1],
    [2],
    [3],
    [4],
    [-1],
    [-2],
    [-3],
    [-4],
    [-5],
    [Infinity],
    [-Infinity],
])('Extarray#at', (index) => {
    test('is valid', () => {
        const origin = [0, 1, 2, 3, 4];
        const target = new Extarray(...origin);
        expect(target.at(index)).toBe(origin.at(index));
    });
});

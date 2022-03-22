import { Extarray } from '../../src/index';

describe.each([
    [1, 3, 4],
    [-1, 4, 2],
    [8, 5, 3],
    [3, 1, 2],
])('Extarray#copyWithin', (iTarget, start, end) => {
    test('is valid', () => {
        const origin = [0, 1, 2, 3, 4];
        const target = new Extarray(...origin);
        expect(target.copyWithin(iTarget, start, end).shorten()).toEqual(
            origin.copyWithin(iTarget, start, end)
        );
    });
});

import { Extarray } from '../../src/index';

describe.each([[1], [2], [3], [4], [5], [Infinity], [-1], [undefined]])(
    'Extarray#flat',
    (depth) => {
        test('is valid', () => {
            const origin = [0, 1, [2, 3], [4, 5, [6, 7], [[8], 9]]];
            const target = new Extarray(...origin);
            expect(target.flat(depth).shorten()).toEqual(origin.flat(depth));
        });
    }
);

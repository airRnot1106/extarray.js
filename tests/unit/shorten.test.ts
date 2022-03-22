import { Extarray } from '../../src/index';

describe.each([[[0, 1, 2, 3, 4]], [['a', 'b', 'c', 'd', 'e']]])(
    'Extarray$shorten',
    (expected) => {
        test('is valid', () => {
            const target = Extarray.extend<number | string>(expected);
            expect(target.shorten()).toEqual(expected);
        });
    }
);

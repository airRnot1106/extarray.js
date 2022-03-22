import { Extarray } from '../../src/index';

describe('Extarray.extendAll', () => {
    test('for [0, 1, [2, 3], [4, [5, 6]], [7, [8, [9]]]]', () => {
        const target = Extarray.extendAll([
            0,
            1,
            [2, 3],
            [4, [5, 6]],
            [7, [8, [9]]],
        ]);
        const expected = new Extarray<unknown>(
            0,
            1,
            new Extarray<unknown>(2, 3),
            new Extarray<unknown>(4, new Extarray<unknown>(5, 6)),
            new Extarray<unknown>(
                7,
                new Extarray<unknown>(8, new Extarray<unknown>(9))
            )
        );
        expect(target).toEqual(expected);
    });
});

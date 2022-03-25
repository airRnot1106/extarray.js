import { Extarray } from '../../src/index';

describe('Extarray#extractCommon', () => {
    test('case all normal array', () => {
        const origin = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const target = Extarray.extend(origin);
        const result = target.extractCommon(
            [1, 2, 3, 5, 7, 9],
            [3, 4, 6, 7, 8, 9],
            [1, 2, 3, 9]
        );
        expect(result).toEqual(new Extarray(3, 9));
        expect(Extarray.isExtarray(result)).toBeTruthy();
    });

    test('case all extarray', () => {
        const origin = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const target = Extarray.extend(origin);
        const result = target.extractCommon(
            Extarray.extend([1, 2, 3, 5, 7, 9]),
            Extarray.extend([3, 4, 6, 7, 8, 9]),
            Extarray.extend([1, 2, 3, 9])
        );
        expect(result).toEqual(new Extarray(3, 9));
        expect(Extarray.isExtarray(result)).toBeTruthy();
    });

    test('case mixed', () => {
        const origin = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const target = Extarray.extend(origin);
        const result = target.extractCommon(
            [1, 2, 3, 5, 7, 9],
            Extarray.extend([3, 4, 6, 7, 8, 9]),
            [1, 2, 3, 9]
        );
        expect(result).toEqual(new Extarray(3, 9));
        expect(Extarray.isExtarray(result)).toBeTruthy();
    });
});

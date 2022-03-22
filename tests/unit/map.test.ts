import { Extarray } from '../../src/index';

describe('Extarray#map', () => {
    test('is valid', () => {
        const origin = [1, 4, 9, 16];
        const target = new Extarray(...origin);
        expect(target.map((value) => (value *= 2)).shorten()).toEqual(
            origin.map((value) => value * 2)
        );
        expect(target.map((_value, _index, array) => array).shorten()).toEqual(
            origin.map((_value, _index, array) => array)
        );
    });
});

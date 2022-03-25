import { Extarray } from '../../src/index';

describe('Extarray#slice', () => {
    test('is valid', () => {
        const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
        const target = new Extarray(...animals);
        expect(target.slice().shorten()).toEqual(animals.slice());
        expect(target.shorten()).toEqual(animals);
        expect(target.slice(3).shorten()).toEqual(animals.slice(3));
        expect(target.shorten()).toEqual(animals);
        expect(target.slice(2, 4).shorten()).toEqual(animals.slice(2, 4));
        expect(target.shorten()).toEqual(animals);
    });

    test.each([
        [0, 1],
        [2, -1],
        [3, 100],
        [-1, undefined],
    ])('case various value', (start, end) => {
        const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
        const target = new Extarray(...animals);
        expect(target.slice(start, end).shorten()).toEqual(
            animals.slice(start, end)
        );
        expect(target.shorten()).toEqual(animals);
    });
});

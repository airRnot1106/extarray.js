import { Extarray } from '../../src/index';

describe('Extarray#swap', () => {
    test('is valid', () => {
        const origin = [0, 1, 2, 3, 4];
        const target = new Extarray(...origin);
        expect(target.swap(1, 4).shorten()).toEqual([0, 4, 2, 3, 1]);
        expect(() => {
            target.swap(2, 5);
        }).toThrow('Cannot swap with empty items');
    });

    test('case over length', () => {
        const origin = [0, 1, 2, 3, 4];
        const target = new Extarray(...origin);
        expect(() => {
            target.swap(2, 5);
        }).toThrow('Cannot swap with empty items');
    });

    test('case negative number', () => {
        const origin = [0, 1, 2, 3, 4];
        const target = new Extarray(...origin);
        expect(() => {
            target.swap(-1, 2);
        }).toThrow('Cannot swap with empty items');
    });
});

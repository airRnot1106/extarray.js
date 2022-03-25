import { Extarray } from '../../src/index';

describe('Extarray.createRandomNumbers', () => {
    test('is valid range', () => {
        const length = 10;
        const target = Extarray.createRandomNumbers(length);
        expect(target.length).toBe(length);
        for (let i = 0; i < length; i++) {
            expect(target.at(i)).toBeGreaterThanOrEqual(0);
            expect(target.at(i)).toBeLessThanOrEqual(length - 1);
        }
    });

    test('is valid range and max', () => {
        const length = 10;
        const max = 5;
        const target = Extarray.createRandomNumbers(length, max);
        expect(target.length).toBe(length);
        for (let i = 0; i < length; i++) {
            expect(target.at(i)).toBeGreaterThanOrEqual(0);
            expect(target.at(i)).toBeLessThanOrEqual(max - 1);
        }
    });

    test('is valid range and type', () => {
        const length = 100;
        const target = Extarray.createRandomNumbers(length, length, 1);
        expect(target.length).toBe(length);
        expect(target.unique().length).toBe(length);
    });

    test('case invalid max', () => {
        const length = 100;
        const max = 0;
        const target = Extarray.createRandomNumbers(length, max, 1);
        expect(target.length).toBe(length);
        expect(target.unique().length).toBe(length);
    });
});

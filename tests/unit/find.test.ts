import { Extarray } from '../../src/index';

describe('Extarray#find', () => {
    test('is valid', () => {
        const origin = [5, 12, 8, 130, 44];
        const target = new Extarray(...origin);
        expect(target.find((element) => element > 10)).toBe(
            origin.find((element) => element > 10)
        );
    });

    test('case not found', () => {
        const origin = [5, 12, 8, 130, 44];
        const target = new Extarray(...origin);
        expect(target.find((element) => element === 10)).toBe(
            origin.find((element) => element === 10)
        );
    });
});

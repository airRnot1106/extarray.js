import { Extarray } from '../../src/index';

describe('Extarray#findIndex', () => {
    test('is valid', () => {
        const origin = [5, 12, 8, 130, 44];
        const target = new Extarray(...origin);
        expect(target.findIndex((element) => element > 10)).toBe(
            origin.findIndex((element) => element > 10)
        );
    });

    test('case not found', () => {
        const origin = [5, 12, 8, 130, 44];
        const target = new Extarray(...origin);
        expect(target.findIndex((element) => element === 10)).toBe(
            origin.findIndex((element) => element === 10)
        );
    });
});

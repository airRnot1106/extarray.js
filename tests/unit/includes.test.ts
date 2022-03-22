import { Extarray } from '../../src/index';

describe('Extarray#includes', () => {
    test('is valid', () => {
        const origin = [0, 3, 1, 54, 21];
        const target = new Extarray(...origin);
        expect(target.includes(3)).toBe(origin.includes(3));
    });

    test('case not found', () => {
        const origin = [0, 3, 1, 54, 21];
        const target = new Extarray(...origin);
        expect(target.includes(2)).toBe(origin.includes(2));
    });
});

import { Extarray } from '../../src/index';

describe('Extarray#length', () => {
    test('is valid', () => {
        const origin = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const target = new Extarray(...origin);
        expect(target.length).toBe(origin.length);
        origin[10] = 10;
        target.set(10, 10);
        expect(target.length).toBe(origin.length);
        origin[20] = 20;
        target.set(20, 20);
        expect(target.length).toBe(origin.length);
    });
});

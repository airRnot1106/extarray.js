import { Extarray } from '../../src/index';

describe('Extarray#forEach', () => {
    test('is valid', () => {
        const origin = [0, 1, 2, 3, 4];
        const target = new Extarray(...origin);
        target.forEach((value, index, array) => {
            expect(array).toEqual(origin);
            expect(value).toBe(origin[index]);
        });
    });
});

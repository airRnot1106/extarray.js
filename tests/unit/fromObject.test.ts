import { Extarray } from '../../src/index';

describe('Extarray.fromObject', () => {
    test('is valid', () => {
        const target = Extarray.fromObject({
            a: 1,
            b: 2,
            c: 3,
        });
        expect(target.length).toBe(3);
        expect(target.at(0)).toEqual({ a: 1 });
        expect(target.at(1)).toEqual({ b: 2 });
        expect(target.at(2)).toEqual({ c: 3 });
        expect(target.at(3)).toBeUndefined();
    });
});

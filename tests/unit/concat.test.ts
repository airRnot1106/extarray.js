import { Extarray } from '../../src/index';

describe('Extarray#concat', () => {
    test('case normal array', () => {
        const origin = [0, 1, 2];
        const toAdd = [3, 4, 5];
        const target = new Extarray(...origin);
        const expected = new Extarray(...origin, ...toAdd);
        expect(target.concat(...toAdd)).toEqual(expected);
    });

    test('case extarray array', () => {
        const origin = [0, 1, 2];
        const toAdd = new Extarray(3, 4, 5);
        const target = new Extarray(...origin);
        const expected = new Extarray(...origin, ...toAdd);
        expect(target.concat(toAdd)).toEqual(expected);
    });

    test('case deep extarray array', () => {
        const origin = [0, 1, 2];
        const toAdd = [3, new Extarray(4), 5];
        const target = new Extarray(...origin);
        const expected = new Extarray(...origin, ...toAdd);
        expect(target.concat(...toAdd)).not.toEqual(expected);
    });
});

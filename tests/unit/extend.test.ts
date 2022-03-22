import { Extarray } from '../../src/index';

describe('Extarray.extend', () => {
    test('for number[]', () => {
        const target = Extarray.extend([0, 1, 2, 3]);
        const expected = new Extarray(0, 1, 2, 3);
        expect(target).toEqual(expected);
    });
});

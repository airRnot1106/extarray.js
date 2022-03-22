import { Extarray } from '../../src/index';

describe('Extarray#drop', () => {
    test('is valid', () => {
        const origin = [0, 1, 2, 3, 4];
        const target = new Extarray(...origin);
        expect(target.drop().shorten()).toEqual([]);
    });
});

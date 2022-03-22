import { Extarray } from '../../src/extarray';

describe('Extarray#toString', () => {
    test('is valid', () => {
        const origin = [1, 2, 'a', '1a'];
        const target = new Extarray(...origin);
        expect(target.toString()).toBe(origin.toString());
    });
});

import { Extarray } from '../../src/index';

describe('Extarray#indexOf', () => {
    test('is valid', () => {
        const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
        const target = new Extarray(...beasts);
        expect(target.indexOf('camel')).toBe(beasts.indexOf('camel'));
        expect(target.indexOf('camel', 3)).toBe(beasts.indexOf('camel', 3));
    });
});

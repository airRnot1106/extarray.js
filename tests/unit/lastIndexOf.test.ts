import { Extarray } from '../../src/index';

describe('Extarray#lastIndexOf', () => {
    test('is valid', () => {
        const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
        const target = new Extarray(...beasts);
        expect(target.lastIndexOf('camel')).toBe(beasts.lastIndexOf('camel'));
        expect(target.lastIndexOf('camel', 3)).toBe(
            beasts.lastIndexOf('camel', 3)
        );
        expect(target.lastIndexOf('camel', -1)).toBe(
            beasts.lastIndexOf('camel', -1)
        );
    });
});

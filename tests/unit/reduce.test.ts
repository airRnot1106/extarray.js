import { Extarray } from '../../src/index';

describe('Extarray#reduce', () => {
    test('is valid', () => {
        const origin = ['0', '1', '2', '3', '4'];
        const target = new Extarray(...origin);
        const reducer = <T>(prev: T, curr: T) => `${prev}${curr}`;
        expect(target.reduce(reducer)).toBe(origin.reduce(reducer));
        expect(target.reduce(reducer, '-')).toBe(origin.reduce(reducer, '-'));
    });
});

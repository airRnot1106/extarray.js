import { Extarray } from '../../src/index';

describe('Extarray#reduceRight', () => {
    test('is valid', () => {
        const origin = ['0', '1', '2', '3', '4'];
        const target = new Extarray(...origin);
        const reducer = <T>(prev: T, curr: T) => `${prev}${curr}`;
        expect(target.reduceRight(reducer)).toBe(origin.reduceRight(reducer));
        expect(target.reduceRight(reducer, '-')).toBe(
            origin.reduceRight(reducer, '-')
        );
    });
});

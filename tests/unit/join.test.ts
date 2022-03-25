import { Extarray } from '../../src/index';

describe('Extarray#join', () => {
    test('is valid', () => {
        const elements = ['Fire', 'Air', 'Water'];
        const target = new Extarray(...elements);
        expect(target.join()).toBe(elements.join());
        expect(target.join('')).toBe(elements.join(''));
        expect(target.join('-')).toBe(elements.join('-'));
    });
});

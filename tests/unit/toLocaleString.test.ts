import { Extarray } from '../../src/extarray';

describe('Extarray#toLocaleString', () => {
    test('is valid', () => {
        const origin = [1, 'a', new Date('21 Dec 1997 14:12:00 UTC')];
        const target = new Extarray(...origin);
        expect(target.toLocaleString()).toBe(origin.toLocaleString());
    });
});

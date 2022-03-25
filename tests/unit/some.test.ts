import { Extarray } from '../../src/index';

describe('Extarray#some', () => {
    test('is valid', () => {
        const isBelowThreshold = (currentValue: number) => currentValue < 40;
        const origin = [1, 30, 39, 29, 10, 13];
        const target = new Extarray(...origin);
        expect(target.some(isBelowThreshold)).toBe(
            origin.some(isBelowThreshold)
        );
    });
});

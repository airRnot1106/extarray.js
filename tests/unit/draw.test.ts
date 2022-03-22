import { Extarray } from '../../src/index';

describe('Extarray#draw', () => {
    test('is valid', () => {
        const origin = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const target = new Extarray(...origin);
        const randomMock = jest.spyOn(Math, 'random');
        randomMock.mockReturnValue(0.7);
        expect(target.draw()).toBe(7);
        expect(target.draw()).toBe(6);
        expect(target.draw()).toBe(5);
        expect(target.draw()).toBe(4);
        expect(target.draw()).toBe(8);
        expect(target.draw()).toBe(3);
        expect(target.draw()).toBe(2);
        expect(target.draw()).toBe(9);
        expect(target.draw()).toBe(1);
        expect(target.draw()).toBe(0);
        expect(target.draw()).toBe(undefined);
    });
});

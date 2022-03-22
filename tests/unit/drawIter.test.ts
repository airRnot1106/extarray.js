import { Extarray } from '../../src/index';

describe('Extarray#drawIter', () => {
    test('is valid', () => {
        const origin = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const target = new Extarray(...origin);
        const randomMock = jest.spyOn(Math, 'random');
        randomMock.mockReturnValue(0.7);
        expect([...target.drawIter()]).toEqual(
            [0, 1, 9, 2, 3, 8, 4, 5, 6, 7].reverse()
        );
        expect(target.shorten()).toEqual([]);
    });
});

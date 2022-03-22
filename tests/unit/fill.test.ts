import { Extarray } from '../../src/index';

describe.each([
    ['hoge', 3, 56],
    [null, 1, 2],
    [undefined, 70, 70],
    ['a', 4, 1],
    ['b', 10, 120],
    ['c', 200, -1],
])('Extarray#fill', (value, start, end) => {
    test('is valid', () => {
        const origin = new Array(100);
        const target = new Extarray(...origin);
        expect(target.fill(value, start, end).shorten()).toEqual(
            origin.fill(value, start, end)
        );
    });
});

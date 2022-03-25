import { Extarray } from '../../src/index';

describe('Extarray#set', () => {
    test('is valid', () => {
        const origin: (number | string)[] = [0, 1, 2, 3, 4, 5];
        const target = Extarray.extend(origin);
        const expected = [...origin];
        target.set(3, '3');
        expected[3] = '3';
        expect(target.shorten()).toEqual(expected);
    });

    test('case invalid index', () => {
        const origin: (number | string)[] = [0, 1, 2, 3, 4, 5];
        const target = new Extarray(...origin);
        const expected = [...origin];
        target.set(-1, '-1');
        expected[-1] = '-1';
        expect(target.shorten()).toEqual(expected);
    });
});

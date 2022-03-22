import { Extarray } from '../../src/index';

describe('Extarray$splice', () => {
    test.each([
        [1, 0, 'Feb'],
        [4, 1, 'May'],
        [-2, 1, 'April'],
        [3, -1, 'Oct'],
        [Infinity, 1, 'Nov'],
        [1, Infinity, 'Nov'],
        [-Infinity, 1, 'Nov'],
        [1, -Infinity, 'Nov'],
    ])('is valid', (start, deleteCount, item) => {
        const origin = ['Jan', 'March', 'April', 'June'];
        const target = new Extarray(...origin);
        expect(target.splice(start, deleteCount, item).shorten()).toEqual(
            origin.splice(start, deleteCount, item)
        );
        expect(target.shorten()).toEqual(origin);
    });

    test('case deleCount is undefined', () => {
        const origin = ['Jan', 'March', 'April', 'June'];
        const target = new Extarray(...origin);
        expect(target.splice(2).shorten()).toEqual(origin.splice(2));
        expect(target.shorten()).toEqual(origin);
    });
});

import { Extarray } from '../../src/index';

describe('Extarray#sort', () => {
    test('is valid', () => {
        const months = ['March', 'Jan', 'Feb', 'Dec'];
        const target = new Extarray(...months);
        expect(target.sort().shorten()).toEqual(months.sort());
        const sorter = (a: string, b: string) => {
            if (a > b) return 1;
            return -1;
        };
        expect(target.shorten()).toEqual(months);
        expect(target.sort(sorter).shorten()).toEqual(months.sort(sorter));
        expect(target.shorten()).toEqual(months);
    });
});

import { Extarray } from '../../src/index';

describe('Extarray#get', () => {
    test('is valid', () => {
        const origin = [...'Hello, Extarray!'];
        const target = Extarray.extend(origin);
        origin.forEach((char, index) => {
            expect(target.get(index)).toBe(char);
        });
    });

    test('is invalid', () => {
        const origin = [...'Hello, Extarray!'];
        const target = Extarray.extend(origin);
        origin.push('?');

        expect(target.get(origin.length - 1)).not.toBe(
            origin[origin.length - 1]
        );
    });
});

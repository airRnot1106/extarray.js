import { Extarray } from '../../src/index';

describe('Extarray#filter', () => {
    test('is valid', () => {
        const words = [
            'spray',
            'limit',
            'elite',
            'exuberant',
            'destruction',
            'present',
        ];
        const target = new Extarray(...words);
        expect(target.filter((word) => word.length > 6).shorten()).toEqual(
            words.filter((word) => word.length > 6)
        );
    });
});

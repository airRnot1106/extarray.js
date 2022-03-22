import { Extarray } from '../../src/index';

describe('constructor', () => {
    test('new', () => {
        const target = new Extarray();
        expect(target).toBeInstanceOf(Extarray);
    });
});

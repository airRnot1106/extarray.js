import { Extarray } from '../../src/index';

describe('Extarray#flatMap', () => {
    test('case normal array', () => {
        const origin = [0, 1, '2', 3, '4', 5, '6', '7', 8, '9'];
        const target = new Extarray(...origin);
        expect(
            target
                .flatMap((value) => (typeof value === 'number' ? [value] : []))
                .shorten()
        ).toEqual(
            origin.flatMap((value) =>
                typeof value === 'number' ? [value] : []
            )
        );
    });

    test('case extarray array', () => {
        const origin = [0, 1, '2', 3, '4', 5, '6', '7', 8, '9'];
        const target = new Extarray(...origin);
        expect(
            target
                .flatMap((value) =>
                    typeof value === 'number' ? new Extarray(value) : []
                )
                .shorten()
        ).toEqual(
            origin.flatMap((value) =>
                typeof value === 'number' ? [value] : []
            )
        );
    });
});

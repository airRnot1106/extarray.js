export class Extarray<T> {
    private _array: T[];

    constructor(...items: T[]) {
        this._array = [...items];
    }

    static extend<U>(iterable: Iterable<U> | ArrayLike<U>): Extarray<U> {
        return new Extarray(...Array.from(iterable));
    }
}

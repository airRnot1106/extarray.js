export class Extarray<T> {
    private _array: T[];

    constructor(...items: T[]) {
        this._array = [...items];
    }

    static extend<U>(array: U[]): Extarray<U> {
        return new Extarray(...array);
    }
}

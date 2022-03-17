export class Extarray<T> {
    private _array: T[];

    constructor(...items: T[]) {
        this._array = [...items];
    }
}

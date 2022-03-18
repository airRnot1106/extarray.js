export class Extarray<T> {
    private _array: T[];

    constructor(...items: T[]) {
        this._array = [...items];
    }

    static extend<U>(iterable: Iterable<U> | ArrayLike<U>): Extarray<U> {
        return new Extarray(...Array.from(iterable));
    }

    static isExtarray<T, U>(arg: T | Extarray<U>): arg is Extarray<U> {
        return arg instanceof Extarray;
    }

    *[Symbol.iterator]() {
        yield* this._array;
    }

    shorten() {
        return this._array;
    }

    concat<U>(...items: U[]): Extarray<T | U> {
        return Extarray.extend(Array.prototype.concat.bind(this._array)(items));
    }

    copyWithin(target: number, start: number, end?: number): Extarray<T> {
        return Extarray.extend(
            Array.prototype.copyWithin.bind(this._array)(target, start, end)
        );
    }

    entries(): IterableIterator<Extarray<number | T>> {
        return (function* (array) {
            yield* [...array.entries()].map((value) => Extarray.extend(value));
        })(this._array);
    }

    every(
        predicate: (value: T, index: number, array: T[]) => unknown,
        thisArg?: unknown
    ): boolean {
        return Array.prototype.every.bind(this._array)(predicate, thisArg);
    }

    fill(value: T, start?: number, end?: number): this {
        Array.prototype.fill.bind(this._array)(value, start, end);
        return this;
    }

    filter(
        predicate: (value: T, index: number, array: T[]) => unknown,
        thisArg?: unknown
    ): Extarray<T> {
        return Extarray.extend(
            Array.prototype.filter.bind(this._array)(predicate, thisArg)
        );
    }

    find(
        predicate: (value: T, index: number, obj: T[]) => unknown,
        thisArg?: unknown
    ): T | undefined {
        return Array.prototype.find.bind(this._array)(predicate, thisArg);
    }

    findIndex(
        predicate: (value: T, index: number, obj: T[]) => unknown,
        thisArg?: unknown
    ): number {
        return Array.prototype.findIndex.bind(this._array)(predicate, thisArg);
    }

    forEach(
        callbackfn: (value: T, index: number, array: T[]) => void,
        thisArg?: unknown
    ): void {
        Array.prototype.forEach.bind(this._array)(callbackfn, thisArg);
    }

    includes(searchElement: T, fromIndex?: number): boolean {
        return Array.prototype.includes.bind(this._array)(
            searchElement,
            fromIndex
        );
    }

    indexOf(searchElement: T, fromIndex?: number): number {
        return Array.prototype.indexOf.bind(this._array)(
            searchElement,
            fromIndex
        );
    }

    join(separator?: string): string {
        return Array.prototype.join.bind(this._array)(separator);
    }

    keys(): IterableIterator<number> {
        return Array.prototype.keys.bind(this._array)();
    }

    lastIndexOf(
        searchElement: T,
        fromIndex: number = this._array.length - 1
    ): number {
        return Array.prototype.lastIndexOf.bind(this._array)(
            searchElement,
            fromIndex
        );
    }

    map<U>(
        callbackfn: (value: T, index: number, array: T[]) => U,
        thisArg?: unknown
    ): Extarray<U> {
        return Extarray.extend(
            Array.prototype.map.bind(this._array)(callbackfn, thisArg)
        );
    }
}

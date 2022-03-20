export class Extarray<T> {
    private _array: T[];

    constructor(...items: T[]) {
        this._array = [...items];
    }

    /* *******************************
     * Static Methods
     * ******************************/

    static extend<U>(iterable: Iterable<U> | ArrayLike<U>): Extarray<U> {
        return new Extarray(...Array.from(iterable));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static extendAll<U>(iterable: Iterable<U> | ArrayLike<U>): Extarray<any> {
        const root = this.extend(Array.from(iterable));
        const extend = (value: U): unknown => {
            if (!Array.isArray(value)) return value;
            const extarray = Extarray.extend(value);
            return extarray.map(extend);
        };
        return root.map(extend);
    }

    static isExtarray<T, U>(arg: T | Extarray<U>): arg is Extarray<U> {
        return arg instanceof Extarray;
    }

    /* *******************************
     * Accessor Method
     * ******************************/

    get(index: number) {
        return this._array[index];
    }

    set(index: number, item: T): this {
        this._array[index] = item;
        return this;
    }

    get length() {
        return this._array.length;
    }

    /* *******************************
     * Instance Basic Methods
     * ******************************/

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

    pop(): T | undefined {
        return Array.prototype.pop.bind(this._array)();
    }

    push(...items: T[]): number {
        return Array.prototype.push.bind(this._array)(...items);
    }

    reduce<U>(
        callbackfn: (
            previousValue: T,
            currentValue: T,
            currentIndex: number,
            array: T[]
        ) => U,
        initialValue?: T
    ): U {
        const func = Array.prototype.reduce.bind(this._array);
        return initialValue ? func(callbackfn, initialValue) : func(callbackfn);
    }

    reduceRight<U>(
        callbackfn: (
            previousValue: T,
            currentValue: T,
            currentIndex: number,
            array: T[]
        ) => U,
        initialValue?: T
    ): U {
        const func = Array.prototype.reduceRight.bind(this._array);
        return initialValue ? func(callbackfn, initialValue) : func(callbackfn);
    }

    reverse(): this {
        Array.prototype.reverse.bind(this._array)();
        return this;
    }

    shift(): T | undefined {
        return Array.prototype.shift.bind(this._array)();
    }

    slice(start?: number, end?: number): Extarray<T> {
        return Extarray.extend(
            Array.prototype.slice.bind(this._array)(start, end)
        );
    }

    some(
        predicate: (value: T, index: number, array: T[]) => unknown,
        thisArg?: unknown
    ): boolean {
        return Array.prototype.some.bind(this._array)(predicate, thisArg);
    }

    sort(compareFn?: (a: T, b: T) => number): this {
        Array.prototype.sort.bind(this._array)(compareFn);
        return this;
    }

    splice(start: number, deleteCount?: number, ...items: T[]): Extarray<T> {
        const func = Array.prototype.splice.bind(this._array);
        return Extarray.extend(
            deleteCount ? func(start, deleteCount, ...items) : func(start)
        );
    }

    toLocaleString(): string {
        return Array.prototype.toLocaleString.bind(this._array)();
    }

    toString(): string {
        return Array.prototype.toString.bind(this._array)();
    }

    unshift(...items: T[]): number {
        return Array.prototype.unshift.bind(this._array)(...items);
    }

    values(): IterableIterator<T> {
        return Array.prototype.values.bind(this._array)();
    }

    [Symbol.iterator]() {
        return this.values();
    }

    /* *******************************
     * Instance Extra Methods
     * ******************************/

    shorten() {
        return this._array;
    }

    swap(index01: number, index02: number): this {
        const array = this._array;
        const index01Item = array[index01];
        const index02Item = array[index02];
        const isValidIndex = (
            item: T | undefined,
            index: number
        ): item is T => {
            if (!(index < array.length)) return false;
            return true;
        };
        if (
            !isValidIndex(index01Item, index01) ||
            !isValidIndex(index02Item, index02)
        )
            throw new Error('Cannot swap with empty items');
        array[index01] = index02Item;
        array[index02] = index01Item;
        return this;
    }

    shuffle(): this {
        const array = this._array;
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            this.swap(i, j);
        }
        return this;
    }

    draw(): T | undefined {
        const drawIndex = Math.floor(Math.random() * this._array.length);
        return this._array.splice(drawIndex, 1)[0];
    }

    *drawIter(): IterableIterator<T> {
        while (this._array.length) {
            yield <T>this.draw();
        }
    }
}

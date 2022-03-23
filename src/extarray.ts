import { ExtendAll, FlatExtarray } from './type';

/**
 * Extarray class that extends arrays.
 *
 * @template T
 * @class Extarray
 * @export
 */
export class Extarray<T> {
    private _array: T[];

    /**
     * Creates an instance of Extarray. However, unlike the constructor of a
     * normal array, it is not possible to create an empty array with a single
     * numeric argument. It works the same way as Array.of.
     *
     * @memberof Extarray
     * @param {...T[]} items
     */
    constructor(...items: T[]) {
        this._array = [...items];
    }

    /* *******************************
     * Static Methods
     * ******************************/

    /**
     * Extends a normal array to Extarray. This method does not change the
     * existing arrays, but instead returns a new extarray.
     *
     * @memberof Extarray
     * @template U
     * @param {Iterable<U> | ArrayLike<U>} iterable
     * @returns {any} {Extarray<U>}
     * @static
     */
    static extend<U>(iterable: Iterable<U> | ArrayLike<U>): Extarray<U> {
        return new Extarray(...Array.from(iterable));
    }

    /**
     * Extend all sub-array elements recursively to an extarray.
     *
     * @memberof Extarray
     * @template U
     * @param {Iterable<U> | ArrayLike<U>} iterable
     * @returns {any} {ExtendAll<U[]>}
     * @static
     */
    static extendAll<U>(iterable: Iterable<U> | ArrayLike<U>): ExtendAll<U[]> {
        const root = Array.from(iterable);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const extend = (input: unknown[]): any => {
            const reducer = (inputArray: unknown[], inputToExtend: unknown) => {
                return inputArray.concat(
                    Array.isArray(inputToExtend)
                        ? Extarray.extend(extend(inputToExtend))
                        : inputToExtend
                );
            };
            return input.reduce(reducer, []);
        };
        return Extarray.extend(extend(root));
    }

    /**
     * Determines whether the passed value is an Extarray.
     *
     * @memberof Extarray
     * @template T
     * @template U
     * @param {T | Extarray<U>} arg Value to determine if Extarray.
     * @returns {any} {arg is Extarray<U>}
     * @static
     */
    static isExtarray<T, U>(arg: T | Extarray<U>): arg is Extarray<U> {
        return arg instanceof Extarray;
    }

    /* *******************************
     * Accessor Method
     * ******************************/

    /**
     * Gets the element at the specified index. This is an alternative to the
     * following syntax for normal arrays.
     *
     * ```ts
     * array[number];
     * ```
     *
     * @memberof Extarray
     * @param {number} index Index of element to get.
     * @returns {any}
     */
    get(index: number): T | undefined {
        return this._array[index];
    }

    /**
     * Sets the element at the specified index. This is an alternative to the
     * following syntax for normal arrays.
     *
     * @memberof Extarray
     * @param {number} index Index to set the element.
     * @param {T} item Element to set.
     * @returns {any} {this}
     */
    set(index: number, item: T): this {
        this._array[index] = item;
        return this;
    }

    /**
     * Gets the length of the extarray. This is a number one higher than the
     * highest index in the extarray.
     *
     * @memberof Extarray
     * @readonly
     */
    get length() {
        return this._array.length;
    }

    /* *******************************
     * Instance Basic Methods
     * ******************************/

    /**
     * Combines two or more arrays. This method returns a new extarray without
     * modifying any existing extarrays. If an Extarray is passed, it is expanded.
     *
     * @memberof Extarray
     * @template U
     * @param {...U[]} items Additional arrays and/or items to add to the end of
     *   the extarray.
     * @returns {any} {(Extarray<T | U>)}
     */
    concat<U>(...items: U[]): Extarray<T | U> {
        return Extarray.extend(
            Array.prototype.concat.bind(this._array)(
                items.flatMap((value) => {
                    if (Extarray.isExtarray(value)) return [...value];
                    return value;
                })
            )
        );
    }

    /**
     * Returns the this object after copying a section of the extarray
     * identified by start and end to the same extarray starting at position target.
     *
     * @memberof Extarray
     * @param {number} target If target is negative, it is treated as
     *   length+target where length is the length of the extarray.
     * @param {number} start If start is negative, it is treated as
     *   length+start. If end is negative, it is treated as length+end.
     * @param {number} [end] If not specified, length of the this object is used
     *   as its default value.
     * @returns {any} {Extarray<T>}
     */
    copyWithin(target: number, start: number, end?: number): Extarray<T> {
        return Extarray.extend(
            Array.prototype.copyWithin.bind(this._array)(target, start, end)
        );
    }

    /**
     * Returns an iterable of key, value pairs for every entry in the extarray.
     *
     * @memberof Extarray
     * @returns {any} {(IterableIterator<Extarray<number | T>>)}
     */
    entries(): IterableIterator<Extarray<number | T>> {
        return (function* (array) {
            yield* [...array.entries()].map((value) => Extarray.extend(value));
        })(this._array);
    }

    /**
     * Determines whether all the members of an extarray satisfy the specified test.
     *
     * @memberof Extarray
     * @param {(value: T, index: number, array: T[]) => unknown} predicate A
     *   function that accepts up to three arguments. The every method calls the
     *   predicate function for each element in the extarray until the predicate
     *   returns a value which is coercible to the Boolean value false, or until
     *   the end of the extarray.
     * @param {unknown} [thisArg] An object to which the this keyword can refer
     *   in the predicate function. If thisArg is omitted, undefined is used as
     *   the this value.
     * @returns {any} {boolean}
     */
    every(
        predicate: (value: T, index: number, array: T[]) => unknown,
        thisArg?: unknown
    ): boolean {
        return Array.prototype.every.bind(this._array)(predicate, thisArg);
    }

    /**
     * Changes all extarray elements from `start` to `end` index to a static
     * `value` and returns the modified extarray.
     *
     * @memberof Extarray
     * @param {T} value Value to fill extarray section with.
     * @param {number} [start] Index to start filling the extarray at. If start
     *   is negative, it is treated as length+start where length is the length
     *   of the extarray.
     * @param {number} [end] Index to stop filling the extarray at. If end is
     *   negative, it is treated as length+end.
     * @returns {any} {this}
     */
    fill(value: T, start?: number, end?: number): this {
        Array.prototype.fill.bind(this._array)(value, start, end);
        return this;
    }

    /**
     * Returns the elements of an extarray that meet the condition specified in
     * a callback function.
     *
     * @memberof Extarray
     * @param {(value: T, index: number, array: T[]) => unknown} predicate A
     *   function that accepts up to three arguments. The filter method calls
     *   the predicate function one time for each element in the extarray.
     * @param {unknown} [thisArg] An object to which the this keyword can refer
     *   in the predicate function. If thisArg is omitted, undefined is used as
     *   the this value.
     * @returns {any} {Extarray<T>}
     */
    filter(
        predicate: (value: T, index: number, array: T[]) => unknown,
        thisArg?: unknown
    ): Extarray<T> {
        return Extarray.extend(
            Array.prototype.filter.bind(this._array)(predicate, thisArg)
        );
    }

    /**
     * Returns the value of the first element in the extarray where predicate is
     * true, and undefined otherwise.
     *
     * @memberof Extarray
     * @param {(value: T, index: number, obj: T[]) => unknown} predicate Find
     *   calls predicate once for each element of the extarray, in ascending
     *   order, until it finds one where predicate returns true. If such an
     *   element is found, find immediately returns that element value.
     *   Otherwise, find returns undefined.
     * @param {unknown} [thisArg] If provided, it will be used as the this value
     *   for each invocation of predicate. If it is not provided, undefined is
     *   used instead.
     * @returns {any} {(T | undefined)}
     */
    find(
        predicate: (value: T, index: number, obj: T[]) => unknown,
        thisArg?: unknown
    ): T | undefined {
        return Array.prototype.find.bind(this._array)(predicate, thisArg);
    }

    /**
     * Returns the index of the first element in the extarray where predicate is
     * true, and -1 otherwise.
     *
     * @memberof Extarray
     * @param {(value: T, index: number, obj: T[]) => unknown} predicate Find
     *   calls predicate once for each element of the extarray, in ascending
     *   order, until it finds one where predicate returns true. If such an
     *   element is found, findIndex immediately returns that element index.
     *   Otherwise, findIndex returns -1.
     * @param {unknown} [thisArg] If provided, it will be used as the this value
     *   for each invocation of predicate. If it is not provided, undefined is
     *   used instead.
     * @returns {any} {number}
     */
    findIndex(
        predicate: (value: T, index: number, obj: T[]) => unknown,
        thisArg?: unknown
    ): number {
        return Array.prototype.findIndex.bind(this._array)(predicate, thisArg);
    }

    /**
     * Performs the specified action for each element in an extarray.
     *
     * @memberof Extarray
     * @param {(value: T, index: number, array: T[]) => void} callbackfn A
     *   function that accepts up to three arguments. forEach calls the
     *   callbackfn function one time for each element in the extarray.
     * @param {unknown} [thisArg] An object to which the this keyword can refer
     *   in the callbackfn function. If thisArg is omitted, undefined is used as
     *   the this value.
     */
    forEach(
        callbackfn: (value: T, index: number, array: T[]) => void,
        thisArg?: unknown
    ): void {
        Array.prototype.forEach.bind(this._array)(callbackfn, thisArg);
    }

    /**
     * Determines whether an extarray includes a certain element, returning true
     * or false as appropriate.
     *
     * @memberof Extarray
     * @param {T} searchElement The element to search for.
     * @param {number} [fromIndex] The position in this extarray at which to
     *   begin searching for searchElement.
     * @returns {any} {boolean}
     */
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
            deleteCount !== undefined
                ? func(start, deleteCount, ...items)
                : func(start)
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

    at(index: number): T | undefined {
        return Array.prototype.at.bind(this._array)(index);
    }

    flat<D extends number = 1>(depth?: D): Extarray<FlatExtarray<T[], D>> {
        const reducer = (inputArray: unknown[], inputToFlat: unknown) => {
            return inputArray.concat(
                Array.isArray(inputToFlat) || Extarray.isExtarray(inputToFlat)
                    ? [...inputToFlat]
                    : inputToFlat
            );
        };
        let flatted: unknown[] = this._array;
        for (let i = 0; i < (depth ?? 1); i++) {
            flatted = flatted.reduce(reducer, []);
            if (
                flatted.every(
                    (value) =>
                        !Extarray.isExtarray(value) && !Array.isArray(value)
                )
            )
                break;
        }
        return Extarray.extend(<FlatExtarray<T[], D>[]>flatted);
    }

    flatMap<U, This = undefined>(
        callback: (this: This, value: T, index: number, array: T[]) => U,
        thisArg?: This
    ): Extarray<
        U extends readonly (infer InferArr)[] | Extarray<infer InferArr>
            ? InferArr
            : U
    > {
        return Extarray.extend(
            Array.prototype.map.bind(this._array)(callback, thisArg)
        ).flat(1);
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
            if (!(index >= 0 && index < array.length)) return false;
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

    unique(): this {
        this._array = [...new Set(this._array)];
        return this;
    }

    drop(): this {
        this._array = [];
        return this;
    }
}

import { ExtendAll, FlatExtarray } from './type';

/**
 * Extarray class that extends arrays.
 *
 * @template T
 * @class Extarray
 * @export
 */
export class Extarray<T> {
    /**
     * Internally referenced array. It cannot be referenced externally.
     *
     * @private
     * @memberof Extarray
     * @type {T[]}
     */
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

    /**
     * Convert an Object to an array in the form {[key]: value}[].
     *
     * @memberof Extarray
     * @template T
     * @param {{ [key: string]: T }} object Object to convert.
     * @returns {any} {Extarray<{ [key: string]: T; }>}
     * @static
     */
    static fromObject<T>(object: { [key: string]: T }): Extarray<{
        [key: string]: T;
    }> {
        return Extarray.extend(
            Object.entries(object).map(([key, value]) => ({ [key]: value }))
        );
    }

    /**
     * Creates an extarray of random numbers of a specified length and range.
     *
     * @memberof Extarray
     * @param {number} length Length of the extarray.
     * @param {number} [max=length] Maximum value of the extarray. Numerical
     *   values are created in the range of 0 to max - 1. The default value is
     *   the same as length. If type is 1 and max is less than length, max is
     *   equal to length. Default is `length`
     * @param {0 | 1} [type=0] Type of number to create. If 0, duplicate numbers
     *   are allowed. If 1, numbers are unique. The default value is 0. Default is `0`
     * @returns {any} {Extarray<number>}
     * @static
     */
    static createRandomNumbers(
        length: number,
        max: number = length,
        type: 0 | 1 = 0
    ): Extarray<number> {
        switch (type) {
            case 0: {
                const array = new Array(length);
                for (let i = 0; i < length; i++) {
                    array[i] = Math.floor(Math.random() * max);
                }
                return new Extarray(...array);
            }
            case 1: {
                if (length > max) {
                    max = length;
                }
                const array = new Array(length);
                for (let i = 0; i < length; i++) {
                    let number: number;
                    do {
                        number = Math.floor(Math.random() * max);
                    } while (array.includes(number));
                    array[i] = number;
                }
                return new Extarray(...array);
            }
        }
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

    /**
     * Returns the index of the first occurrence of a value in an extarray, or
     * -1 if it is not present.
     *
     * @memberof Extarray
     * @param {T} searchElement The value to locate in the extarray.
     * @param {number} [fromIndex] The extarray index at which to begin the
     *   search. If fromIndex is omitted, the search starts at index 0.
     * @returns {any} {number}
     */
    indexOf(searchElement: T, fromIndex?: number): number {
        return Array.prototype.indexOf.bind(this._array)(
            searchElement,
            fromIndex
        );
    }

    /**
     * Adds all the elements of an extarray separated by the specified separator string.
     *
     * @memberof Extarray
     * @param {string} [separator] A string used to separate one element of an
     *   extarray from the next in the.
     * @returns {any} {string}
     */
    join(separator?: string): string {
        return Array.prototype.join.bind(this._array)(separator);
    }

    /**
     * Returns an iterable of keys in the extarray
     *
     * @memberof Extarray
     * @returns {any} {IterableIterator<number>}
     */
    keys(): IterableIterator<number> {
        return Array.prototype.keys.bind(this._array)();
    }

    /**
     * Returns the index of the last occurrence of a specified value in an
     * extarray, or -1 if it is not present.
     *
     * @memberof Extarray
     * @param {T} searchElement The value to locate in the extarray.
     * @param {number} [fromIndex=this._array.length - 1] The extarray index at
     *   which to begin searching backward. If fromIndex is omitted, the search
     *   starts at the last index in the extarray. Default is `this._array.length - 1`
     * @returns {any} {number}
     */
    lastIndexOf(
        searchElement: T,
        fromIndex: number = this._array.length - 1
    ): number {
        return Array.prototype.lastIndexOf.bind(this._array)(
            searchElement,
            fromIndex
        );
    }

    /**
     * Calls a defined callback function on each element of an extarray, and
     * returns an extarray that contains the results.
     *
     * @memberof Extarray
     * @template U
     * @param {(value: T, index: number, array: T[]) => U} callbackfn A function
     *   that accepts up to three arguments. The map method calls the callbackfn
     *   function one time for each element in the extarray.
     * @param {unknown} [thisArg] An object to which the this keyword can refer
     *   in the callbackfn function. If thisArg is omitted, undefined is used as
     *   the this value.
     * @returns {any} {Extarray<U>}
     */
    map<U>(
        callbackfn: (value: T, index: number, array: T[]) => U,
        thisArg?: unknown
    ): Extarray<U> {
        return Extarray.extend(
            Array.prototype.map.bind(this._array)(callbackfn, thisArg)
        );
    }

    /**
     * Removes the last element from an extarray and returns it. If the extarray
     * is empty, undefined is returned and the extarray is not modified.
     *
     * @memberof Extarray
     * @returns {any} {(T | undefined)}
     */
    pop(): T | undefined {
        return Array.prototype.pop.bind(this._array)();
    }

    /**
     * Appends new elements to the end of an extarray, and returns the new
     * length of the extarray.
     *
     * @memberof Extarray
     * @param {...T[]} items New elements to add to the extarray.
     * @returns {any} {number}
     */
    push(...items: T[]): number {
        return Array.prototype.push.bind(this._array)(...items);
    }

    /**
     * Calls the specified callback function for all the elements in an
     * extarray. The return value of the callback function is the accumulated
     * result, and is provided as an argument in the next call to the callback function.
     *
     * @memberof Extarray
     * @template U
     * @param {(
     *     previousValue: T,
     *     currentValue: T,
     *     currentIndex: number,
     *     array: T[]
     * ) => U} callbackfn
     *   A function that accepts up to four arguments. The reduce method calls the
     *   callbackfn function one time for each element in the extarray.
     * @param {T} [initialValue] F initialValue is specified, it is used as the
     *   initial value to start the accumulation. The first call to the
     *   callbackfn function provides this value as an argument instead of an
     *   extarray value.
     * @returns {any} {U}
     */
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

    /**
     * Calls the specified callback function for all the elements in an
     * extarray, in descending order. The return value of the callback function
     * is the accumulated result, and is provided as an argument in the next
     * call to the callback function.
     *
     * @memberof Extarray
     * @template U
     * @param {(
     *     previousValue: T,
     *     currentValue: T,
     *     currentIndex: number,
     *     array: T[]
     * ) => U} callbackfn
     *   A function that accepts up to four arguments. The reduceRight method
     *   calls the callbackfn function one time for each element in the extarray.
     * @param {T} [initialValue] If initialValue is specified, it is used as the
     *   initial value to start the accumulation. The first call to the
     *   callbackfn function provides this value as an argument instead of an
     *   extarray value.
     * @returns {any} {U}
     */
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

    /**
     * Reverses the elements in an extarray in place. This method mutates the
     * extarray and returns a reference to the same extarray.
     *
     * @memberof Extarray
     * @returns {any} {this}
     */
    reverse(): this {
        Array.prototype.reverse.bind(this._array)();
        return this;
    }

    /**
     * Removes the first element from an extarray and returns it. If the
     * extarray is empty, undefined is returned and the extarray is not modified.
     *
     * @memberof Extarray
     * @returns {any} {(T | undefined)}
     */
    shift(): T | undefined {
        return Array.prototype.shift.bind(this._array)();
    }

    /**
     * Returns a copy of a section of an extarray. For both start and end, a
     * negative index can be used to indicate an offset from the end of the
     * extarray. For example, -2 refers to the second to last element of the extarray.
     *
     * @memberof Extarray
     * @param {number} [start] The beginning index of the specified portion of
     *   the extarray. If start is undefined, then the slice begins at index 0.
     * @param {number} [end] The end index of the specified portion of the
     *   extarray. This is exclusive of the element at the index 'end'. If end
     *   is undefined, then the slice extends to the end of the extarray.
     * @returns {any} {Extarray<T>}
     */
    slice(start?: number, end?: number): Extarray<T> {
        return Extarray.extend(
            Array.prototype.slice.bind(this._array)(start, end)
        );
    }

    /**
     * Determines whether the specified callback function returns true for any
     * element of an extarray.
     *
     * @memberof Extarray
     * @param {(value: T, index: number, array: T[]) => unknown} predicate A
     *   function that accepts up to three arguments. The some method calls the
     *   predicate function for each element in the extarray until the predicate
     *   returns a value which is coercible to the Boolean value true, or until
     *   the end of the extarray.
     * @param {unknown} [thisArg] An object to which the this keyword can refer
     *   in the predicate function. If thisArg is omitted, undefined is used as
     *   the this value.
     * @returns {any} {boolean}
     */
    some(
        predicate: (value: T, index: number, array: T[]) => unknown,
        thisArg?: unknown
    ): boolean {
        return Array.prototype.some.bind(this._array)(predicate, thisArg);
    }

    /**
     * Sorts an extarray in place. This method mutates the extarray and returns
     * a reference to the same extarray.
     *
     * @memberof Extarray
     * @param {(a: T, b: T) => number} [compareFn] Function used to determine
     *   the order of the elements. It is expected to return a negative value if
     *   the first argument is less than the second argument, zero if they're
     *   equal, and a positive value otherwise. If omitted, the elements are
     *   sorted in ascending, ASCII character order.
     *
     *   ```ts
     *   [11, 2, 22, 1].sort((a, b) => a - b);
     *   ```
     * @returns {any} {this}
     */
    sort(compareFn?: (a: T, b: T) => number): this {
        Array.prototype.sort.bind(this._array)(compareFn);
        return this;
    }

    /**
     * Removes elements from an extarray and, if necessary, inserts new elements
     * in their place, returning the deleted elements.
     *
     * @memberof Extarray
     * @param {number} start The zero-based location in the extarray from which
     *   to start removing elements.
     * @param {number} [deleteCount] The number of elements to remove.
     * @param {...T[]} items Elements to insert into the extarray in place of
     *   the deleted elements.
     * @returns {any} {Extarray<T>} An extarray containing the elements that were deleted.
     */
    splice(start: number, deleteCount?: number, ...items: T[]): Extarray<T> {
        const func = Array.prototype.splice.bind(this._array);
        return Extarray.extend(
            deleteCount !== undefined
                ? func(start, deleteCount, ...items)
                : func(start)
        );
    }

    /**
     * Returns a string representation of an extarray. The elements are
     * converted to string using their toLocaleString methods.
     *
     * @memberof Extarray
     * @returns {any} {string}
     */
    toLocaleString(): string {
        return Array.prototype.toLocaleString.bind(this._array)();
    }

    /**
     * Returns a string representation of an extarray.
     *
     * @memberof Extarray
     * @returns {any} {string}
     */
    toString(): string {
        return Array.prototype.toString.bind(this._array)();
    }

    /**
     * Inserts new elements at the start of an extarray, and returns the new
     * length of the extarray.
     *
     * @memberof Extarray
     * @param {...T[]} items Elements to insert at the start of the extarray.
     * @returns {any} {number}
     */
    unshift(...items: T[]): number {
        return Array.prototype.unshift.bind(this._array)(...items);
    }

    /**
     * Returns an iterable of values in the extarray
     *
     * @memberof Extarray
     * @returns {any} {IterableIterator<T>}
     */
    values(): IterableIterator<T> {
        return Array.prototype.values.bind(this._array)();
    }

    /**
     * It works the same as a normal array iterator.
     *
     * @memberof Extarray
     * @returns {any}
     */
    [Symbol.iterator](): IterableIterator<T> {
        return this.values();
    }

    /**
     * Returns the item located at the specified index.
     *
     * @memberof Extarray
     * @param {number} index The zero-based index of the desired code unit. A
     *   negative index will count back from the last item.
     * @returns {any} {(T | undefined)}
     */
    at(index: number): T | undefined {
        return Array.prototype.at.bind(this._array)(index);
    }

    /**
     * Returns a new extarray with all sub-array and sub-extarray elements
     * concatenated into it recursively up to the specified depth.
     *
     * @memberof Extarray
     * @template D
     * @param {D} [depth] The maximum recursion depth
     * @returns {any} {Extarray<FlatExtarray<T[], D>>}
     */
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

    /**
     * Calls a defined callback function on each element of an extarray. Then,
     * flattens the result into a new extarray. This is identical to a map
     * followed by flat with depth 1. Note that the flat here is Extarray#flat,
     * not Array#flat.
     *
     * @memberof Extarray
     * @template U
     * @template This
     * @param {(this: This, value: T, index: number, array: T[]) => U} callback
     *   A function that accepts up to three arguments. The flatMap method calls
     *   the callback function one time for each element in the extarray.
     * @param {This} [thisArg] An object to which the this keyword can refer in
     *   the callback function. If thisArg is omitted, undefined is used as the
     *   this value.
     * @returns {any} {(Extarray< U extends readonly (infer InferArr)[] |
     *   Extarray<infer InferArr> ? InferArr)}
     */
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

    /**
     * Returns an unextended normal array.
     *
     * @memberof Extarray
     * @returns {any} {T[]}
     */
    shorten(): T[] {
        return this._array;
    }

    /**
     * Swap the values of two indices. This changes the existing extarray.
     *
     * @memberof Extarray
     * @param {number} index01 Index of the target to be swapped. If a negative
     *   number or a number greater than the length of the extarray is
     *   specified, an error is thrown.
     * @param {number} index02 Index of the target to be swapped. If a negative
     *   number or a number greater than the length of the extarray is
     *   specified, an error is thrown.
     * @returns {any} This
     */
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

    /**
     * Shuffle the extarray with the Fisher-Yates algorithm. This changes the
     * existing extarray.
     *
     * @memberof Extarray
     * @returns {any} This
     */
    shuffle(): this {
        const array = this._array;
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            this.swap(i, j);
        }
        return this;
    }

    /**
     * Pops an element of an extarray at random. The popped element is removed
     * from the existing extarray. If there are no elements in the extarray,
     * undefined is returned.
     *
     * @memberof Extarray
     * @returns {any} This
     */
    draw(): T | undefined {
        const drawIndex = Math.floor(Math.random() * this._array.length);
        return this._array.splice(drawIndex, 1)[0];
    }

    /**
     * Returns the iterator of Extarray#draw.
     *
     * @memberof Extarray
     * @returns {any} {IterableIterator<T>}
     */
    *drawIter(): IterableIterator<T> {
        while (this._array.length) {
            yield <T>this.draw();
        }
    }

    /**
     * Remove duplicate elements from an existing extarray.
     *
     * @memberof Extarray
     * @returns {any} This
     */
    unique(): this {
        this._array = [...new Set(this._array)];
        return this;
    }

    /**
     * Empties an existing extarray.
     *
     * @memberof Extarray
     * @returns {any} This
     */
    drop(): this {
        this._array = [];
        return this;
    }
}

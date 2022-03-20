import { Extarray } from './extarray';

export type FlatExtarray<Arr, Depth extends number> = {
    done: Arr;
    recur: Arr extends ReadonlyArray<infer InferArr> | Extarray<infer InferArr>
        ? FlatExtarray<
              InferArr,
              [
                  -1,
                  0,
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                  11,
                  12,
                  13,
                  14,
                  15,
                  16,
                  17,
                  18,
                  19,
                  20
              ][Depth]
          >
        : Arr;
}[Depth extends -1 ? 'done' : 'recur'];

export type ExtendAll<Arr> = Arr extends ReadonlyArray<infer InferArr>
    ? Extarray<ExtendAll<InferArr>>
    : Arr;

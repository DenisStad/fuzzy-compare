# Fuzzy compare objects

## Example

```
let a = { prop1: 10, prop2: 'aa' }
let b = { prop1: 10, prop2: 'ab' }
let result = compare(a, b)
// result is { equal: 0.75 }
```

## Usage

```
const compare = require('fuzzy-compare')
const opts = {}
compare({ a: 1 }, { a: 0.5 }, opts)
```
Accepts two objects and an optional `opts` object. Objects can be of type string, number, or object. If the objects have different types, similarty will be 0.

Options:
  * `ignoreExtraKeys`: if true, will ignore keys of the second object that aren't present in the first object. e.g. `compare({ a: 1 }, { a: 1, b: 2}, { ignoreExtraKeys: true })` will return 100% similarity

## Info

The calculation for strings is based on the Levenshtein distance.

For numbers a difference of greater than 1 means no similarity, a difference of 0.5 means 50% similarity and so on. PRs to modify this through options are welcome.

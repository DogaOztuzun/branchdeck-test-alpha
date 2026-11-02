# repo-alpha

Test repo for Branchdeck PR Shepherd testing.

## Usage

```js
const { summarize } = require('./src/math.js');

summarize([3, 1, 2]);
// => { count: 3, min: 1, max: 3, mean: 2, median: 2 }

summarize([4, 1, 3, 2]);
// => { count: 4, min: 1, max: 4, mean: 2.5, median: 2.5 }
```

`summarize` throws when it is given an empty array, something that is not an array, or an array
that holds a value that is not a finite number. Numbers large enough to overflow floating-point
arithmetic can still produce an infinite mean or median.

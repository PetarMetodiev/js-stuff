const {
	isEven
	, doubleTheNumber
	, toUpper
	, isVowel
	, trace
} = require('./utils.js');
const {
	compose
	, pipe
} = require('../utils');

// Prefase to the actual reducers
// const map = xf => (acc, x) => {
//	acc.push(xf(x));
//	return acc;
// };
//
// const filter = predicate => (acc, x) => {
//	if (predicate(x)) {
//		acc.push(x);
//	}
//	return acc;
// };
//
// const res = [1, 2, 3, 4]
//	.reduce(filter(isEven), [])
//	.reduce(map(doubleTheNumber), []);

const map = xf => reducer => (acc, x) => {
	return reducer(acc, xf(x));
}

const filter = predicate => reducer => (acc, x) => {
	if (predicate(x)) {
		return reducer(acc, x);
	}
	return acc;
}

const isEvenFilter = filter(isEven);
const isNot2Filter = filter(x => x !== 2);
const doubleMap = map(doubleTheNumber);

const pushReducer = (acc, x) => {
	acc.push(x);
	return acc;
}

const res = [1, 2, 3, 4]
	.reduce(
		isNot2Filter(
			isEvenFilter(
				doubleMap(pushReducer)
			)
		)
		, []
	);
console.log(res);

const cleanNumbersXf = compose(
	isNot2Filter
	, isEvenFilter
	, doubleMap
);
const cleanNumbersXfPipe = pipe(
	isNot2Filter
	, isEvenFilter
	, doubleMap
)

const res2 = [1, 2, 3, 4].reduce(
	cleanNumbersXfPipe(pushReducer)
	, []
);
console.log(res2);

const transduce = (xf, reducer, seed, collection) => {
	// This is only useful for objects that implement reduce method.
	// collection.reduce(xf(reducer), seed);

	// Generic approach:
	// Use iterators - objects, sets, arrays all have iterators
	const xfReducer = xf(reducer);
	let acc = seed;

	for (const x of collection) {
		acc = xfReducer(acc, x);
	}

	return acc;
}

const cleanNumbers = transduce(
	cleanNumbersXfPipe
	, pushReducer
	, []
	, [1, 2, 3, 4]
);

console.log(cleanNumbers);

const capitalVowels = transduce(
	pipe(map(toUpper), filter(isVowel))
	, (str, char) => str + char
	, ''
	, 'adrian'
);

console.log(capitalVowels);

const numsMap = new Map();
numsMap.set('a', 1);
numsMap.set('b', 2);
numsMap.set('c', 3);
numsMap.set('d', 4);
const cleanNumbersMap = transduce(
	cleanNumbersXfPipe
	, pushReducer
	, []
	, numsMap.values()
);
console.log(cleanNumbersMap);

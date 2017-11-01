const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);
// https://github.com/learn-javascript-courses/es6-curry#add3-partially-applied--autocurried
// const curry = ( f , arr = []) =>
//	( ...args) => (a => a.length === f.length ? f(...a) : curry(f, a))([...arr, ...args]);

const curry = (fx, arity = 0) =>
	(...args) => args.length >= (arity || fx.length) ?
	fx(...args) :
	(...args2) => curry(fx, arity)(...[...args, ...args2]);

const head = ([x]) => x;
const tail = ([, ...xs]) => xs;
// https://medium.com/@caseymorrisus/functional-js-with-es6-recursive-patterns-b7d0813ef9e3
const def = (x) => typeof x !== 'undefined';
const undef = (x) => !def(x);
const copy = (arr) => [...arr];

const length = (arr) => (function _length(len, [x, ...xs]) {
	return def(x) ?
		_length(len + 1, xs) :
		len;
})(0, arr = arr || []);

const reverse = ([x, ...xs]) => def(x) ? [...reverse(xs), x] : [];

const first = (n = 1, [x, ...xs]) => def(x) && n > 0 ? [x, ...first(n - 1, xs)] : [];

const last = (n = 1, xs) => reverse(first(reverse(xs), n));

const insertAt = (pos, el, curr = 0, [x, ...xs]) => def(x) ?
	curr === pos ? [el, x, ...insertAt(pos, el, curr + 1, xs)] : [x, ...insertAt(pos, el, curr + 1, xs)] : curr <= pos ? [el] : [];

const isArray = (x) => Array.isArray(x);

const flatten = ([x, ...xs]) => def(x) ?
	isArray(x) ? [...flatten(x), ...flatten(xs)] : [x, ...flatten(xs)] : [];

// Probably current position indicator could be added, e.g. map(fn, i, arr)
// and when passing arguments to fn - fn(x, i);
const map = (fn, [x, ...xs]) => def(x) ? [fn(x), ...map(fn, xs)] : [];

// https://www.reddit.com/r/javascript/comments/4ppifp/better_functional_way_to_swap_array_values/
const swap = (i, j, a) => a.map((v, k) => {
	switch (k) {
	case i:
		return a[j];
	case j:
		return a[i];
	default:
		return v;
	}
});

const filter = (fn, [x, ...xs]) => def(x) ?
	fn(x) ? [x, ...filter(fn, xs)] : [...filter(fn, xs)] : [];

const reject = (fn, [x, ...xs]) => def(x) ?
	!fn(x) ? [x, ...reject(fn, xs)] : [...reject(fn, xs)] : [];

const partition = (fn, xs) => [filter(fn, xs), reject(fn, xs)];

// Probably current position indicator could be added, e.g. reduce(fn, start, i, arr)
// and when passing arguments to fn - fn(x, start, i);
const reduce = (fn, acc, [x, ...xs]) => def(x) ?
	reduce(fn, fn(acc, x), xs) : acc;

const reduceRight = (fn, acc, arr) => reduce(fn, acc, reverse(arr));

// Similar to curry but arguments can be applied during marking the function as partial.
// If enough parameters are supplied, the function has to be executed explicitly to get a result
// Does not return function until all arguments are provided.
// E.g. a function add(x,y,z):
// partial(add, 1,2,3)() <-- 3
// partial((add)(1,2,3)) <-- 3
// partial(add, 1,2)(3) <-- 3
// partial(add)(1)(2)(3) <-- ERROR
const partial = (fn, ...args) => (...newArgs) => fn(...args, ...newArgs);

// Convert array arguments to single value arguments.
// Works only on recursive functions.
const spreadArgs = (fn) => (...args) => fn(args);

const reverseArgs = (fn) => (...args) => fn(...reverse(args));

const pluck = (key, obj) => obj[key];

// flow === pipe
// Alternative syntax with current functions.
const flow = (...fns) => start => reduce((acc, fn) => fn(acc), start, fns);

// Alternatie syntax to compose with current functions.
const compose2 = (...fns) => flow(...reverse(fns));

const min = ([x, ...xs], result = Infinity) => def(x) ?
	x > result ? min(xs, result) : min(xs, x) : result;

const max = ([x, ...xs], result = -Infinity) => def(x) ?
	x > result ? max(xs, x) : max(xs, result) : result;

const factorial = (n, acc = 1) => n < 2 ? acc : factorial(n - 1, n * acc);

const testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

module.exports = {
	pipe
	, compose
	, curry
	, head
	, tail
	, def
	, undef
	, copy
	, length
	, reverse
	, first
	, last
	, insertAt
	, isArray
	, flatten
	, map
	, swap
	, filter
	, reject
	, partition
	, reduce
	, reduceRight
	, partial
	, spreadArgs
	, reverseArgs
	, pluck
	, flow
	, compose2
	, min
	, max
	, factorial
	, testArr
};

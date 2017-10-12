const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);
// https://github.com/learn-javascript-courses/es6-curry#add3-partially-applied--autocurried
const curry = (
	f
	, arr = []
) =>
	(
		...args
	) =>
	(a => a.length === f.length ? f(...a) : curry(f, a))([...arr, ...args]);

const head = ([x]) => x;
const tail = ([, ...xs]) => xs;
// https://medium.com/@caseymorrisus/functional-js-with-es6-recursive-patterns-b7d0813ef9e3
const def = (x) => typeof x !== 'undefined';
const undef = (x) => !def(x);
const copy = (arr) => [...arr];

const length = ([x, ...xs], len = 0) => x
	? length(xs, len + 1)
	: len;

const reverse = ([x, ...xs]) => def(x)
	? [...reverse(xs), x]
	: [];

const first = ([x, ...xs], n = 1) => def(x) && n > 0
	? [x, ...first(xs, n - 1)]
	: [];

const last = (xs, n = 1) => reverse(first(reverse(xs), n));

const insertAt = ([x, ...xs], el, pos, curr = 0) => def(x)
	? curr === pos ? [el, x, ...insertAt(xs, el, pos, curr + 1)] : [x, ...insertAt(xs, el, pos, curr + 1)]
	: curr <= pos ? [el] : []

const isArray = (x) => Array.isArray(x);

const flatten = ([x, ...xs]) => def(x)
	? isArray(x) ? [...flatten(x), ...flatten(xs)] : [x, ...flatten(xs)]
	: [];

const map = (fn, [x, ...xs]) => def(x)
	? [fn(x), ...map(fn, xs)]
	: [];

const factorial = (n, acc = 1) => n < 2 ? acc : factorial(n - 1, n * acc);

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
	, factorial
};

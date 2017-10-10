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
const length = ([x, ...xs], len = 0) => x ? length(xs, len + 1) : len;
const reverse = ([x, ...xs]) => def(x) ? [...reverse(xs), x] : [];

const factorial = (n, acc = 1) => n < 2 ? acc : factorial(n - 1, n * acc);

module.exports = {
	pipe
	, compose
	, curry
	, head
	, tail
	, def
	, undef
	, length
	, reverse
	, factorial
};

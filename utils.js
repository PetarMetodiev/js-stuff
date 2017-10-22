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

const length = (len = 0, [x, ...xs]) => def(x) ?
	length(len + 1, xs) :
	len;

const reverse = ([x, ...xs]) => def(x) ? [...reverse(xs), x] : [];

const first = (n = 1, [x, ...xs]) => def(x) && n > 0 ? [x, ...first(n - 1, xs)] : [];

const last = (n = 1, xs) => reverse(first(reverse(xs), n));

const insertAt = (pos, el, curr = 0, [x, ...xs]) => def(x) ?
	curr === pos ? [el, x, ...insertAt(pos, el, curr + 1, xs)] : [x, ...insertAt(pos, el, curr + 1, xs)] : curr <= pos ? [el] : [];

const isArray = (x) => Array.isArray(x);

const flatten = ([x, ...xs]) => def(x) ?
	isArray(x) ? [...flatten(x), ...flatten(xs)] : [x, ...flatten(xs)] : [];

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
	fn(x) ? [x, ...filter(fn,xs)] : [...filter(fn, xs)] : [];

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
	, swap
	, filter
	, factorial
};

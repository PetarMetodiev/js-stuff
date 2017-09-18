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
const tail = ([x, ...xs]) => xs;

module.exports = {
	pipe
	, compose
	, curry
	, head
	, tail
};

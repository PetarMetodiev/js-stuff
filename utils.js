const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);
// const curry = fn => (...args) => fn.bind(null, ...args);
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

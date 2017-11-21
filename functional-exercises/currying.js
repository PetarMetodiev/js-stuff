var _ = require('ramda');

// Exercise 1
//==============
// Refactor to remove all arguments by partially applying the function.

// var words = function (str) {
// 	return _.split(' ', str);
// };

const words = str => _.split(' ', str);

// Ramda functions are curried by default.
const splitBySpace = _.split(' ');
console.log('Ex1:');
console.log(splitBySpace('aaa aaa aaa'));

// Exercise 1a
//==============
// Use map to make a new words fn that works on an array of strings.

const sentences = _.map(splitBySpace);
console.log('Ex1a:');
console.log(sentences([
	'aaa aaa aaa'
	, 'bbb bbb bbb'
	, 'ccc ccc ccc'
]));


// Exercise 2
//==============
// Refactor to remove all arguments by partially applying the functions.

const match = _.curry((what, str) => str.match(what));

const filterQs = xs => _.filter(x => match(/q/i, x), xs);

// var filterQs = function (xs) {
// 	return _.filter(function (x) {
// 		return match(/q/i, x);
// 	}, xs);
// };

const getQ = match(/q/i);
const getAllQ = _.filter(getQ);
const getQs = xs => getAllQ(xs);

console.log('Ex3:');
console.log(filterQs('qwertyasdfgzxcvbazertyqazwsx'));
console.log(getQs('qwertyasdfgzxcvbazertyqazwsx'));

// Exercise 3
//==============
// Use the helper function _keepHighest to refactor max to not reference any
// arguments.

// LEAVE BE:
// var _keepHighest = function (x, y) {
// 	return x >= y ? x : y;
// };

const _keepHighest = (x, y) => x >= y ? x : y;

// REFACTOR THIS ONE:
// var max = function (xs) {
// 	return _.reduce(function (acc, x) {
// 		return _keepHighest(acc, x);
// 	}, -Infinity, xs);
// };

const max = xs => _.reduce((acc, x) => _keepHighest(acc, x), -Infinity, xs);

const max2 = _.curry(xs => _.reduce(_keepHighest, -Infinity, xs));

console.log('Ex3:');
console.log(max([1, 2, 3, 4, 5, 4, 3, 2, 1, 11]));
console.log(max([11, 2, 3, 4, 5, 4, 3, 2, 1, 11]));
console.log(max([1, 22, 3, 4, 5, 4, 3, 2, 1, 11]));
console.log(max([1, 1, 1, 1, 1, 1, 1, 1]));
console.log(max([]));

console.log('Ex3 solution:');
console.log(max2([1, 2, 3, 4, 5, 4, 3, 2, 1, 11]));
console.log(max2([11, 2, 3, 4, 5, 4, 3, 2, 1, 11]));
console.log(max2([1, 22, 3, 4, 5, 4, 3, 2, 1, 11]));
console.log(max2([1, 1, 1, 1, 1, 1, 1, 1]));
console.log(max2([]));

// Bonus 1:
// ============
// Wrap array's slice to be functional and curried.
// //[1, 2, 3].slice(0, 2)

const slice = _.curry((start, end, xs) => xs.slice(start, end));

console.log('Bonus 1:');
console.log(slice(0, 2, [1, 2, 3]));
console.log(slice(0)(2, [1, 2, 3]));
console.log(slice(0, 2)([1, 2, 3]));
console.log(slice(0)(2)([1, 2, 3]));
console.log(slice()(0)(2)([1, 2, 3]));

// Bonus 2:
// ============
// Use slice to define a function "take" that returns n elements from the beginning of an array. Make it curried.
// For ['a', 'b', 'c'] with n=2 it should return ['a', 'b'].
var take = undefined;

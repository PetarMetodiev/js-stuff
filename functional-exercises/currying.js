const { split, map, curry, filter, reduce } = require('ramda');
const title = msg => {
	console.log('')
	console.log('==================================================');
	console.log(msg);
	console.log('==================================================');
}

// Exercise 1
//==============
// Refactor to remove all arguments by partially applying the function.

// var words = function (str) {
// 	return _.split(' ', str);
// };

const words = str => split(' ', str);

// Ramda functions are curried by default.
const splitBySpace = split(' ');
title('Ex1:');
console.log(splitBySpace('aaa aaa aaa'));

// Exercise 1a
//==============
// Use map to make a new words fn that works on an array of strings.

const sentences = map(splitBySpace);
title('Ex1a:');
console.log(sentences([
	'aaa aaa aaa'
	, 'bbb bbb bbb'
	, 'ccc ccc ccc'
]));


// Exercise 2
//==============
// Refactor to remove all arguments by partially applying the functions.

const match = curry((what, str) => str.match(what));

const filterQs = xs => filter(x => match(/q/i, x), xs);

// var filterQs = function (xs) {
// 	return _.filter(function (x) {
// 		return match(/q/i, x);
// 	}, xs);
// };

const getQ = match(/q/i);
const getAllQ = filter(getQ);
const getQs = xs => getAllQ(xs);

title('Ex3:');
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

const max = xs => reduce((acc, x) => _keepHighest(acc, x), -Infinity, xs);

const max2 = curry(xs => reduce(_keepHighest, -Infinity, xs));

title('Ex3:');
console.log(max([1, 2, 3, 4, 5, 4, 3, 2, 1, 11]));
console.log(max([11, 2, 3, 4, 5, 4, 3, 2, 1, 11]));
console.log(max([1, 22, 3, 4, 5, 4, 3, 2, 1, 11]));
console.log(max([1, 1, 1, 1, 1, 1, 1, 1]));
console.log(max([]));

title('Ex3 solution:');
console.log(max2([1, 2, 3, 4, 5, 4, 3, 2, 1, 11]));
console.log(max2([11, 2, 3, 4, 5, 4, 3, 2, 1, 11]));
console.log(max2([1, 22, 3, 4, 5, 4, 3, 2, 1, 11]));
console.log(max2([1, 1, 1, 1, 1, 1, 1, 1]));
console.log(max2([]));

// Bonus 1:
// ============
// Wrap array's slice to be functional and curried.
// //[1, 2, 3].slice(0, 2)

const slice = curry((start, end, xs) => xs.slice(start, end));

title('Bonus 1:');
console.log(slice(0, 2, [1, 2, 3]));
console.log(slice(0)(2, [1, 2, 3]));
console.log(slice(0, 2)([1, 2, 3]));
console.log(slice(0)(2)([1, 2, 3]));
console.log(slice()(0)(2)([1, 2, 3]));

// Bonus 2:
// ============
// Use slice to define a function "take" that returns n elements from the beginning of an array. Make it curried.
// For ['a', 'b', 'c'] with n=2 it should return ['a', 'b'].
const take = slice(0);

title('Bonus 2:');
console.log(take(2, ['a', 'b', 'c']));
console.log(take(2)(['a', 'b', 'c']));
console.log(take()(2)(['a', 'b', 'c']));

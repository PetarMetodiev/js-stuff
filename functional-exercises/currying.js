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

console.log('Ex3:');
console.log(filterQs('qwertyasdfgzxcvbazertyqazwsx'));

// Exercise 3
//==============
// Use the helper function _keepHighest to refactor max to not reference any
// arguments.

// LEAVE BE:
var _keepHighest = function (x, y) {
	return x >= y ? x : y;
};

// REFACTOR THIS ONE:
var max = function (xs) {
	return _.reduce(function (acc, x) {
		return _keepHighest(acc, x);
	}, -Infinity, xs);
};


// Bonus 1:
// ============
// Wrap array's slice to be functional and curried.
// //[1, 2, 3].slice(0, 2)
var slice = undefined;


// Bonus 2:
// ============
// Use slice to define a function "take" that returns n elements from the beginning of an array. Make it curried.
// For ['a', 'b', 'c'] with n=2 it should return ['a', 'b'].
var take = undefined;
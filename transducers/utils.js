const doubleTheNumber = num => num * 2;
const isEven = num => num % 2 === 0;
const toUpper = str => str.toUpperCase();
const isVowel = char => ['a', 'e', 'i', 'o', 'u', 'y'].includes(char.toLowerCase());
const trace = msg => x => {
		console.log(msg, x);
		return x;
}

module.exports = {
	doubleTheNumber
	, isEven
	, toUpper
	, isVowel
	, trace
};

// Following are some exercises.

// xf - short for transform
const map = (xf, xs) => xs.reduce((acc, x) => {
	acc.push(xf(x));
	return acc;
}, []);

const filter = (predicate, xs) => xs.reduce((acc, x) => {
	if (predicate(x)) {
		acc.push(x);
	}
	return acc;
}, []);

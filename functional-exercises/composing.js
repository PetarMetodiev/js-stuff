const {
	compose
	, last
	, prop
	, head
	, reduce
	, add
	, map
	, pipe
	, replace
	, toLower
	, filter
	, join
	, sortBy
	, flip
	, concat
} = require('ramda');
const { formatMoney } = require('accounting');
const title = msg => {
	console.log('')
	console.log('==================================================');
	console.log(msg);
	console.log('==================================================');
}

// Example Data
const CARS = [{
	name: 'Ferrari FF'
	, horsepower: 660
	, dollar_value: 700000
	, in_stock: true
, }, {
	name: 'Spyker C12 Zagato'
	, horsepower: 650
	, dollar_value: 648000
	, in_stock: false
, }, {
	name: 'Jaguar XKR-S'
	, horsepower: 550
	, dollar_value: 132000
	, in_stock: false
, }, {
	name: 'Audi R8'
	, horsepower: 525
	, dollar_value: 114200
	, in_stock: false
, }, {
	name: 'Aston Martin One-77'
	, horsepower: 750
	, dollar_value: 1850000
	, in_stock: true
, }, {
	name: 'Pagani Huayra'
	, horsepower: 700
	, dollar_value: 1300000
	, in_stock: false
, }];

// Exercise 1:
// ============
// Use compose() to rewrite the function below. Hint: prop() is curried.
// var isLastInStock = function (cars) {
// 	var last_car = last(cars);
// 	return prop('in_stock', last_car);
// };

const isLastInStock = cars => {
	const lastCar = last(cars);
	return prop('in_stock', lastCar);
}

const isLastInStock2 = compose(prop('in_stock'), last);

title('Ex1:');
console.log(isLastInStock(CARS));

title('Ex1 solution:')
console.log(isLastInStock2(CARS));

// Exercise 2:
// ============
// Use compose(), prop() and head() to retrieve the name of the first car.
const nameOfFirstCar = compose(prop('name'), head);

title('Ex2:')
console.log(nameOfFirstCar(CARS));

// Exercise 3:
// ============
// Use the helper function _average to refactor averageDollarValue as a composition.
// var _average = function (xs) {
// 	return reduce(add, 0, xs) / xs.length;
// }; // <- leave be

const _average = xs => reduce(add, 0, xs) / xs.length;

// var averageDollarValue = function (cars) {
// 	var dollar_values = map(function (c) {
// 		return c.dollar_value;
// 	}, cars);
// 	return _average(dollar_values);
// };

const averageDollarValue = cars => {
	const dollar_values = map(c => c.dollar_value, cars);
	return _average(dollar_values);
}

const averageDollarValue2 = pipe(
	map(prop('dollar_value'))
	, _average
);

const averageDollarValue3 = compose(
	_average
	, map(prop('dollar_value'))
);

title('Ex3:')
console.log(averageDollarValue(CARS));

title('Ex3 solution:');
console.log(averageDollarValue2(CARS));
console.log(averageDollarValue3(CARS));


// Exercise 4:
// ============
// Write a function: sanitizeNames() using compose that returns a list of lowercase and underscored car's names: e.g: sanitizeNames([{name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true}]) //=> ['ferrari_ff'].

const _underscore = replace(/\W+/g, '_'); //<-- leave this alone and use to sanitize

const sanitizeNames = pipe(
	map(prop('name'))
	, map(toLower)
	, map(_underscore)
);

const sanitizeNames2 = compose(
	map(_underscore)
	, map(toLower)
	, map(prop('name'))
);

const trace = msg => x => {
	console.log(msg, x);
	return x;
}

const sanitizeOneName = compose(
	toLower
	, _underscore
	, prop('name')
);

const sanitizeNames3 = map(sanitizeOneName);

const sanitizeOneName2 = pipe(
	prop('name')
	, toLower
	, _underscore
);

const sanitizeNames4 = map(sanitizeOneName2);

title('Ex4:');
console.log(sanitizeNames(CARS));
console.log(sanitizeNames2(CARS));
console.log(sanitizeNames3(CARS));
console.log(sanitizeNames4(CARS));

// Bonus 1:
// ============
// Refactor availablePrices with compose.

// var availablePrices = function (cars) {
// 	var available_cars = filter(prop('in_stock'), cars);
// 	return available_cars.map(function (x) {
// 			return formatMoney(x.dollar_value);
// 		})
// 		.join(', ');
// };

const availablePrices = cars => {
	const availableCars = filter(prop('in_stock'), cars);
	return availableCars.map(x => formatMoney(x.dollar_value))
		.join(', ');
};

const availablePrices2 = pipe(
	filter(prop('in_stock'))
	, map(prop('dollar_value'))
	, map(formatMoney)
	, join(', ')
);

const getFormattedValue = pipe(prop('dollar_value'), formatMoney);

const availablePrices3 = pipe(
	filter(prop('in_stock'))
	, map(getFormattedValue)
	, join(', ')
);

title('Bonus1:')
console.log(availablePrices(CARS));
console.log(availablePrices2(CARS));
console.log(availablePrices3(CARS));

// Bonus 2:
// ============
// Refactor to pointfree. Hint: you can use flip().

// var fastestCar = function (cars) {
// 	var sorted = sortBy(function (car) {
// 		return car.horsepower;
// 	}, cars);
// 	var fastest = last(sorted);
// 	return fastest.name + ' is the fastest';
// };

const fastestCar = cars => {
	const sorted = sortBy(car => car.horsepower, cars);
	const fastest = last(sorted);
	return `${fastest.name} is the fastest`;
};

const fastestCar2 = pipe(
	sortBy(prop('horsepower'))
	, last
	, prop('name')
	, flip(concat)(' is the fastest')
);

title('Bonus2:')
console.log(fastestCar(CARS));
console.log(fastestCar2(CARS));

function* genFactory() {
	let a = yield Promise.resolve(2);
	console.log(`a: ${a}`);
	yield Promise.resolve(3);
}

let generator = genFactory();

console.log(generator.next(1));
console.log(generator.next(2,22,222));
console.log(generator.next(3));

// function* logGenerator() {
// 	console.log('First');
// 	console.log('but');
// 	console.log('multiline');
// 	console.log(yield);
// 	console.log('Second');
// 	console.log(yield);
// 	console.log('Third');
// 	console.log(yield);
// 	console.log('End?');
// }
//
// var gen = logGenerator();
//
// // the first call of next executes from the start of the function
// // until the first yield statement
// console.log('Starting...');
// gen.next();
// console.log('Before pretzel');
// gen.next('pretzel'); // pretzel
// console.log('Before California');
// gen.next('california'); // california
// console.log('Before mayo');
// gen.next('mayonnaise'); // mayonnaise

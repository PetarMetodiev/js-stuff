const R = require('ramda');
// // https://drboolean.gitbooks.io/mostly-adequate-guide-old/content/ch8.html
// const Container = function (x) {
// 	this.__value = x;
// }
//
// Container.of = function (x) {
// 	return new Container(x);
// }
//
// Container.prototype.map = function (xf) {
// 	return Container.of(xf(this.__value));
// }
//
// const Maybe = function (x) {
// 	this.__value = x;
// }
//
// Maybe.of = function (x) {
// 	return new Maybe(x);
// }
//
// Maybe.prototype.isNothing = function () {
// 	return (this.__value === null || this.__value === undefined);
// }
//
// Maybe.prototype.map = function (xf) {
// 	return this.isNothing() ? Maybe.of(null) : Maybe.of(xf(this.__value));
// }
//
// const safeHead = xs => Maybe.of(xs[0]);

class Container {
	constructor(x){
		this.$value = x;
	}

	static of(x) {
		return new Container(x);
	}

	map(xf) {
		return Container.of(xf(this.$value));
	}
}

module.exports = {
	Container,
	// Maybe
};

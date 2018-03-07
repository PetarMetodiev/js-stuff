// https://drboolean.gitbooks.io/mostly-adequate-guide-old/content/ch8.html
const Container = function (x) {
	this.__value = x;
}

Container.of = function (x) {
	return new Container(x);
}

Container.prototype.map = function (xf) {
	return Container.of(xf(this.__value));
}

module.exports = {
	Container
};

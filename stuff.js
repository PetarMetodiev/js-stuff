// https://medium.com/javascript-scene/javascript-monads-made-simple-7856be57bfe8
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);
const trace = label => value => {
	console.log(`${ label }: ${ value }`);
	return value;
};

const composeM = chainMethod => (...ms) => (
	ms.reduce((f, g) => x => g(x)[chainMethod](f))
);

const composePromises = composeM('then');
const label = 'API call composition';
// a => Promise(b)
const getUserById = id => id === 3 ?
	Promise.resolve({
		name: 'Kurt'
		, role: 'Author'
	}) :
	undefined;
// b => Promise(c)
const hasPermission = ({
	role
}) => (
	Promise.resolve(role === 'Author')
);
// Compose the functions (this works!)
const authUser = composePromises(hasPermission, getUserById);
authUser(3)
	.then(trace(label)); // true

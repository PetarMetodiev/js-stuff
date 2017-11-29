const reducer = (acc, val) => acc + val;

const arrRed = [1, 2, 3, 4, 5].reduce(reducer, 0);
console.log(arrRed);

const objReducer = (acc, obj) => ({ ...acc
	, ...obj
});

const user = {
	name: 'Bastun'
	, email: 'bastun@dyrven.com'
};

const objRed = objReducer(user, {
	nickname: 'Velikiq'
});
console.log(objRed);

const setRed = (acc, val) => acc.add(val);
console.log(setRed(new Set([1, 2, 3, 4]), 123));

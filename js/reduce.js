let arr = [1, 3, 4, 4];

let res = arr.reduce((cur, value, index) => {
	cur[index] = value;
	return cur;
}, {});

console.log(res);


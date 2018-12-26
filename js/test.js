/*
class O {
	constructor(name = 'parent') {
		this.name = name;
	}

	test() {
		return new Promise((resolve, reject) => {
			console.log('this', this);
			resolve(this.name);
		});
	}
}

var o = new O(name='child');
o.test().then((res) => {
	console.log(res);
})
*/


/*class O {
	constructor(name = 'parent') {
		this.name = name;
	}

	test() {
		let self = this;
		setTimeout(() => {
			console.log('self', self);
			console.log('this', this);
			console.log(this.name);
		})
	}
}

var o = new O(name='child');
o.test();*/


// class O {
// 	constructor(name = 'parent') {
// 		this.name = name;
// 	}

// 	test() {
// 		let self = this;
// 		setTimeout(function() {
// 			console.log('self', self);
// 			console.log('this', this);
// 			console.log(this.name);
// 		})
// 	}
// }

// var o = new O(name='child');
// o.test();


var items = [1, 2, 3];
for(var i = 0; i< 3; i++) {
	console.log(items[i])
	if(items[i] === 1) {
		break;
	}
}


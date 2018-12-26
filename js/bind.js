// if(!Function.prototype.bind) {
	Function.prototype.test = function() {
		console.log('arguments', arguments);
		var self = this,
			context = [].shift.call(arguments),
			args = [].slice.call(arguments);
		console.log('self', self);
		console.log('context', context);
		console.log('args', args);
		return function() {
			self.apply(context, [].concat.call(args, [].slice.call(arguments)));
		}
	}
// }

var obj = {
	name: 'name'
};

function fun(a, b) {
	console.log(a, b, this.name)
}

console.log(fun.test(obj, 1, 2));
console.log([1,3,4].slice());
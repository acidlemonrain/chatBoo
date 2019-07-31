b = {
	id: 3,
	name: 'hyc',
	des: 'des'
};

c = {
	id: 3,
	tag: 'tag'
};

d = {
	...b,
	...c
};

console.log(d);

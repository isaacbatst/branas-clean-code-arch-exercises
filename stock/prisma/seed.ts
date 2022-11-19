
const seed = async () => {
	console.log('Starting seed...');
};

seed()
	.catch(err => {
		console.log('Error while seeding');
		console.log(err);
	});

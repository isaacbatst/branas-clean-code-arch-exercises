import axios, {AxiosError} from 'axios';

test('POST /checkout com um item', async () => {
	const response = await axios.post('http://localhost:3000/checkout', {
		cpf: '317.153.361-86',
		items: [
			{
				id: 1,
				quantity: 1,
			},
		],
	});

	expect(response.status).toBe(200);
	expect(response.data.total).toBe(1030);
});

test('POST /checkout com dois itens', async () => {
	const response = await axios.post('http://localhost:3000/checkout', {
		cpf: '317.153.361-86',
		items: [
			{
				id: 1,
				quantity: 2,
			},
			{
				id: 2,
				quantity: 1,
			},
		],
	});

	expect(response.status).toBe(200);
	expect(response.data.total).toBe(7070);
});

test('POST /checkout com cupom de desconto', async () => {
	const response = await axios.post('http://localhost:3000/checkout', {
		cpf: '317.153.361-86',
		items: [
			{
				id: 1,
				quantity: 1,
			},
			{
				id: 2,
				quantity: 1,
			},
		],
		coupon: 'VALE20',
	});

	expect(response.status).toBe(200);
	expect(response.data.total).toBe(4832);
});

test('POST /checkout com cupom inexistente', async () => {
	let error: any;

	try {
		await axios.post('http://localhost:3000/checkout', {
			cpf: '317.153.361-86',
			items: [
				{
					id: 1,
					quantity: 1,
				},
				{
					id: 2,
					quantity: 1,
				},
			],
			coupon: 'VALE30',
		});
	} catch (err: unknown) {
		error = err;
	}

	expect(error).toBeInstanceOf(AxiosError);
	expect(error.response.status).toBe(404);
	expect(error.response.data.message).toBe('COUPON_NOT_FOUND');
});

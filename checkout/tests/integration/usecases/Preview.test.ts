import {Preview} from '../../../src/application/usecases/Preview';
import Coupon from '../../../src/domain/entities/Coupon';
import {GatewayFactoryFake} from '../../../src/infra/gateway/GatewayFactoryFake';
import {RepositoryFactoryMemory} from '../../../src/infra/persistence/memory/RepositoryFactoryMemory';

const makeSut = async () => {
	const repositoryFactory = new RepositoryFactoryMemory();
	const gatewayFactory = new GatewayFactoryFake();
	const preview = new Preview(repositoryFactory, gatewayFactory);

	return {
		couponRepository: repositoryFactory.couponRepository,
		preview,
	};
};

test('Ao criar o pedido com um item deve calcular o total', async () => {
	const {preview} = await makeSut();

	const created = await preview.execute({
		items: [
			{id: 1, quantity: 1},
		],
		destination: 'any-destination',
	});

	expect(created.total).toBe(1010);
});

test('Ao criar o pedido com dois itens deve calcular o total', async () => {
	const {preview} = await makeSut();

	const created = await preview.execute({
		items: [
			{id: 1, quantity: 2},
			{id: 2, quantity: 1},
		],
		destination: 'any-destination',
	});

	expect(created.total).toBe(7030);
});

test('Ao criar o pedido com cupom de desconto deve calcular o total', async () => {
	const {preview, couponRepository} = await makeSut();
	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	await couponRepository.save(new Coupon('VALE20', 20, tomorrow));

	const created = await preview.execute({
		items: [
			{id: 1, quantity: 1},
			{id: 2, quantity: 1},
		],
		coupon: 'VALE20',
		destination: 'any-destination',
	});

	expect(created.total).toBe(4816);
});

test('Ao criar pedido com cupom inexistente deve lançar erro', async () => {
	const {preview} = await makeSut();

	await expect(async () => {
		await preview.execute({
			items: [
				{id: 1, quantity: 1},
				{id: 2, quantity: 1},
			],
			coupon: 'VALE20',
			destination: 'any-destination',
		});
	}).rejects.toThrow('Cupom não encontrado');
});

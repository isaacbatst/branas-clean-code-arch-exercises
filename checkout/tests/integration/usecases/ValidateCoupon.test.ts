import {ValidateCoupon} from '../../../src/application/usecases/ValidateCoupon';
import Coupon from '../../../src/domain/entities/Coupon';
import {CouponRepositoryMemory} from '../../../src/infra/persistence/memory/CouponRepositoryMemory';
import {RepositoryFactoryMemory} from '../../../src/infra/persistence/memory/RepositoryFactoryMemory';

const makeSut = async () => {
	const repositoryFactory = new RepositoryFactoryMemory();
	const validateCoupon = new ValidateCoupon(repositoryFactory);

	return {
		validateCoupon,
		couponRepository: repositoryFactory.couponRepository,
	};
};

test('Deve validar o cupom', async () => {
	const {couponRepository, validateCoupon} = await makeSut();
	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	await couponRepository.save(new Coupon('VALE20', 20, tomorrow));
	const isValid = await validateCoupon.execute('VALE20');
	expect(isValid).toBeTruthy();
});

test('Deve retornar cupom expirado', async () => {
	const {couponRepository, validateCoupon} = await makeSut();
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	await couponRepository.save(new Coupon('VALE20', 20, yesterday));

	const isValid = await validateCoupon.execute('VALE20');
	expect(isValid).toBe(false);
});

test('Deve retornar cupom não encontrado', async () => {
	const {couponRepository, validateCoupon} = await makeSut();
	await couponRepository.save(new Coupon('VALE30', 20, new Date()));

	await expect(async () => {
		await validateCoupon.execute('VALE20');
	}).rejects.toThrow('Cupom não encontrado');
});

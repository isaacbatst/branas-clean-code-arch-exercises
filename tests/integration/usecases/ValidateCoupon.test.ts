import {ValidateCoupon} from '../../../src/application/usecases/ValidateCoupon';
import Coupon from '../../../src/domain/entities/Coupon';
import {CouponRepositoryMemory} from '../../../src/infra/persistence/memory/CouponRepositoryMemory';

test('Deve validar o cupom', async () => {
	const couponRepository = new CouponRepositoryMemory();
	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	await couponRepository.save(new Coupon('VALE20', 20, tomorrow));
	const validateCoupon = new ValidateCoupon(couponRepository);
	const isValid = await validateCoupon.execute('VALE20');
	expect(isValid).toBeTruthy();
});

test('Deve retornar cupom expirado', async () => {
	const couponRepository = new CouponRepositoryMemory();
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	await couponRepository.save(new Coupon('VALE20', 20, yesterday));
	const validateCoupon = new ValidateCoupon(couponRepository);

	const isValid = await validateCoupon.execute('VALE20');
	expect(isValid).toBe(false);
});

test('Deve retornar cupom não encontrado', async () => {
	const couponRepository = new CouponRepositoryMemory();
	await couponRepository.save(new Coupon('VALE30', 20, new Date()));
	const validateCoupon = new ValidateCoupon(couponRepository);

	await expect(async () => {
		await validateCoupon.execute('VALE20');
	}).rejects.toThrow('Cupom não encontrado');
});

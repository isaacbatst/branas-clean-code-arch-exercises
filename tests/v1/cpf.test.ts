import { validate } from '../../src/v1/cpf';

it('should return true with valid cpf', () => {
  const isValid = validate('111.444.777-35');
  expect(isValid).toBe(true);
})

it('should return true with valid and rests bellow 2', () => {
  const isValid = validate('111.111.112-00');
  expect(isValid).toBe(true);
})

it('should return false if all numbers are the same', () => {
  const isValid = validate('111.111.111-11');
  expect(isValid).toBe(false);
})

it('should return false if string is bellow 11 characters', () => {
  const isValid = validate('111.111.11');
  expect(isValid).toBe(false);
})

it('should return false if string is above 14 characters', () => {
  const isValid = validate('111.111.111-111');
  expect(isValid).toBe(false);
})

it('should return undefined if string is undefined', () => {
  const isValid = validate(undefined);
  expect(isValid).toBe(undefined);
})

it('should return false if string is null', () => {
  const isValid = validate(null);
  expect(isValid).toBe(false);
})

it('should return false if some error is throwed inside try', () => {
  jest.spyOn(String.prototype, 'substring')
    .mockImplementationOnce(() => {
      throw new Error();
    })
  
  const isValid = validate('111.111.112-00');
  expect(isValid).toBe(false)
})
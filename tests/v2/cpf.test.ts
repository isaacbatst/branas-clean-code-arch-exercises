import { validateCpf } from '../../src/v2/validateCpf';

it('should return true with valid cpf', () => {
  const isValid = validateCpf('111.444.777-35');
  expect(isValid).toBe(true);
})

it('should return true with valid and rests bellow 2', () => {
  const isValid = validateCpf('111.111.112-00');
  expect(isValid).toBe(true);
})

it('should return false if all numbers are the same', () => {
  expect(() => {
    validateCpf('111.111.111-11')
  }).toThrow('INVALID_CPF_WITH_SAME_NUMBER')
})

it('should return false if string is bellow 11 characters', () => {
  expect(() => {
    validateCpf('111.111.11')
  }).toThrow('INVALID_CPF_SIZE')
})

it('should return false if string is above 14 characters', () => {
  expect(() => {
    validateCpf('111.111.111-111-111')
  }).toThrow('INVALID_CPF_SIZE')
})

it('should return undefined if string is undefined', () => {
  expect(() => {
    validateCpf(undefined)
  }).toThrow('EMPTY_CPF')
})

it('should return false if string is null', () => {
  expect(() => {
    validateCpf(null)
  }).toThrow('EMPTY_CPF')
})

it('should return false if some error is throwed inside try', () => {
  jest.spyOn(String.prototype, 'substring')
    .mockImplementationOnce(() => {
      throw new Error();
    })
  
    expect(() => {
      validateCpf('111.444.777-35')
    }).toThrow('UNKNOWN_ERROR')
})
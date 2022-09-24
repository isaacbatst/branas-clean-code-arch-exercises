import { Cpf } from '../../src/v3/Cpf';

it('should return an instance with a valid cpf', () => {
  const cpf = new Cpf('111.444.777-35');
  expect(cpf).toBeInstanceOf(Cpf)
})

it('should return an instance with valid cpf and rests bellow 2', () => {
  const cpf = new Cpf('111.111.112-00');
  expect(cpf).toBeInstanceOf(Cpf)
})

it('should throw INVALID_CPF_WITH_SAME_NUMBER if all numbers are the same', () => {
  expect(() => {
    new Cpf('111.111.111-11')
  }).toThrow('INVALID_CPF_WITH_SAME_NUMBER')
})

it('should throw INVALID_CPF_SIZE if string is bellow 11 characters', () => {
  expect(() => {
    new Cpf('111.111.11')
  }).toThrow('INVALID_CPF_SIZE')
})

it('should throw INVALID_CPF_SIZE if string is above 14 characters', () => {
  expect(() => {
    new Cpf('111.111.111-111-111')
  }).toThrow('INVALID_CPF_SIZE')
})
import { DigitsCalculator } from "./DigitsCalculator";


export class Cpf {
  private value: string;
  static readonly MIN_LENGTH = 11;
  static readonly MAX_LENGTH = 14;
  static readonly FIRST_DIGIT_MULTIPLIER = 11;  
  static readonly SECOND_DIGIT_MULTIPLIER = 12;

  constructor(value: string) {
    if(!value) throw new Error('EMPTY_CPF');
    if(value.length < Cpf.MIN_LENGTH || value.length > Cpf.MAX_LENGTH) {
      throw new Error('INVALID_CPF_SIZE')
    }
    this.value = this.getCpfOnlyNumbers(value);
    this.validateCpf()
  }
  
  private  validateCpf() {
    if(this.isEveryNumberEqual()) throw new Error('INVALID_CPF_WITH_SAME_NUMBER')
    const digitsReceived = this.getCpfDigits();
    const digitsCalculated = DigitsCalculator.calculateDigits(this.value);
    return digitsReceived === digitsCalculated;
  }
  
  private getCpfDigits() {
    return this.value
    .substring(this.value.length-2, this.value.length); 
  }
  
  private getCpfOnlyNumbers(value: string) {
    return value
    .replace('.','')
    .replace('.','')
    .replace('-','')
    .replace(" ",""); 
  } 
  
  private isEveryNumberEqual() {
    return this.value
    .split("")
    .every(character => character === this.value[0])
  }
}
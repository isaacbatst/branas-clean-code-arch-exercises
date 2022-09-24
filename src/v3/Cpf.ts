import { CpfDigits } from "./CpfDigits";


export class Cpf {
  private value: string;
  static readonly MIN_LENGTH = 11;
  static readonly MAX_LENGTH = 14;
  
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
    const digitsCalculated = new CpfDigits(this.value);
    return digitsReceived === digitsCalculated.getDigits();
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
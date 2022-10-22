export class Digit {
  private value: number;
  private sum: number;

  private static readonly REST_DIVIDER = 11;
  private static readonly BASE_DIGIT = 11;
  
  constructor(
    private multiplier: number, 
    private cpf: string
  ) {
    this.sum = this.calculateSum();
    this.value = this.calculateDigit()
  }
  
  private calculateDigit() {
    const rest = this.sum % Digit.REST_DIVIDER
    if(rest < 2) {
      return 0;
    } 
    return Digit.BASE_DIGIT - rest;
  }
  
  public getValue() {
    return this.value;
  }
  
  private calculateSum() {
    let sum = 0;
    for (let index = 1; index < this.cpf.length -1; index++) {  
      const number = parseInt(this.cpf.substring(index -1, index));  							
      sum = sum + (this.multiplier - index ) * number;  
    };  
    return sum;
  }
}
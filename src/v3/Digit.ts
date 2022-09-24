export class Digit {
  private value: number;
  private static readonly REST_DIVIDER = 11;
  private static readonly BASE_DIGIT = 11;
  
  constructor(multiplier: number, cpfNumbers: string) {
    const sum = this.calculateSum(multiplier, cpfNumbers);
    this.value = this.calculateDigit(sum)
  }
  
  private calculateDigit(sum: number) {
    const rest = sum % Digit.REST_DIVIDER
    if(rest < 2) {
      return 0;
    } 
    return Digit.BASE_DIGIT - rest;
  }
  
  public getValue() {
    return this.value;
  }
  
  private calculateSum(multiplier: number, cpfNumbers: string) {
    let sum = 0;
    for (let index = 1; index < cpfNumbers.length -1; index++) {  
      const number = parseInt(cpfNumbers.substring(index -1, index));  							
      sum = sum + (multiplier - index ) * number;  
    };  
    return sum;
  }
}
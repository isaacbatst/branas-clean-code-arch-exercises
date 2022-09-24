import { Digit } from "./Digit";

export class CpfDigits {
  private static readonly FIRST_DIGIT_MULTIPLIER = 11;  
  private static readonly SECOND_DIGIT_MULTIPLIER = 12;
  private first: Digit;
  private second: Digit;

  constructor(cpf: string) {
    const { first, second } = this.calculateDigits(cpf);
    this.first = first;
    this.second = second;
  }

  private calculateDigits(cpf: string) {
    const first = new Digit(CpfDigits.FIRST_DIGIT_MULTIPLIER, cpf);
    const cpfWithFirstDigit = `${cpf}${first}`;
    const second = new Digit(CpfDigits.SECOND_DIGIT_MULTIPLIER, cpfWithFirstDigit)
    return {
      first, second
    }
  }

  getDigits() {
    return String(this.first) + String(this.second);
  }
}
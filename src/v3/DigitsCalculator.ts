import { Digit } from "./Digit";

export class DigitsCalculator {
  private static readonly FIRST_DIGIT_MULTIPLIER = 11;  
  private static readonly SECOND_DIGIT_MULTIPLIER = 12;

  static calculateDigits(cpf: string) {
    const first = new Digit(DigitsCalculator.FIRST_DIGIT_MULTIPLIER, cpf);
    const cpfWithFirstDigit = `${cpf}${first}`;
    const second = new Digit(DigitsCalculator.SECOND_DIGIT_MULTIPLIER, cpfWithFirstDigit)

    return String(first.getValue()) + String(second.getValue());
  }
}
// @ts-nocheck
const removeNonNumericCharacters = (string) => string
.replace('.','')
.replace('.','')
.replace('-','')
.replace(" ",""); 

const areAllNumbersTheSame = (cpf) => cpf
    .split("")
    .every(character => character === cpf[0])


const FIRST_SUM_MULTIPLIER = 11;    
const SECOND_SUM_MULTIPLIER = 12;    
const REST_DIVIDER = 11;
const BASE_DIGIT = 11;

const calculateBaseSum = (cpf, multiplier) => {
    let sum = 0;

    for (let index = 1; index < cpf.length -1; index++) {  
        const number = parseInt(cpf.substring(index -1, index));  							
        sum = sum + ( multiplier - index ) * number;  
    };  

    return sum;
}

const calculateDigit = (sum) => {
    const rest = sum  % REST_DIVIDER

    if(rest < 2) {
        return 0
    } 

    return BASE_DIGIT - rest;
}

const LAST_NUMBER_MULTIPLIER = 2;

const calculateSecondSum = (cpf, firstDigit) => {
    const baseSum = calculateBaseSum(cpf, SECOND_SUM_MULTIPLIER)
    const secondSum = baseSum + (LAST_NUMBER_MULTIPLIER * firstDigit);  
    return secondSum
}

const calculateDigits = (cpf) => {
    const firstSum = calculateBaseSum(cpf, FIRST_SUM_MULTIPLIER)
    const firstDigit = calculateDigit(firstSum);
    const secondSum = calculateSecondSum(cpf, firstDigit);
    const secondDigit = calculateDigit(secondSum); 
    return String(firstDigit) + String(secondDigit)
}

const MIN_CPF_LENGTH = 11;
const MAX_CPF_LENGTH = 14;

export function validateCpf (cpf) {
    if(!cpf) return false;
    if(cpf.length < MIN_CPF_LENGTH || cpf.length > MAX_CPF_LENGTH) {
        return false;
    }
    const cpfNumbers = removeNonNumericCharacters(cpf);
    if(areAllNumbersTheSame(cpfNumbers)){
        return false;
    }
    try{  
        const digitsCalculated = calculateDigits(cpfNumbers);
        const digitsReceived = cpfNumbers
            .substring(cpfNumbers.length-2, cpfNumbers.length);  
        return digitsReceived === digitsCalculated;
    }catch (e){  
        console.error("Erro !"+e);  
        return false;  
    }  
}

// ## Considere

import type {Dimensions} from './Dimensions';

// - O valor mínimo é de R$10,00
// - Por enquanto, como não temos uma forma de calcular a distância entre o CEP de origem e destino, será de 1000 km (fixo)
// - Utilize a fórmula abaixo para calcular o valor do frete

// ### Fórmula de Cálculo do Frete

// Valor do Frete = distância (km) * volume (m3) * (densidade/100)

// ### Exemplos de volume ocupado (cubagem)

// Camera: 20cm x 15 cm x 10 cm = 0,003 m3
// Guitarra: 100cm x 30cm x 10cm = 0,03 m3
// Geladeira: 200cm x 100cm x 50cm = 1 m3

// ### Exemplos de densidade

// Camera: 1kg / 0,003 m3 = 333kg/m3
// Guitarra: 3kg / 0,03 m3 = 100kg/m3
// Geladeira: 40kg / 1 m3 = 40kg/m3

// ### Exemplos

// produto: Camera
// distância: 1000 (fixo)
// volume: 0,003
// densidade: 333
// preço: R$9,90 (1000 * 0,003 * (333/100))
// preço mínimo: R$10,00

export default class Shipping {
	private value: number;

	constructor() {
		this.value = 0;
	}

	public addItem(dimensions: Dimensions, weight: number, distance = 1000) {
		const {depth, height, width} = dimensions;
		const volume = depth * height * width;
		const density = weight / volume;
		const result = distance * volume * (density / 100);
		this.value += Number(result.toFixed(2));
	}

	public getValue() {
		return this.value;
	}
}

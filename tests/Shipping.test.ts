import { Dimensions } from "../src/Item";
import Shipping from "../src/Shipping";

const items: { expected: number, dimensions: Dimensions, weight: number }[] = [
  {
    expected: 30,
    dimensions: { depth: 10, height: 100, width: 30 },
    weight: 3
  },
  { 
    expected: 10,
    dimensions: {depth: 10, height: 15, width: 20 },
    weight: 1
  },
  {
    expected: 400,
    dimensions: { depth: 50, height: 200, width: 100 },
    weight: 40,
  },
]

test.each(items)('Deve calcular o frete', (item) => {
  const shipping = new Shipping(
    item.dimensions,
    item.weight
  );

  expect(shipping.value).toBe(item.expected)
})
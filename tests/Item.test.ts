import Item from "../src/entities/Item"

const negativeDimensions = [
  { height: -1, width: 10, depth: 10 },
  { height: 10, width: -1, depth: 10 },
  { height: 10, width: 10, depth: -1 },
]

test.each(negativeDimensions)('Não deve criar um item com dimensões negativas', (dimensions) => {
  expect(() => {
    new Item({
      description: 'Guitarra',
      dimensions,
      id: 1,
      price: 10,
      weight: 20,
    })
  }).toThrowError('Dimensão negativa')
})

test('Não deve criar um item com peso negativo', () => {
  expect(() => {
    new Item({
      description: 'Guitarra',
      dimensions: { height: 10, width: 10, depth: 10 },
      id: 1,
      price: 10,
      weight: -1
    })
  }).toThrow('Peso negativo')
})
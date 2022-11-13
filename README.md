# Project 4
## Testes
- [x] Deve gerar o código do pedido
- [x] Deve fazer um pedido (caso de uso)
- [x] Deve simular o frete (caso de uso)
- [x] Deve validar o cupom de desconto (caso de uso)
- [ ] Deve retornar um pedido com base no código (caso de uso)
- [ ] Deve retornar a lista de pedidos (caso de uso)
- [ ] Calcule a distância entre dois CEPs e utilize no algoritmo de cálculo do frete
- [ ] Deve calcular frete (caso de uso)


## Considere
- [x] O código do pedido é formado por AAAAPPPPPPPP onde AAAA representa o ano e o PPPPPPPP representa um sequencial do pedido
- [x] Criar uma API (tanto faz se é REST, GraphQL ou qualquer outro formato) para os casos de uso
- [x] Criar testes de integração para a API e os casos de uso
- [ ] Cadastrar no banco de dados 2 ou 3 CEPs e associar com as coordenadas das cidades dos CEPs, apenas para viabilizar os cálculos, não é necessário carregar a base de CEPs inteira
- [ ] Utilizar o algoritmo de cálculo e arquivo com as coordenadas: https://github.com/rodrigobranas/cccat7_freight

## Importante
Implemente os DTOs para cada um dos use cases
Utilize o banco de dados para obter e persistir os dados

import {SaveStockEntry} from '../../../src/application/usecases/SaveStockEntry';
import {StockEntryRepositoryMemory} from '../../../src/infra/persistence/memory/StockEntryRepositoryMemory';

test('Deve salvar registro válido', async () => {
	const stockEntryRepository = new StockEntryRepositoryMemory();
	const saveStockEntry = new SaveStockEntry(stockEntryRepository);

	const {id} = await saveStockEntry.execute(1, 10, 'increment');

	expect(id).toBe(1);
});

test('Não deve salvar registro com operação inválida', async () => {
	const stockEntryRepository = new StockEntryRepositoryMemory();
	const saveStockEntry = new SaveStockEntry(stockEntryRepository);

	await expect(async () => {
		await saveStockEntry.execute(1, 10, 'invalid-operation');
	}).rejects.toThrow();
});


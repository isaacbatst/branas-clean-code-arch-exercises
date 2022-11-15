import type {City} from '@prisma/client';
import {Decimal} from '@prisma/client/runtime';
import path from 'path';
import {CsvParser} from '../../src/infra/persistence/csv/csv';
import prisma from '../../src/infra/persistence/prisma/prisma';

type CityRow = {
	codigo_ibge: string;
	nome: string;
	latitude: string;
	longitude: string;
	capital: 'FALSE' | 'TRUE';
	codigo_uf: string;
	siafi_id: string;
	ddd: string;
	fuso_horario: string;
};

export const seedCities = async () => {
	console.log('Reading cities csv...');
	const csvParser = new CsvParser<CityRow>();
	const cities = await csvParser.parse(path.join(__dirname, 'csv', 'cities.csv'));
	console.log('Seeding cities...');
	await prisma.city.createMany({
		data: cities.map<City>(city => ({
			capital: city.capital === 'TRUE' || false,
			ddd: Number(city.ddd),
			ibgeCode: Number(city.codigo_ibge),
			latitude: new Decimal(city.latitude),
			longitude: new Decimal(city.longitude),
			name: city.nome,
			siafiId: Number(city.siafi_id),
			stateUfCode: Number(city.codigo_uf),
			timezone: city.fuso_horario,
		})),
	});
};


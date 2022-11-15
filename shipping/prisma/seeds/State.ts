/* eslint-disable @typescript-eslint/naming-convention */
import type {State} from '@prisma/client';
import {Regions} from '@prisma/client';
import {Decimal} from '@prisma/client/runtime';
import path from 'path';
import {CsvParser} from '../../src/infra/persistence/csv/csv';
import prisma from '../../src/infra/persistence/prisma/prisma';

enum StateRowRegion {
	'Norte' = 'Norte',
	'Nordeste' = 'Nordeste',
	'Centro-Oeste' = 'Centro-Oeste',
	'Sudeste' = 'Sudeste',
	'Sul' = 'Sul',
}

type StateRow = {
	codigo_uf: string;
	uf: string;
	nome: string;
	latitude: string;
	longitude: string;
	regiao: StateRowRegion;
};

const stateRowRegionToPrismaRegion: Record<StateRowRegion, Regions> = {
	'Centro-Oeste': Regions.MIDWEST,
	Nordeste: Regions.NORTHEAST,
	Norte: Regions.NORTH,
	Sudeste: Regions.SOUTHEAST,
	Sul: Regions.SOUTH,
};

const toPrismaRegion = (region: StateRowRegion): Regions => {
	if (!(region in stateRowRegionToPrismaRegion)) {
		throw new Error(`Região inválida: ${region}`);
	}

	return stateRowRegionToPrismaRegion[region];
};

export const seedStates = async () => {
	console.log('Reading states csv...');
	const csvParser = new CsvParser<StateRow>();
	const states = await csvParser.parse(path.join(__dirname, 'csv', 'states.csv'));
	console.log('Seeding states...');
	await prisma.state.createMany({
		data: states.map<State>(state => {
			const latitude = new Decimal(state.latitude);
			const longitude = new Decimal(state.longitude);

			return ({
				latitude,
				longitude,
				name: state.nome,
				region: toPrismaRegion(state.regiao),
				uf: state.uf,
				ufCode: Number(state.codigo_uf),
			});
		}),
	});
};

import prisma from '../../infra/persistence/prisma/prisma';

type Output = {
	date: Date;
	destination: string;
	total: number;
	code: string;
};

export class GetOrdersByCpf {
	async query(cpf: string): Promise<Output[]> {
		const orders = await prisma.order.findMany({
			where: {
				cpf,
			},
		});

		return orders.map(order => ({
			code: order.code,
			date: order.date,
			destination: order.destination,
			total: order.total.toNumber(),
		}));
	}
}

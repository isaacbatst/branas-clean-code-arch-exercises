import type {QueueGateway} from '../../application/gateway/QueueGateway';
import type {Connection, Channel} from 'amqplib';
import amqp from 'amqplib';
import type {DomainEvent} from '../../domain/events/DomainEvent';

export class QueueGatewayAmqp implements QueueGateway {
	private static connection?: Connection;
	private static channel?: Channel;
	private static messageBrokerUrl: string;

	private static async getConnection(): Promise<Connection> {
		if (!process.env.MESSAGE_BROKER_URL) {
			throw new Error('Message broker url missing');
		}

		this.messageBrokerUrl = process.env.MESSAGE_BROKER_URL;

		if (!QueueGatewayAmqp.connection) {
			QueueGatewayAmqp.connection = await amqp.connect(this.messageBrokerUrl);
		}

		return QueueGatewayAmqp.connection;
	}

	private static async getChannel(): Promise<Channel> {
		if (!QueueGatewayAmqp.channel) {
			const connection = await QueueGatewayAmqp.getConnection();
			QueueGatewayAmqp.channel = await connection.createChannel();
		}

		return QueueGatewayAmqp.channel;
	}

	async publish<T>(event: DomainEvent<T>) {
		const channel = await QueueGatewayAmqp.getChannel();
		await channel.assertExchange(event.name, 'direct', {durable: true});
		channel.publish(event.name, '', Buffer.from(JSON.stringify(event.payload)));
	}
}

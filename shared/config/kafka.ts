import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || 'gmat-app',
  brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(',')
});

export const publishEvent = async (topic: string, messages: any[]) => {
  const producer = kafka.producer();
  await producer.connect();
  await producer.send({ topic, messages });
  await producer.disconnect();
};

export const createTopics = async (topics: { topic: string }[]) => {
  const admin = kafka.admin();
  await admin.connect();
  await admin.createTopics({ topics });
  await admin.disconnect();
};

export const getConsumer = (groupId: string) => {
  return kafka.consumer({ groupId });
};

export const connectConsumer = async (consumer: any, topics: string[], fromBeginning = false) => {
  await consumer.connect();
  await consumer.subscribe({ topics, fromBeginning });
};

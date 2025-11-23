import amqp, { type Channel } from "amqplib";

let channel: Channel;

export const initQueue = async () => {
  const connection = await amqp.connect("amqp://localhost");
  channel = await connection.createChannel();
  await channel.assertQueue("submissions", { durable: true });
  console.log("RabbitMQ queue created: submissions");
};

export const getChannel = () => {
  if (!channel) throw new Error("Channel not initialized");
  return channel;
};


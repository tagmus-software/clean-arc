export default () => ({
    AMQP_URL: String(process.env.AMQP_URL),
    AMQP_NAME: process.env.AMQP_CONNECTION_NAME || "default",
});

export default () => ({
    PORT: +(process.env.PORT || 3000),
    NAME: process.env.APPLICATION_NAME,
    DEBUG: process.env.APPLICATION_DEBUG,
});

const DiscordTransport = require('winston-discord-transport').default;
const { createLogger, format, transports } = require('winston');
const app = require('./app');

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  level: 'info',
  format: format.combine(
    format.splat(),
    format.simple()
  ),
  transports: [
    new transports.Console(),
  ],
});

if (!['test', 'dev'].includes(process.env.NODE_ENV)) {
  logger.add(new DiscordTransport({
    webhook: app.get('discordWebhookUrl'),
  })
  );
}

module.exports = logger;
